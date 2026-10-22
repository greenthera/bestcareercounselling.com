# Lead Conversion Tracking

How leads are tracked from form submit through to a WhatsApp conversation, and how to
read the data.

## How it works, in one paragraph

Every visitor gets tagged with where they came from (UTM params, `gclid`, `fbclid`,
landing page, referrer) the moment they land, stored in `localStorage` and kept until
they submit a form. On submit: a lead ID is generated, the lead (with that attribution)
is saved to a Google Sheet via a Google Form, a `generate_lead` event is logged to
Google Analytics (no name, email or phone in it), and — for forms that redirect
immediately — WhatsApp opens with a message that includes the same lead ID, so a Sheet
row and a WhatsApp chat can always be matched back to each other.

Every form on the site collects different "extra" fields beyond Name/Email/Phone (a
Status for the consultation forms, a Course/Budget/Goal for the online admissions form,
a Child's Name/Class for the parent assessment, and so on). Rather than giving every
possible field across every form its own Sheet column, only Name, Email and Phone are
real columns — everything else specific to that particular form is combined into one
`notes` field as readable text, one field per line (e.g. `"Status: Class 10"` or
`"Course: Online MBA\nBudget: ₹1–2 Lakh"`), written in automatically at the moment of
submission. Built by `buildLeadNotes()` in `src/lib/submitLead.ts`.

## Where things live

| What | File |
|---|---|
| Attribution capture + GTM `dataLayer` helpers | `src/lib/tracking.ts` |
| Google Form field IDs + the actual POST | `src/lib/leadsForm.ts` |
| Shared lead-saving + WhatsApp-redirect flow | `src/lib/submitLead.ts` |
| Hero / footer / contact page / per-service form | `src/components/forms/ConsultationForm.tsx` |
| Online Admissions form | `src/components/online-admissions/UniversityMatchForm.tsx` |
| School Student Career Assessment | `src/pages/SchoolStudentCareerAssessment.tsx` |
| Parent Career Clarity Assessment | `src/pages/ParentCareerClarityAssessment.tsx` |
| Global WhatsApp/call click tracking | `src/components/analytics/ClickTracking.tsx` |
| SPA page-view tracking on route change | `src/components/analytics/RouteTracking.tsx` |
| GTM + Clarity loader | `index.html` |

`src/lib/submitLead.ts` exports two things:
- **`submitLead()`** — the full flow (save + track + open WhatsApp), used by forms that
  redirect to WhatsApp immediately on submit (`ConsultationForm`).
- **`saveLead()`** — just the save-and-track part, no WhatsApp redirect, used by forms
  that show their own result/thank-you screen instead (Online Admissions, both
  assessment pages). Returns the generated `lead_id`; `buildLeadRef()` builds the same
  `Ref:` string `submitLead()` uses, for a page that wants to tag its own WhatsApp link
  with it separately.

## Events sent to `window.dataLayer`

| Event | When | Parameters | Contains PII? |
|---|---|---|---|
| `generate_lead` | A form is submitted successfully | `form_id`, `lead_channel` (always `"whatsapp"`), `lead_id` | No |
| `whatsapp_click` | Any `https://wa.me/...` link is clicked, anywhere on the site | `link_location` | No |
| `phone_click` | Any `tel:` link is clicked, anywhere on the site | `link_location` | No |
| `page_view_spa` | A client-side route change (not the first page load — GTM's own container load already counts as that) | `page_path` | No |

`link_location` comes from a `data-location` attribute on the link (or its closest
ancestor). A link with none reports `"unspecified"` — it's still tracked, just without
a specific label. Currently labelled: `floating-button`, `mobile-bar-whatsapp`,
`mobile-bar-call`, `hero-message-us`, `footer-call`. Other `wa.me`/`tel:` links on the
site (contact page methods, legal page, assessment pages, etc.) are tracked
automatically too, just under `"unspecified"` unless a `data-location` is added to them.

Name, email and phone are **never** sent to `dataLayer`, GA4 or any ad platform — only
to the Google Sheet (and even there, only Name/Email/Phone get real columns — see
above).

## Form IDs and what lands in `notes`

| `form_id` | Where | What's in `notes` |
|---|---|---|
| `hero` | Home page hero section | `Status: {class}` |
| `footer` | The "Let's talk about your child's future" section (`<FinalCTA variant="form" />`, home page) | `Status: {class}` |
| `contact-page` | Contact Us page ("I want to talk to someone") | `Status: {class}` |
| `what-we-do-{service-id}` | Each service's own form on the What We Do page, e.g. `what-we-do-mba` | `Status: {class}` |
| `assessment` | "Take the Free Assessment" dialog (`AssessmentForm`) — reachable from the Free Assessment section (home, What We Do, Blogs) and the Contact Us page | `Status: {class}` |
| `online-admissions` | Online Admissions page | `Course`, `Qualification`, `Percentage`, `Budget`, `Goal` — one per line, blank fields omitted |
| `school-student-career-assessment` | School Student Career Assessment | `Parent Name`, `Student Class` — one per line |
| `parent-career-clarity-assessment` | Parent Career Clarity Assessment | `Child Name`, `Child Class` — one per line |
| `parent-career-clarity-callback` | The separate "Want Us to Call You?" form on that page's result screen | `Child Name`, `Child Class`, `Reason` — one per line |

Redirects to WhatsApp with a tagged `Ref:` code on submit: `hero`, `footer`,
`contact-page`, `what-we-do-{service-id}`, `assessment`, `parent-career-clarity-callback`.
Saves the lead and continues to its own result screen instead (no redirect):
`online-admissions`, `school-student-career-assessment`,
`parent-career-clarity-assessment` — these three still have their own, separate
WhatsApp links further down the page, untagged with a Ref code (see "Follow-up" below
if that's worth changing).

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
| lead_id | entry.1311777246 |
| name | entry.689730906 |
| email | entry.1156704139 |
| phone | entry.808173884 |
| notes | entry.1381980248 |
| form_id | entry.2074549916 |
| page | entry.1871426431 |
| utm_source | entry.784612854 |
| utm_medium | entry.769170639 |
| utm_campaign | entry.1997714945 |
| utm_term | entry.292238718 |
| utm_content | entry.367534719 |
| gclid | entry.1303728676 |
| fbclid | entry.275821024 |
| landing_page | entry.1821401819 |
| referrer | entry.439433515 |

Submission endpoint: `VITE_GFORM_URL` env var, falling back to the form collected for
this project if unset (see `.env` / `src/lib/leadsForm.ts`).

## GTM container

`GTM-WRKXVSF7` — replaces the site's previous container (`GTM-KFNZCKML`). Loaded
deferred (after page load + idle), alongside Microsoft Clarity, so neither competes
with the page's own content for bandwidth or main-thread time on first load.

**Not yet configured inside GTM itself** (this is GTM/GA4 web UI work, not code):
- Custom Event triggers for `generate_lead`, `whatsapp_click`, `phone_click`, `page_view_spa`
- Data Layer Variables for `form_id`, `link_location`, `lead_id`
- A GA4 Event tag per event above
- Google Ads Conversion tag + Meta Pixel Lead tag on `generate_lead` (only if/when ads are running)
- Marking `generate_lead` as a GA4 key event, and registering `form_id` / `link_location`
  as GA4 custom dimensions

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

## Client handover note: the `stage` and `remarks` columns

Every new lead lands as a new row in the Sheet automatically — nothing to do there,
including the `notes` column (the 5th column), which the website fills in itself with
whatever is specific to that form (Status, Course, Child's Class, etc. — see the Form
IDs table above). You never need to touch `notes`.

The **`stage`** and **`remarks`** columns, at the far right (after all the automatic
columns), are the two you update by hand as a lead moves along:

- Set `stage` to `New`, `Messaged`, `Contacted`, `Booked`, `Paid` or `Lost` as it changes.
- Add your own follow-up notes in `remarks` — no format required.

Please don't insert new columns between the existing ones — add anything new at the far
right, after `remarks`, or it can misalign every row's data.

## Follow-up (not done, worth considering)

The Online Admissions and both assessment pages save the lead correctly but don't tag
their own WhatsApp link with a `Ref:` code the way `ConsultationForm` does — so those
three lack the "match this exact WhatsApp chat back to its Sheet row" ability the other
forms have. `buildLeadRef()` in `src/lib/submitLead.ts` already exists for this; it's
just not wired into those three pages' own WhatsApp links yet.
