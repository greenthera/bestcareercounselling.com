# Lead Conversion Tracking

How leads are tracked from form submit through to a WhatsApp conversation, and how to
read the data.

## How it works, in one paragraph

Every visitor gets tagged with where they came from (UTM params, `gclid`, `fbclid`,
landing page, referrer) the moment they land, stored in `localStorage` and kept until
they submit a form. On submit: a lead ID is generated, the lead (with that attribution)
is saved to a Google Sheet via a Google Form, a `generate_lead` event is logged to
Google Analytics (no name or phone in it), and WhatsApp opens with a message that
includes the same lead ID — so a Sheet row and a WhatsApp chat can always be matched
back to each other.

## Where things live

| What | File |
|---|---|
| Attribution capture + GTM `dataLayer` helpers | `src/lib/tracking.ts` |
| Google Form field IDs + the actual POST | `src/lib/leadsForm.ts` |
| Shared lead-submission flow (used by every form) | `src/lib/submitLead.ts` |
| The form itself (hero, footer, contact page, per-service) | `src/components/forms/ConsultationForm.tsx` |
| Global WhatsApp/call click tracking | `src/components/analytics/ClickTracking.tsx` |
| SPA page-view tracking on route change | `src/components/analytics/RouteTracking.tsx` |
| GTM + Clarity loader | `index.html` |

## Events sent to `window.dataLayer`

| Event | When | Parameters | Contains PII? |
|---|---|---|---|
| `generate_lead` | A form is submitted successfully | `form_id`, `current_status`, `lead_channel` (always `"whatsapp"`), `lead_id` | No |
| `whatsapp_click` | Any `https://wa.me/...` link is clicked, anywhere on the site | `link_location` | No |
| `phone_click` | Any `tel:` link is clicked, anywhere on the site | `link_location` | No |
| `page_view_spa` | A client-side route change (not the first page load — GTM's own container load already counts as that) | `page_path` | No |

`link_location` comes from a `data-location` attribute on the link (or its closest
ancestor). A link with none reports `"unspecified"` — it's still tracked, just without
a specific label. Currently labelled: `floating-button`, `mobile-bar-whatsapp`,
`mobile-bar-call`, `hero-message-us`, `footer-call`. Other `wa.me`/`tel:` links on the
site (contact page methods, legal page, assessment pages, etc.) are tracked
automatically too, just under `"unspecified"` unless a `data-location` is added to them.

Name and phone are **never** sent to `dataLayer`, GA4 or any ad platform — only to the
Google Sheet.

## Form IDs

| `form_id` | Where |
|---|---|
| `hero` | Home page hero section |
| `footer` | The "Let's talk about your child's future" section (`<FinalCTA variant="form" />`, used on the home page) |
| `contact-page` | Contact Us page ("I want to talk to someone") |
| `what-we-do-{service-id}` | Each service's own form on the What We Do page, e.g. `what-we-do-mba` |

## The Ref code

Every WhatsApp message carries a line like:
```
Ref: hero-google-mvi0ocb7-ihibdi
```
Format: `{form_id}-{utm_source or DIRECT}-{lead_id}`. The `lead_id` segment is the same
value saved in the Sheet's `lead_id` column, so a WhatsApp conversation can always be
traced back to its exact Sheet row, even though a `wa.me` click doesn't guarantee a
message was actually sent (so tracked leads will always be ≥ real chats — expected).

## Google Form field → entry ID mapping

Collected via the form's **Get pre-filled link** — see `src/lib/leadsForm.ts` for the
authoritative copy. If the form's questions are ever edited, deleted or recreated,
these IDs change and this mapping (and `leadsForm.ts`) must be refreshed the same way,
or submissions will silently land in the wrong columns.

| Field | Entry ID |
|---|---|
| lead_id | entry.243360331 |
| name | entry.1081356038 |
| phone | entry.1290721114 |
| status | entry.1238164411 |
| form_id | entry.1777820978 |
| page | entry.837934175 |
| utm_source | entry.1608291639 |
| utm_medium | entry.762024564 |
| utm_campaign | entry.491650539 |
| utm_term | entry.1658321924 |
| utm_content | entry.475079642 |
| gclid | entry.197075013 |
| fbclid | entry.112890306 |
| landing_page | entry.2124836624 |
| referrer | entry.1682408961 |

Submission endpoint: `VITE_GFORM_URL` env var, falling back to the form collected for
this project if unset (see `.env` / `src/lib/leadsForm.ts`).

## GTM container

`GTM-WRKXVSF7` — replaces the site's previous container (`GTM-KFNZCKML`). Loaded
deferred (after page load + idle), alongside Microsoft Clarity, so neither competes
with the page's own content for bandwidth or main-thread time on first load.

**Not yet configured inside GTM itself** (this is GTM/GA4 web UI work, not code):
- Custom Event triggers for `generate_lead`, `whatsapp_click`, `phone_click`, `page_view_spa`
- Data Layer Variables for `form_id`, `current_status`, `link_location`, `lead_id`
- A GA4 Event tag per event above
- Google Ads Conversion tag + Meta Pixel Lead tag on `generate_lead` (only if/when ads are running)
- Marking `generate_lead` as a GA4 key event, and registering `form_id` /
  `current_status` / `link_location` as GA4 custom dimensions

## How to test

**GTM Preview:** open [tagmanager.google.com](https://tagmanager.google.com) → your
container → **Preview** → enter the site URL. Submit a form or click a WhatsApp/call
link on the live preview tab and watch the corresponding event (`generate_lead`,
`whatsapp_click`, `phone_click`, `page_view_spa`) appear in the left-hand event list,
with its `dataLayer` contents visible on the right.

**GA4 DebugView:** once a GA4 Event tag exists for an event (see above), open GA4 →
**Admin → DebugView** (device needs GTM Preview active, or the
[GA Debugger extension](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)).
Submitted events should appear within a few seconds.

**End to end:**
1. Visit the site with `?utm_source=test&utm_medium=test&utm_campaign=test`.
2. Submit any form.
3. Check the linked Google Sheet for a new row with those UTM values and a `lead_id`.
4. Check the WhatsApp message that opened — its `Ref:` line should end in the same `lead_id`.
5. Check GTM Preview / GA4 DebugView for the matching `generate_lead` event.

## Client handover note: the `stage` and `notes` columns

Every new lead lands as a new row in the Sheet automatically — nothing to do there.
The **`stage`** and **`notes`** columns, at the far right, are for you (or whoever
follows up with leads) to update by hand as a lead moves along:

- Set `stage` to `New`, `Messaged`, `Contacted`, `Booked`, `Paid` or `Lost` as it changes.
- Add anything useful in `notes` — no format required.

Please don't insert new columns between the existing ones — add anything new at the far
right, after `notes`, or it can misalign every row's data.
