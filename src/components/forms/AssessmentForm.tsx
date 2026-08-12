import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { isValidIndianPhone, buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'

const CLASS_OPTIONS = [
  'Class 9–10',
  'Class 11–12',
  'UG Student',
  'PG / MBA',
  'Working Professional',
  'Parent Enquiring',
]

interface Errors {
  name?: string
  phone?: string
  currentClass?: string
}

export function AssessmentForm() {
  const formId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}

    if (!name.trim()) nextErrors.name = 'Student name is required.'
    if (!phone.trim()) nextErrors.phone = 'Phone number is required.'
    else if (!isValidIndianPhone(phone)) nextErrors.phone = 'Enter a valid 10-digit phone number.'
    if (!currentClass) nextErrors.currentClass = 'Select the current class.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message = buildContextualMessage('assessment', {
      name,
      phone,
      currentClass,
      email: email.trim() || undefined,
    })
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-medium text-ink">
          Student Name
        </label>
        <input
          id={`${formId}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-phone`} className="mb-1 block text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id={`${formId}-phone`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="numeric"
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-class`} className="mb-1 block text-sm font-medium text-ink">
          Current Class
        </label>
        <select
          id={`${formId}-class`}
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        >
          <option value="">Select current class</option>
          {CLASS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.currentClass && <p className="mt-1 text-sm text-red-600">{errors.currentClass}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-medium text-ink">
          Email <span className="text-muted-ink font-normal">(optional)</span>
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
      </div>

      <Button type="submit" className="h-auto w-full py-2.5 bg-brand-yellow text-ink hover:bg-brand-yellow/90">
        Take the Free Assessment
      </Button>
    </form>
  )
}
