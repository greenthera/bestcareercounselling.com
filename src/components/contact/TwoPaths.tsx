import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { AssessmentForm } from '@/components/forms/AssessmentForm'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'

export function TwoPaths() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
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
          <div className="h-full rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <h3 className="text-xl font-bold text-ink">I want to start with the free assessment</h3>
            <p className="mt-2 text-sm text-muted-ink">
              10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90"
                >
                  Take Free Assessment
                  <PillCtaEndcap tone="yellow" />
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
