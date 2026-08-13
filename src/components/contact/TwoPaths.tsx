import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { AssessmentForm } from '@/components/forms/AssessmentForm'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'
import { ClipboardCheck } from 'lucide-react'

export function TwoPaths() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-8 md:py-14">
      <div className="flex flex-col gap-5">
        <Reveal>
          <div className="rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <h3 className="text-xl font-bold text-ink">I want to talk to someone</h3>
            <p className="mt-2 text-sm text-muted-ink">
              A free 15-minute call with Kishan or Meeta — no obligation.
            </p>
            <div className="mt-6">
              <ConsultationForm context="home" submitLabel="Book Free Consultation" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-[1.6rem] bg-brand-green p-6 text-warm-white shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-yellow text-ink">
              <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl font-bold">I want to start with the free assessment</h3>
            <p className="mt-2 text-sm text-warm-white/70">
              10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['10 minutes', 'No payment', 'Instant snapshot'].map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-warm-white/80">
                  {tag}
                </span>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-yellow/90 hover:shadow-[0_10px_30px_-8px_rgba(255,204,1,0.5)] sm:w-auto"
                >
                  Take Free Assessment
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}
