import { ConsultationForm } from '@/components/forms/ConsultationForm'

export function SidebarBookingForm() {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:rounded-[1.375rem] lg:border lg:border-neutral-border lg:bg-white lg:p-6 lg:shadow-sm">
      <p className="font-semibold text-ink">Book your free session</p>
      <div className="mt-4">
        <ConsultationForm context="home" />
      </div>
    </aside>
  )
}
