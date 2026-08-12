import { ConsultationForm } from '@/components/forms/ConsultationForm'

export function SidebarBookingForm() {
  return (
    <aside className="hidden md:sticky md:top-24 md:block md:h-fit md:rounded-xl md:border md:border-neutral-border md:bg-white md:p-6">
      <p className="font-semibold text-ink">Book your free session</p>
      <div className="mt-4">
        <ConsultationForm context="home" />
      </div>
    </aside>
  )
}
