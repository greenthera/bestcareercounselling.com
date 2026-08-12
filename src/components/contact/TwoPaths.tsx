import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { AssessmentForm } from '@/components/forms/AssessmentForm'

export function TwoPaths() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-border bg-white p-6">
          <h3 className="text-xl font-bold text-ink">I want to talk to someone</h3>
          <p className="mt-2 text-sm text-muted-ink">
            A free 15-minute call with Kishan or Meeta — no obligation.
          </p>
          <div className="mt-6">
            <ConsultationForm context="home" submitLabel="Book Free Consultation" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-white p-6">
          <h3 className="text-xl font-bold text-ink">I want to start with the free assessment</h3>
          <p className="mt-2 text-sm text-muted-ink">
            10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
              >
                Take Free Assessment
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
      </div>
    </section>
  )
}
