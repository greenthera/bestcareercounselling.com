import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AssessmentForm } from '@/components/forms/AssessmentForm'

export function FreeAssessmentSection() {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Not ready to book? Start with the free assessment.</h2>
        <p className="mt-3 text-warm-white/80">
          10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
        </p>

        <div className="mx-auto mt-8 aspect-[3/2] max-w-md rounded-xl border border-white/20 bg-white/5 blur-[1px]" role="img" aria-label="[SAMPLE REPORT PREVIEW — PARTIALLY BLURRED]">
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-warm-white/70">
            [SAMPLE REPORT PREVIEW — PARTIALLY BLURRED]
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mt-8 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
            >
              Take the Free Assessment
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
    </section>
  )
}
