import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface SuccessStory {
  slug: string
  studentInitial: string
  studentClass: string
  city: string
  service: string
  filterCategory: WhatsAppContext
  imageAlt: string
  was: string
  found: string
  chose: string
  now: string
}

export const successStories: SuccessStory[] = [
  {
    slug: 'stream-confusion-after-10th-surat',
    studentInitial: 'R.S.',
    studentClass: 'Class 10',
    city: 'Surat',
    service: 'After 10th',
    filterCategory: 'after-10th',
    imageAlt: 'A Class 10 student from Surat reviewing career options',
    was: 'Torn between Science and Commerce, mostly to keep options open for family and friends.',
    found: 'A strong aptitude for structured problem-solving and low interest in pure memorization-heavy subjects.',
    chose: 'Science with Computer Science, based on aptitude scores rather than peer pressure.',
    now: 'Settled into Class 11 with clear direction and no second-guessing.',
  },
  {
    slug: 'after-12th-course-selection-navsari',
    studentInitial: 'P.D.',
    studentClass: 'Class 12',
    city: 'Navsari',
    service: 'After 12th',
    filterCategory: 'after-12th',
    imageAlt: 'A Class 12 student from Navsari discussing college options',
    was: 'Overwhelmed by a long list of possible courses with no way to compare them.',
    found: 'A clear interest in design and visual communication over the engineering path being pushed at home.',
    chose: 'A B.Des programme, backed by a shortlist of colleges and a realistic application timeline.',
    now: 'Two years into the course and building a portfolio for internships.',
  },
  {
    slug: 'career-change-working-professional-valsad',
    studentInitial: 'M.K.',
    studentClass: 'Working Professional',
    city: 'Valsad',
    service: 'Career Change',
    filterCategory: 'career-change',
    imageAlt: 'A working professional from Valsad planning a career transition',
    was: 'Five years into a job with no growth and no clear next step.',
    found: 'Transferable skills in client communication that mapped well onto a completely different field.',
    chose: 'A structured transition into digital marketing, with an upskilling plan and realistic timeline.',
    now: 'Working in a new role with a clearer sense of long-term direction.',
  },
]
