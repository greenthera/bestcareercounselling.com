import { ConsultationForm } from '@/components/forms/ConsultationForm'

export default function ContactUs() {
  return (
    <div className="mx-auto max-w-md px-4 py-24">
      <h1 className="text-center text-3xl font-bold text-brand-green">Book your free consultation</h1>
      <p className="mt-2 text-center text-muted-ink">15 minutes with Kishan or Meeta. No cost, no obligation.</p>
      <div className="mt-8 rounded-xl border border-neutral-border bg-white p-6">
        <ConsultationForm context="home" />
      </div>
    </div>
  )
}
