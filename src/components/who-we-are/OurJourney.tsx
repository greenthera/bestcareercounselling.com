import {
  Rocket,
  GraduationCap,
  BookOpen,
  Building2,
  Sparkles,
  UserPlus,
  TrendingUp,
  Compass,
  CalendarCheck,
  Presentation,
  School,
  Handshake,
  Trophy,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { ExpandableText } from '@/components/ui/expandable-text'

const MILESTONES = [
  {
    period: '1992–1995',
    title: 'The Beginning in Education & Technology',
    text: 'Kishan Patel begins his professional journey with Best Computers, Gujarat, working in the education and computer-training space and building an early foundation in technology-led learning.',
    icon: Rocket,
  },
  {
    period: '1995–2001',
    subtitle: 'Aptech Computer Education',
    title: 'From Training to Vocational Education',
    text: "His work expands into career-oriented training and vocational education, including his association with Aptech Computer Education and involvement in vocational education initiatives through Rotary. He also takes on leadership roles focused on vocational education and student development.",
    icon: GraduationCap,
  },
  {
    period: '2000–2008',
    title: 'Deepening the Focus on Students & Learning',
    text: "Kishan's work during this period is closely associated with Aptech Computer Education, where he continues developing his experience in student development, professional training and education. In 2000–01, he also trains students of Indian origin in the USA on VIPS: Values, Interest, Personality & Skills, bringing a strong focus on understanding the individual beyond academics.",
    icon: BookOpen,
  },
  {
    period: '2009–2021',
    title: 'Expanding Education & Training Leadership',
    text: 'Kishan continues to build his experience across educational and training organisations, including Arena Animation and ZICA (Zee Institute of Creative Art), where he serves as Centre Head and Business Development Manager. His work continues to span student development, institutional management, training and educational programmes, strengthening the experience that would eventually lead into Best Career Counselling.',
    icon: Building2,
  },
  {
    period: '2015',
    title: 'Best Career Counselling Begins',
    text: 'Best Career Counselling begins its journey, bringing together years of experience in education, training and student development with a focused purpose, helping students and families make better-informed career decisions.',
    icon: Sparkles,
  },
  {
    period: '2018',
    title: 'Meeta Patel Joins the Journey',
    text: 'Meeta Patel joins Best Career Counselling and begins her journey as a career counsellor. Over the years, she becomes the emotional anchor of the counselling process, building trust with students and parents, listening deeply, and helping students understand their strengths, interests, challenges and aspirations.',
    icon: UserPlus,
  },
  {
    period: '2018–2024',
    title: 'Growing the Counselling Journey',
    text: 'Best Career Counselling continues to grow through its work with students and families, helping them understand themselves, explore possibilities and make informed decisions about education and careers. Along the way, the trust of the students and families we served continued to grow, reflected in 950+ genuine and real 5-star Google reviews earned through our counselling and services. The focus remains simple: understand the individual before choosing the direction.',
    icon: TrendingUp,
  },
  {
    period: '2024 onwards',
    title: 'Expanding into Admissions',
    text: 'Our work expands beyond career counselling into admissions counselling and education consulting, alongside growing relationships with colleges and universities.',
    icon: Compass,
  },
  {
    period: '15–16 January 2025',
    title: 'Our First MBA Admission Expo',
    text: 'After months of preparation, marketing and relationship-building with educational institutions, we hosted our first Admission Expo, focused on MBA admissions. It marked a new chapter: bringing MBA aspirants, families and participating colleges and universities together on one platform.',
    icon: CalendarCheck,
  },
  {
    period: 'January 2026',
    title: 'MBA Admission Expo',
    text: 'Building on the success of our first MBA Admission Expo, we brought together MBA aspirants, parents and leading colleges and universities on a larger platform. The expo gave students the opportunity to meet institutions directly, understand programmes and specialisations, explore admission options and make more informed decisions about their MBA journey.',
    icon: Presentation,
  },
  {
    period: 'April 2026',
    title: 'UG Admission Expo',
    text: 'Taking our admissions initiative to the undergraduate level, we brought together students, parents and participating colleges and universities under one platform. The expo helped students explore courses, understand their options, interact directly with institutions and gain greater clarity before making an important higher-education decision.',
    icon: School,
  },
  {
    period: 'May 2026',
    title: 'Specialised College Events',
    text: "We continued our institutional engagement through focused events with leading educational institutions, including Masters' Union, Imperial School of Banking & Management Studies, Pune, and Universal AI University, Karjat. These focused events allowed students to engage more directly with institutions, understand their programmes and get closer to making an informed admission decision.",
    icon: Handshake,
  },
  {
    period: 'Today',
    title: 'A Wider Guidance Ecosystem',
    text: 'Today, Best Career Counselling brings together career counselling, admissions counselling, education consulting and student–institution engagement. From "What should I do?" to "Where should I study?" and "How do I get there?", we continue to help students move forward with greater clarity and confidence. The journey has evolved. The purpose remains the same.',
    icon: Trophy,
  },
]

export function OurJourney() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Our journey</h2>
          <p className="mt-2 font-medium text-brand-green">
            From education and training to career counselling and admissions guidance
          </p>
          <p className="mt-2 text-muted-ink">
            Our journey has grown from decades of experience in education, training and student development,
            evolving into a wider guidance ecosystem for students and families.
          </p>
        </Reveal>

        <ol className="relative mx-auto mt-14 max-w-2xl space-y-4">
          <div
            className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-brand-green via-brand-green to-brand-yellow"
            aria-hidden="true"
          />
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon
            return (
              <Reveal key={milestone.title} delay={Math.min(index * 60, 600)} as="li">
                <div className="group relative flex gap-6">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:text-ink group-hover:shadow-xl">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                      {milestone.period}
                      {milestone.subtitle && ` · ${milestone.subtitle}`}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-ink">{milestone.title}</p>
                    <ExpandableText text={milestone.text} className="mt-1 text-sm text-muted-ink" />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
