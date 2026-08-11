# COMPLETE WEBSITE GENERATION PROMPT
## Career Counselling Website — Kishan & Meeta Patel

Build a complete, production-quality, responsive career counselling website using:

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React icons
- React Router
- Modern semantic HTML
- Mobile-first responsive design

Do not use Next.js.

Do not use Bootstrap.

Do not use Material UI.

Do not use generic template styling.

The website must feel like a premium, trustworthy, human-led career counselling practice — not a generic coaching institute, educational template, SaaS website, or corporate consulting website.

---

# 1. BUSINESS CONTEXT

The website is for career counsellors:

**Kishan Patel & Meeta Patel**

They provide career counselling and guidance for:

- Students after Class 10
- Students after Class 12
- UG & PG admission
- MBA & professional education
- Study abroad
- Working professionals changing careers

Business locations:

- Surat
- Navsari
- Ankleshwar
- Valsad

Credibility indicators:

- 30+ years of counselling experience
- 5,000+ students guided
- 900+ Google reviews
- 5.0★ Google rating
- Edumilestones certified career analyst

Important:

Do not invent additional credentials, awards, universities, statistics, testimonials, addresses, prices, or achievements.

Where actual client information is unavailable, use clearly identifiable placeholders.

---

# 2. PRIMARY WEBSITE OBJECTIVES

The website exists primarily to:

1. Establish TRUST
2. Establish CREDIBILITY
3. Create AWARENESS about informed career decisions
4. EDUCATE students and parents
5. Generate WhatsApp enquiries
6. Encourage free consultation bookings
7. Encourage free assessment participation

The website should communicate:

**"Career decisions should be based on understanding, assessment and counselling — not assumptions or pressure."**

The website should feel:

- Trustworthy
- Warm
- Professional
- Human
- Experienced
- Educational
- Reassuring
- Premium but approachable

Avoid making it feel:

- Corporate
- Cold
- Overly academic
- Childish
- Like an exam coaching institute
- Like a generic therapy website
- Like a cheap lead-generation landing page

---

# 3. BRAND COLORS

Use exactly these primary brand colors:

### Primary Yellow

`#FFCC01`

Use for:

- Primary CTA backgrounds
- Important highlights
- Accent elements
- Active states
- Small visual details
- Numbers
- Selected navigation states
- Decorative shapes

### Primary Green

`#014924`

Use for:

- Header
- Footer
- Hero backgrounds
- Section backgrounds
- Headings in selected sections
- Trust elements
- Buttons where appropriate
- Borders and visual accents

### Text Color

Use a sophisticated near-black:

`#111513`

Use for:

- Body text
- Main headings where appropriate
- Navigation
- Form labels

Additional neutral palette can be generated around these colors:

- Warm white: `#FFFDF5`
- Soft cream: `#FFF9E6`
- Light green tint: `#F1F7F3`
- Neutral border: `#E6E8E5`
- Muted text: `#66706A`
- White: `#FFFFFF`

Do not introduce unrelated bright colors.

Red should only be used for validation/error states.

---

# 4. TYPOGRAPHY

Use a modern, highly readable sans-serif typeface.

Preferred:

**Inter**

or another similarly clean professional sans-serif available through the project.

Typography should communicate:

- Trust
- Clarity
- Modern professionalism
- Accessibility

Use strong typographic hierarchy.

Suggested:

- H1: 48–68px desktop
- H2: 36–48px
- H3: 24–30px
- Body: 16–18px
- Small text: 13–14px

Mobile typography must scale appropriately.

Avoid oversized typography that consumes the entire screen.

---

# 5. DESIGN DIRECTION

Create a distinctive visual identity based on:

**Warm editorial + premium professional + human counselling**

The design should combine:

- Large editorial typography
- Real human photography
- Soft cream backgrounds
- Deep green sections
- Yellow highlights
- Generous whitespace
- Rounded but restrained cards
- Subtle borders
- Soft shadows
- Editorial image compositions
- Clear CTA hierarchy

Use visual storytelling instead of filling every section with cards.

Do NOT make every section a 3-column card grid.

Use different compositions:

- Split layouts
- Editorial layouts
- Horizontal timelines
- Large statistics
- Image + text
- Overlapping image cards
- Testimonial cards
- Case-study layouts
- Full-width CTA bands
- Accordions
- Sticky navigation

---

# 6. IMAGE DIRECTION

Photography is extremely important.

Prefer authentic photography of:

- Kishan counselling a student
- Meeta counselling parents/students
- Parent + student conversations
- Real office environment
- Real reports
- Counselling sessions
- Students
- Team
- Workshops

Do not use generic corporate stock photography.

If actual photographs are unavailable during development, use clearly marked image placeholders with comments indicating what photograph should replace them.

Do not use random stock images of smiling business people.

---

# 7. WEBSITE STRUCTURE

Create these six primary pages:

1. `/`
2. `/who-we-are`
3. `/what-we-do`
4. `/success-stories`
5. `/blogs`
6. `/contact-us`

Also support:

- `/blogs/:slug`
- `/thank-you` if required for specific flows

Use React Router.

---

# 8. GLOBAL HEADER

Create a sticky responsive header.

Desktop:

Logo | Home | Who We Are | What We Do | Success Stories | Blogs | Contact Us | **Book Free Session**

The primary CTA should be visually prominent.

Header behavior:

### At top of page

Transparent or visually integrated with the hero.

### After scrolling

White background with subtle bottom border/shadow.

Navigation remains readable.

### Mobile

Use:

- Logo
- Hamburger
- Book button

Mobile menu should animate smoothly.

Do not allow the navigation to become cluttered.

---

# 9. URGENCY RIBBON

Add a thin dismissible announcement ribbon above the header.

Seasonal messages:

### Jan–Mar

"Board exams done? Book your stream selection session before results."

### Apr–Jun

"Results are out. Admission deadlines approaching — book now."

### Jul–Sep

"Late admissions still open. Talk to a counsellor today."

### Oct–Dec

"Planning for next year? Early birds get better college options."

Build this as a reusable component.

Allow the current message to be configured from one location.

---

# 10. FLOATING WHATSAPP

Create a floating WhatsApp button fixed at the bottom-right.

Use the appropriate WhatsApp URL format.

Default message:

"Hi, I want to know about career counselling for my child in Class ___"

The button should:

- Have a recognizable WhatsApp icon
- Be accessible
- Have a tooltip on desktop
- Avoid covering important content
- Sit above the mobile bottom bar

---

# 11. MOBILE BOTTOM BAR

On mobile only:

Fixed bottom navigation:

**Call | WhatsApp | Book**

Call:
`tel:+918758175187`

WhatsApp:
Open WhatsApp with the generic enquiry message.

Book:
Scroll/open the relevant booking form.

The bottom bar must not cover content.

---

# 12. WHATSAPP-FIRST FORM SYSTEM

This is extremely important.

The website's main enquiry forms do NOT submit to a traditional backend lead form.

Instead:

**Form → Generate WhatsApp Message → Open WhatsApp → Visitor Sends Message**

The form collects:

- Student Name
- Phone / WhatsApp
- Current Class

Optional Email only for the free assessment.

Current Class options:

- Class 9–10
- Class 11–12
- UG Student
- PG / MBA
- Working Professional
- Parent Enquiring

Validate:

- Student name required
- Phone required
- Valid Indian 10-digit phone number
- Current class required

After validation:

1. Construct a contextual WhatsApp message.
2. Encode the message.
3. Open WhatsApp.
4. Use `https://wa.me/918758175187?text=...`
5. On mobile, use the WhatsApp app when supported.
6. On desktop, allow WhatsApp Web.

Do not expose the raw URL in the UI.

---

# 13. CONTEXTUAL WHATSAPP MESSAGES

The generated message must change according to the section.

## Home

"Hi, I would like to book a free career counselling consultation.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]

I found you through the website."

## After 10th

"Hi, I am looking for career counselling after Class 10.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]

I would like to know more about stream selection and career options."

## After 12th

"Hi, I am looking for career guidance after Class 12.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]

I would like to know more about course and college selection."

## UG & PG Admission

"Hi, I would like to know more about UG/PG admission guidance.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]

I would like help with course and college selection."

## MBA & Professional

"Hi, I would like to know more about MBA and professional career guidance.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]"

## Study Abroad

"Hi, I am interested in study abroad counselling.

Student Name: [NAME]
Current Class: [CLASS]
Phone: [PHONE]

I would like to know more about countries, universities and the admission process."

## Career Change

"Hi, I am looking for career change counselling.

Name: [NAME]
Phone: [PHONE]

I would like to discuss my career options and possible transition."

---

# 14. HOME PAGE

Create a highly polished homepage with the following sections.

## 14.1 Hero

Left:

Eyebrow:

"Google's highest-rated career counsellors in Surat"

H1:

**"Stop guessing which stream is right for your child."**

Description:

"Aptitude testing and one-on-one counselling from Kishan & Meeta Patel — 30 years, 5,000+ students, 900+ five-star reviews."

Form:

Student Name | Phone / WhatsApp | Current Class

CTA:

**Book Free Session**

Secondary:

**Or WhatsApp us directly →**

Right:

Large authentic counselling photograph.

Create subtle yellow decorative shapes and green visual framing.

Do not use excessive decoration.

---

## 14.2 Trust Strip

Display:

**5.0★** Google Rating  
**900+** Reviews  
**30+** Years  
**5,000+** Students Guided  
**4** Cities  
**Edumilestones** Certified

Animate counters when entering viewport.

---

## 14.3 Problem Section

Heading:

**"Sound familiar?"**

Subheading:

"Most families we meet are stuck on one of these."

Four problems:

1. Science, Commerce or Arts — and no way to decide
2. You and your child want different things
3. Wrong stream chosen. Now what?
4. No idea which colleges to even apply to

Use empathetic visual treatment.

---

## 14.4 Who We Help

Heading:

**"Where are you right now?"**

Six service cards:

### After 10th

Science, Commerce or Arts? Decide with data, not pressure.

### After 12th

Degree, course, college — before deadlines close.

### UG & PG Admission

Shortlists, applications, forms, follow-up. Handled.

### MBA & Professional

CAT, entrances, specialisation. Pick the right one.

### Study Abroad

Country, university, budget, visa. Mapped out.

### Career Change

Stuck in the wrong job? It's not too late.

Cards link to corresponding sections on `/what-we-do`.

---

## 14.5 How It Works

Heading:

**"How it works"**

Subheading:

"Four steps. Complete clarity."

Create an elegant horizontal timeline.

01:

**Free consultation call**

15 minutes. We understand the situation.

02:

**Psychometric assessment**

Aptitude, interest, personality and EQ.

03:

**One-on-one session + report**

Detailed counselling session with Kishan or Meeta.

04:

**Roadmap and admission support**

Course shortlist, college list, timeline and application help.

---

## 14.6 What You Walk Away With

Heading:

**"What you walk away with"**

Subheading:

"Not advice you'll forget. A document you'll use for years."

Large photograph of real report on left.

Deliverables on right:

- 32-page career report
- Aptitude and interest profile
- SWOT analysis worksheet
- Shortlist of 8–12 careers
- College and course list

Add real report thumbnails below.

Clicking a thumbnail opens a lightbox.

---

## 14.7 Free Assessment

Use a contrasting green section.

Heading:

**"Not ready to book? Start with the free assessment."**

Description:

"10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile."

Show a partially blurred report preview.

CTA:

**Take the Free Assessment**

Popup form:

- Student Name
- Phone
- Current Class
- Email

After validation, generate WhatsApp message and allow visitor to continue to Edumilestones.

---

## 14.8 Meet Kishan & Meeta

Two-column layout.

Use real photographs.

### Kishan Patel

Career Counsellor.

30+ years guiding students across Gujarat.

Certified Career Analyst — Edumilestones.

### Meeta Patel

Career Counsellor.

Specialises in working with parents and students together, particularly around stream selection after Class 10.

CTA:

**Read Our Full Story →**

---

## 14.9 Video Testimonials

Heading:

**"Hear it from parents"**

Three testimonial videos.

Each includes:

- Name
- Relationship
- City

Example:

"Mrs. Meena Shah · Parent · Surat"

Use video modal/lightbox.

If videos aren't available, create polished testimonial placeholders.

---

## 14.10 Success Stories Preview

Heading:

**"Real students. Real decisions."**

Three cards.

Use:

**Was → Found → Chose → Now**

Example:

Aarav S. · Class 10 · Surat

Was:
Pushed toward Science by family.

Found:
Strong numerical aptitude, low interest in life sciences, higher compatibility with commerce logic.

Chose:
Commerce with Maths.

Now:
CA Foundation cleared.

CTA:

**View All Success Stories →**

---

## 14.11 Google Reviews

Use a reusable Google Reviews component.

If live API/widget integration is unavailable, create a visually realistic placeholder component and make the data source easy to replace.

Do not fabricate reviews.

---

## 14.12 Locations

Heading:

**"Meet us in person"**

Four location cards:

- Surat
- Navsari
- Ankleshwar
- Valsad

Each supports:

- Address placeholder
- Landmark
- Timings
- Phone
- Directions

Surat should have a map placeholder/component.

---

## 14.13 FAQ

Use shadcn Accordion.

Questions:

1. How does career counselling work?
2. Is the first consultation really free?
3. My child is in Class 10 — is that too early?
4. Do you do online sessions or only in person?
5. How long does the whole process take?
6. Is this just a psychometric test, or actual counselling?
7. Should my child attend alone, or do parents come too?
8. Do you help with the actual college admission process?

Add FAQ schema-ready structured data.

---

## 14.14 Final CTA

Large green/yellow CTA section.

Heading:

**"Let's talk about your child's future"**

Description:

"A 15-minute call costs nothing and usually clears up more than months of guessing."

Form:

Student Name | Phone | Current Class

CTA:

**Book Free Session**

---

# 15. WHO WE ARE PAGE

Create:

## Hero

"30 years. 5,000 students. One question we keep answering."

Subheading:

"What should I do with my life? Here's how we help families answer it."

Use authentic office/counselling photography.

## Trust Strip

Same credibility indicators.

## Our Story

400–600 word narrative from Kishan.

Topics:

- What he was doing before counselling
- The moment that made him start
- Why Surat
- Why Meeta joined
- Their philosophy

## Kishan & Meeta

Detailed professional profiles.

## Our Methodology

Explain:

- Edumilestones psychometric framework
- Aptitude
- Interest
- Personality
- EQ
- SWOT
- Parent involvement

Include:

**What We Don't Do**

- No fortune telling
- No fixed "hot career" list
- No pushing students toward specific courses
- No admission-selling-first approach

## Our Journey

Timeline with milestones.

## Real Work

Office and counselling photographs.

## Problems Families Face

Reuse homepage problem section.

## How It Works

Reuse four-step timeline.

## What You Get

Reuse report section.

## Success Stories

Six case studies preview.

## Video Testimonials

Three videos.

## Universities & Colleges

Verified institution logo grid.

## Google Reviews

Live review section.

## What We Do

Six service cards.

## Final CTA

Book Free Session.

---

# 16. WHAT WE DO PAGE

## Hero

H1:

**"Career guidance for every important decision."**

Subheading:

"From choosing a stream after Class 10 to changing careers — get clarity backed by assessment, experience and one-on-one counselling."

Below hero create sticky service navigation:

- After 10th
- After 12th
- UG & PG Admission
- MBA & Professional
- Study Abroad
- Career Change

---

## Trust Strip

Same.

## Problem Section

Same.

## How It Works

Same.

## What You Get

Same.

---

# SERVICE SECTION 1 — AFTER 10TH

ID:

`after-10th`

H2:

**Career Counselling After 10th**

Subheading:

**Stream selection based on understanding, not pressure.**

Who it's for:

Students in Class 9–10.

Cover:

- Science vs Commerce vs Arts
- Aptitude
- Interests
- Strengths
- Subject suitability
- Career possibilities
- Parent counselling
- Career roadmap

CTA:

**Book After 10th Counselling**

---

# SERVICE SECTION 2 — AFTER 12TH

ID:

`after-12th`

H2:

**Career Counselling After 12th**

Cover:

- Course selection
- College selection
- Entrance exams
- Career options
- Application strategy
- Roadmap

CTA:

**Book After 12th Counselling**

---

# SERVICE SECTION 3 — UG & PG ADMISSION

ID:

`ug-pg-admission`

Cover:

- Course shortlist
- College shortlist
- Application forms
- Document preparation
- Deadline tracking
- Follow-up

CTA:

**Get Admission Guidance**

---

# SERVICE SECTION 4 — MBA & PROFESSIONAL

ID:

`mba`

Cover:

- CAT and entrance strategy
- Specialisation selection
- College selection
- Career outcomes
- ROI considerations
- Application guidance

CTA:

**Discuss Your MBA Options**

---

# SERVICE SECTION 5 — STUDY ABROAD

ID:

`study-abroad`

Cover:

- Country selection
- University shortlist
- Course selection
- Budget planning
- Application guidance
- Visa guidance

CTA:

**Plan Your Study Abroad Journey**

---

# SERVICE SECTION 6 — CAREER CHANGE

ID:

`career-change`

Cover:

- Transferable skills
- Career assessment
- Career options
- Upskilling
- Transition planning
- Practical roadmap

CTA:

**Discuss Your Career Change**

---

## Service Comparison

Create a useful comparison table WITHOUT pricing.

Columns:

- Service
- Who It's For
- Duration
- Assessment
- Admission Support
- Best Time to Start

Do not include any price column.

---

## Success Stories

Three stories.

## Video Testimonials

Three videos.

## Google Reviews

Reviews section.

## Free Assessment

Assessment CTA.

## Final CTA

"Not sure which counselling service you need?"

CTA:

**Book a Free Consultation**

---

# 17. SUCCESS STORIES PAGE

This should be a dedicated high-trust case-study page.

## Hero

H1:

**"Real students. Real decisions. Real outcomes."**

Subheading:

"See how students and families moved from confusion to clarity."

## Trust Strip

Same.

## Featured Case Study

Large editorial case study.

Structure:

### WAS

The original situation.

### FOUND

What assessment/counselling revealed.

### CHOSE

The final decision.

### NOW

The outcome.

Include:

- Student image
- Class
- City
- Service
- Outcome

## Filters

- All
- After 10th
- After 12th
- Admission
- MBA & Professional
- Study Abroad
- Career Change

## Case Study Grid

Use rich cards.

Avoid generic testimonial-card design.

## Video Stories

Three or more video testimonials.

## What Makes The Difference

Explain:

Generic career advice vs.

**Assessment + counselling + personalized roadmap**

## Google Reviews

Live reviews.

## Final CTA

**"Your child's story could be next."**

CTA:

**Book Free Session**

---

# 18. BLOGS PAGE

## Blog Hero

H1:

**"Career guidance, explained."**

Subheading:

"Practical guidance for students and parents making important education and career decisions."

Search box.

## Categories

- After 10th
- After 12th
- Exams
- Colleges
- Careers
- Parenting

## Featured Post

Large editorial feature.

## Blog Grid

Three-column desktop grid.

Each card:

- Image
- Category
- Title
- Excerpt
- Read time
- Date

Pagination.

## Free Assessment

Assessment CTA.

## Final CTA

Book Free Session.

---

# 19. BLOG DETAIL PAGE

URL:

`/blogs/:slug`

Structure:

Breadcrumb

Article header

- Category
- Title
- Publish date
- Read time
- Author

Featured image

Sticky table of contents

Article content

Inline CTA around 40% scroll:

**Not sure what is right for your child? Book a free consultation.**

Desktop sticky sidebar:

Student Name
Phone
Current Class

CTA:

**Book Free Session**

Author section:

Kishan or Meeta

- Photograph
- Credentials
- Short biography

Related posts

Final CTA

---

# 20. INITIAL BLOG CONTENT

Create the following blog cards/content placeholders:

1. Which stream after 10th — Science, Commerce or Arts?
2. Is Commerce with Maths a good choice?
3. Career options after 12th Science without NEET
4. Best colleges in Gujarat for BBA
5. What is a psychometric test and does it actually work?
6. How to choose a career when your parents disagree
7. Career counselling in Surat — what to expect
8. Career counselling in Navsari, Ankleshwar and Valsad
9. Arts stream careers that actually pay well in India
10. Study abroad after 12th — countries, costs and timelines
11. Should my child take a drop year?
12. Complete admission timeline for Gujarat students

Create enough realistic content structure to demonstrate the design, but do not fabricate factual claims.

---

# 21. CONTACT US PAGE

This should function primarily as a booking and WhatsApp conversion page.

## Hero

H1:

**"Book your free consultation"**

Subheading:

"15 minutes with Kishan or Meeta. No cost, no obligation, no sales pitch."

Include booking/calendar area.

If actual calendar integration is unavailable, create a polished booking placeholder.

## Two Paths

### I want to talk to someone

CTA:

**Book Free Consultation**

### I want to start with the free assessment

CTA:

**Take Free Assessment**

## What Happens On The Call

1. Understand current class, marks and interests
2. Explain appropriate counselling service
3. Answer questions
4. Decide next steps

Closing:

**"You'll speak to Kishan or Meeta directly. Not a sales team."**

## Contact Methods

Call / WhatsApp:

`+91 87581 75187`

Email:

`kishan@bestcareercounselling.com`

Use as placeholder if client has not confirmed it.

## Locations

Surat
Navsari
Ankleshwar
Valsad

Use placeholder addresses where actual data is unavailable.

## Meet Kishan & Meeta

Short profiles.

## Google Reviews

Reviews.

## Booking FAQ

1. Is the consultation really free?
2. Is the session online or in person?
3. Should my child join the call?
4. What should I have ready before the call?
5. How soon can I get an appointment?

---

# 22. THANK-YOU STATE

Because the primary enquiry system opens WhatsApp, a traditional thank-you page is not necessary for every enquiry.

However, support `/thank-you` for future tracking or booking integrations.

Possible content:

"Thank you. Your WhatsApp message is ready to send."

CTA:

**Continue to WhatsApp**

Then:

- Free guide
- Recommended blog articles
- Contact details

---

# 23. COMPONENT ARCHITECTURE

Create reusable components.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── MobileBottomBar.tsx
│   │
│   ├── navigation/
│   │   ├── DesktopNav.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── whatsapp/
│   │   ├── WhatsAppButton.tsx
│   │   ├── WhatsAppForm.tsx
│   │   └── whatsappMessages.ts
│   │
│   ├── forms/
│   │   ├── ConsultationForm.tsx
│   │   └── AssessmentForm.tsx
│   │
│   ├── trust/
│   │   ├── TrustStrip.tsx
│   │   └── GoogleReviews.tsx
│   │
│   ├── counselling/
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceSection.tsx
│   │   └── ProcessTimeline.tsx
│   │
│   ├── stories/
│   │   ├── SuccessStoryCard.tsx
│   │   ├── SuccessStoryCaseStudy.tsx
│   │   └── TestimonialVideo.tsx
│   │
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── BlogFilters.tsx
│   │   └── BlogArticle.tsx
│   │
│   ├── locations/
│   │   └── LocationCard.tsx
│   │
│   └── ui/
│       └── shadcn components
│
├── pages/
│   ├── Home.tsx
│   ├── WhoWeAre.tsx
│   ├── WhatWeDo.tsx
│   ├── SuccessStories.tsx
│   ├── Blogs.tsx
│   ├── BlogDetail.tsx
│   ├── ContactUs.tsx
│   └── ThankYou.tsx
│
├── data/
│   ├── services.ts
│   ├── stories.ts
│   ├── blogs.ts
│   ├── testimonials.ts
│   └── locations.ts
│
├── lib/
│   ├── whatsapp.ts
│   └── utils.ts
│
└── App.tsx
```

Keep content data separate from presentation wherever practical.

---

# 24. SHADCN COMPONENTS

Use shadcn/ui selectively.

Useful components:

- Button
- Card
- Input
- Select
- Dialog
- Accordion
- Badge
- Separator
- Sheet
- Tabs
- Table
- Avatar
- Tooltip
- Carousel where appropriate

Do not make the website look like a default shadcn demo.

Customize the components heavily through the brand system.

---

# 25. INTERACTIONS

Use subtle animations.

Recommended:

- Fade-up on scroll
- Counter animation
- Image reveal
- Card hover
- Button micro-interaction
- Navigation transition
- Accordion animation
- Dialog animation
- Mobile menu slide-in
- Testimonial carousel

Keep animations subtle.

Do NOT use:

- Excessive parallax
- Constant floating animations
- Large page transitions
- Distracting effects
- Overly playful animations

The user should feel trust and calm.

---

# 26. RESPONSIVE DESIGN

Design mobile-first.

Breakpoints:

- Mobile
- Tablet
- Desktop
- Large desktop

Every section must be carefully designed for:

### 360px

### 390px

### 768px

### 1024px

### 1280px

### 1440px+

Do not simply stack desktop sections vertically.

Create intentional mobile compositions.

Examples:

- Hero becomes vertical
- Trust strip becomes 2-column
- Service cards become horizontal/stacked
- Timeline becomes vertical
- Tables become horizontally scrollable or card-based
- Desktop sidebar disappears
- Mobile CTA bar becomes fixed
- Navigation becomes drawer

---

# 27. ACCESSIBILITY

Follow WCAG-oriented practices.

Requirements:

- Semantic HTML
- Proper heading hierarchy
- Accessible labels
- Keyboard navigation
- Visible focus states
- Alt text
- Accessible dialogs
- Accessible accordion
- Sufficient contrast
- Buttons must be actual buttons
- Links must be actual links
- Form errors must be understandable

Ensure yellow buttons have sufficiently dark text.

---

# 28. SEO

Implement basic technical SEO.

Each page should have:

- Unique `<title>`
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter metadata
- Semantic headings
- Structured content
- Descriptive image alt text

Implement structured data where appropriate:

- LocalBusiness
- Person
- FAQPage
- Article
- BreadcrumbList

Do not fabricate structured-data claims.

---

# 29. PERFORMANCE

Optimize for excellent Core Web Vitals.

Requirements:

- Lazy load below-the-fold images
- Responsive image sizing
- Avoid huge image files
- Use modern image formats where possible
- Avoid unnecessary JavaScript
- Code split routes
- Lazy load blog pages
- Lazy load video embeds
- Avoid loading maps until necessary
- Avoid excessive animation libraries

---

# 30. CONTENT RULES

Do not invent:

- Testimonials
- Student success results
- Addresses
- University names
- Certifications
- Awards
- Pricing
- Review counts beyond supplied figures
- Counselling outcomes
- Client logos

Use placeholders where necessary.

All placeholder content should be easy to replace.

Example:

`[REAL OFFICE PHOTO — SURAT]`

`[CLIENT TO PROVIDE ADDRESS]`

`[CLIENT TO PROVIDE TESTIMONIAL]`

---

# 31. WHAT NOT TO DO

Do not create:

- Pricing sections
- Pricing cards
- Pricing comparison
- USD pricing
- Generic coaching packages
- Generic stock-photo-heavy layouts
- Login/Register in primary navigation
- Fake reviews
- Fake success stories
- Fake university logos
- Excessive gradients
- Neon colors
- Glassmorphism-heavy UI
- Excessive rounded cards
- Cartoon illustrations
- Overly childish education visuals

The website is for parents making serious decisions about their children's futures.

---

# 32. FOOTER

Create a substantial premium footer.

Deep green background:

`#014924`

Include:

### Brand

Logo + short description.

Google 5.0★ / 900+ Reviews.

### Navigation

Home  
Who We Are  
What We Do  
Success Stories  
Blogs  
Contact Us

### Services

After 10th  
After 12th  
UG & PG Admission  
MBA & Professional  
Study Abroad  
Career Change

### Contact

+91 87581 75187

Email

Surat · Navsari · Ankleshwar · Valsad

### Bottom

Copyright

Privacy Policy

Terms

Refund Policy

Student Dashboard

---

# 33. FINAL UX FLOW

The entire website should follow this psychological journey:

**Confusion**

↓

"What should my child choose?"

↓

**Awareness**

"There is a better way to make this decision."

↓

**Trust**

"These counsellors have 30+ years of experience."

↓

**Evidence**

"5,000+ students and 900+ reviews."

↓

**Understanding**

"Now I understand their methodology."

↓

**Proof**

"I can see real success stories."

↓

**Low-friction action**

"I can talk to them for free."

↓

**WhatsApp**

"Book Free Session"

---

# 34. FINAL CONVERSION STRATEGY

Primary conversion:

**Book Free Session**

Secondary conversion:

**Take Free Assessment**

Persistent conversion:

**WhatsApp**

Every page should have multiple contextual opportunities to take one of these actions, but never make the website feel pushy.

---

# 35. FINAL DEVELOPMENT REQUIREMENT

Generate the COMPLETE working website.

Do not generate only a homepage.

Implement:

- All six pages
- Blog detail route
- Responsive navigation
- Mobile navigation
- Footer
- Announcement bar
- Floating WhatsApp
- Mobile bottom CTA bar
- All forms
- WhatsApp message generation
- Service anchors
- FAQ accordions
- Testimonial sections
- Success stories
- Blog listing
- Blog detail
- Image lightboxes
- Responsive layouts
- SEO metadata
- Reusable components
- Proper routing
- Loading states where needed
- Empty/placeholder states
- Accessibility
- Responsive behavior

The final result should look like a **real, premium, production-ready career counselling website**, not an AI-generated template.

Prioritize:

**Trust → Clarity → Human Connection → Proof → Conversion**

Use the brand colors consistently:

**#FFCC01 + #014924 + #111513**

Keep the visual language sophisticated, warm, editorial and human.
