import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AssessmentForm } from '@/components/forms/AssessmentForm'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import counsellingTwo from '@/assets/CounsellingTwo.webp'

export function FreeAssessmentSection() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-green px-6 py-14 text-center text-warm-white md:px-8 md:py-16">
        <div className="pointer-events-none absolute right-4 top-4 h-56 w-56 animate-float-slow rounded-full bg-brand-yellow/10 blur-3xl" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Not ready to book? Start with the <span className="text-brand-yellow">free</span> assessment.
          </h2>
          <p className="mt-3 text-warm-white/60">
            15 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
          </p>

          <div
            className="group mx-auto mt-8 aspect-[3/2] max-w-md overflow-hidden rounded-[1.6rem] border border-white/15"
            role="img"
            aria-label="Sample assessment report preview"
          >
            <div className="h-full w-full blur-[1px] transition-all duration-500 group-hover:blur-none">
              <PlaceholderVisual label="Sample assessment report preview" tone="dark" src={counsellingTwo} />
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-yellow/90 hover:shadow-[0_10px_30px_-8px_rgba(255,204,1,0.5)]"
              >
                Take the Free Assessment
                <PillCtaEndcap tone="dark" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Take the Free Assessment</DialogTitle>
              </DialogHeader>
              <AssessmentForm />
            </DialogContent>
          </Dialog>
        </Reveal>
      </div>
    </section>
  )
}
