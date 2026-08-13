import { GraduationCap, ClipboardList, FileText, CalendarClock, MessageSquare, Repeat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { FinalCTA } from '@/components/home/FinalCTA'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

const INCLUDES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Course & college shortlisting',
    description: 'A curated list matched to your profile, budget and goals — not a generic ranking list.',
    icon: ClipboardList,
  },
  {
    title: 'Application support',
    description: 'Forms, essays and profiles reviewed and strengthened before you submit.',
    icon: FileText,
  },
  {
    title: 'Document preparation',
    description: 'Transcripts, recommendation letters and certificates, organised and checked.',
    icon: GraduationCap,
  },
  {
    title: 'Deadline tracking',
    description: 'Every application deadline tracked so nothing is missed.',
    icon: CalendarClock,
  },
  {
    title: 'Interview preparation',
    description: 'Mock interviews and feedback ahead of the real thing.',
    icon: MessageSquare,
  },
  {
    title: 'Follow-up support',
    description: "Ongoing help until you're confirmed and enrolled.",
    icon: Repeat,
  },
]

export default function AdmissionConsulting() {
  usePageSeo(pageSeo.admissionConsulting)

  return (
    <>
      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
            Admission <span className="text-brand-green">Consulting</span>
          </h1>
          <p className="mt-4 text-lg text-muted-ink">
            [DUMMY CONTENT] From shortlist to enrolment, we handle the paperwork and the pressure so you can focus on
            making the right choice.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What's included</h2>
          <p className="mt-2 text-muted-ink">Everything you need to get from shortlist to admission letter.</p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-[1.6rem] border border-neutral-border bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-tint text-brand-green">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-ink">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <FinalCTA
        variant="button"
        heading="Ready to start your admission process?"
        description="[DUMMY CONTENT] Book a free 15-minute call and we'll map out your shortlist and timeline."
      />
    </>
  )
}
