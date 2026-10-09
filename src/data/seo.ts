export interface PageSeo {
  title: string
  description: string
  path: string
  /** Set true for pages that shouldn't be indexed (e.g. a post-submission confirmation page). Defaults to indexable. */
  noindex?: boolean
}

export const pageSeo = {
  home: {
    title: 'Best Career Counselling Surat | 5★, 900+ Reviews',
    description:
      'Career counselling and stream selection guidance from Kishan & Meeta Patel in Surat, with 30+ years of aptitude testing and one-on-one guidance.',
    path: '/',
  },
  whoWeAre: {
    title: 'Who We Are | Kishan & Meeta Patel Career Counselling',
    description:
      '30+ years, 5,000+ students guided. Meet Kishan & Meeta Patel and learn how we help families make informed career decisions.',
    path: '/who-we-are',
  },
  whatWeDo: {
    title: 'What We Do | Career Counselling Services',
    description:
      'Career counselling for every stage: after 10th, after 12th, UG & PG admission, MBA, study abroad and career change.',
    path: '/what-we-do',
  },
  contactUs: {
    title: 'Contact Us | Book a Free Consultation',
    description: 'Book a free 15-minute consultation with Kishan or Meeta. No cost, no obligation, no sales pitch.',
    path: '/contact-us',
  },
  thankYou: {
    title: 'Thank You | Kishan & Meeta Patel',
    description: 'Thank you for reaching out. Your WhatsApp message is ready to send.',
    path: '/thank-you',
    noindex: true,
  },
  admissionConsulting: {
    title: 'Admission Consulting | Best Career Counselling',
    description:
      'Admission consulting from shortlist to enrolment. Kishan & Meeta Patel handle applications, documents and deadlines so you can focus on the right choice.',
    path: '/admission-consulting',
  },
  onlineAdmissions: {
    title: 'Online University Admissions | Best Career Counselling',
    description:
      'Compare online universities, fees, eligibility and specializations with a dedicated admission counsellor. NMIMS, Manipal, DPU, Amity, ATLAS and more.',
    path: '/admission-consulting/online-admissions',
  },
  careerCounselling: {
    title: 'Career Counselling | Best Career Counselling',
    description:
      'Career counselling backed by 30 years of aptitude testing. Understand your strengths, weigh real options and leave with a practical plan.',
    path: '/career-counselling',
  },
  mbaAdmissionCounselling: {
    title: 'MBA Admission Counselling | Best Career Counselling',
    description:
      'Expert guidance to shortlist MBA colleges, understand entrance exam requirements and navigate the admission process. For MBA aspirants in Surat.',
    path: '/mba-admission-counselling',
  },
  ugAdmissionCounselling: {
    title: 'UG Admission Counselling | Best Career Counselling',
    description:
      'Explore undergraduate courses after Class 12, understand college admission criteria and choose the right path. UG admission counselling in Surat.',
    path: '/ug-admission-counselling',
  },
  schoolStudentCareerAssessment: {
    title: 'Career Assessment for School Students | Best Career Counselling',
    description:
      'A free 3-minute self-assessment for school students. Answer 20 quick questions to see how much clarity you already have about your career direction.',
    path: '/school-student-career-assessment',
  },
  parentCareerClarityAssessment: {
    title: 'Parent Career Clarity Assessment | Best Career Counselling',
    description:
      "A free 3-4 minute assessment for parents. Answer 12 quick questions to see how clear you are about your child's career direction.",
    path: '/parent-career-clarity-assessment',
  },
  privacyPolicy: {
    title: 'Privacy Policy | Best Career Counselling',
    description: 'How Best Career Counselling collects, uses and protects your personal information.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms of Service | Best Career Counselling',
    description: "The terms governing your use of Best Career Counselling's services.",
    path: '/terms',
  },
} satisfies Record<string, PageSeo>
