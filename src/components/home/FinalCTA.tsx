import { ConsultationForm } from '@/components/forms/ConsultationForm'

export function FinalCTA() {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Let's talk about your child's future</h2>
        <p className="mt-3 text-warm-white/80">
          A 15-minute call costs nothing and usually clears up more than months of guessing.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left">
          <ConsultationForm context="home" />
        </div>
      </div>
    </section>
  )
}
