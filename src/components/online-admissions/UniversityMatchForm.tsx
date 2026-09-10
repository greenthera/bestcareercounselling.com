import { useId, useState, type FormEvent } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isValidIndianPhone, buildWhatsAppUrl } from '@/lib/whatsapp'

const COURSE_OPTIONS = ['Online MBA', 'Online MCA', 'Online BBA', 'Online BCA', 'Online B.Com', 'Not sure yet']
const QUALIFICATION_OPTIONS = ['12th pass', 'Graduate', 'Post Graduate', 'Other']
const PERCENTAGE_OPTIONS = ['Below 50%', '50–60%', '60–70%', '70% and above']
const BUDGET_OPTIONS = ['Under ₹1 Lakh', '₹1–2 Lakh', '₹2–3 Lakh', 'Flexible']
const GOAL_OPTIONS = [
  'Career growth',
  'Salary growth',
  'Career switch',
  'Promotion',
  'Higher education',
  'Business / Entrepreneurship',
]

interface Errors {
  name?: string
  phone?: string
}

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}

const selectClass =
  'w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green'
const inputClass =
  'w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green'

export function UniversityMatchForm({ className }: { className?: string }) {
  const formId = useId()
  const [course, setCourse] = useState('')
  const [qualification, setQualification] = useState('')
  const [percentage, setPercentage] = useState('')
  const [budget, setBudget] = useState('')
  const [goal, setGoal] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!name.trim()) nextErrors.name = 'Name is required.'
    if (!phone.trim()) nextErrors.phone = 'WhatsApp number is required.'
    else if (!isValidIndianPhone(phone)) nextErrors.phone = 'Enter a valid 10-digit number.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const detail = (label: string, value: string) => (value ? `${label}: ${value}\n` : '')
    const message =
      `Hi, I would like help choosing the right online university.\n\n` +
      detail('Course', course) +
      detail('Qualification', qualification) +
      detail('Academic %', percentage) +
      detail('Budget', budget) +
      detail('Goal', goal) +
      `\nName: ${name}\nWhatsApp: ${phone}\n` +
      detail('Email', email.trim()) +
      `\nPlease help me compare my options.`

    window.open(buildWhatsAppUrl(message.trim()), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <p className="text-lg font-bold text-ink">Find your best-fit university</p>
      <p className="mt-1 text-sm text-muted-ink">
        Answer a few questions and a counsellor will help you shortlist the most suitable options.
      </p>

      <div className="mt-4 grid gap-3">
        <Field id={`${formId}-course`} label="Which course are you looking for?">
          <select id={`${formId}-course`} value={course} onChange={(e) => setCourse(e.target.value)} className={selectClass}>
            <option value="">Select course</option>
            {COURSE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field id={`${formId}-qualification`} label="Highest qualification">
            <select
              id={`${formId}-qualification`}
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className={selectClass}
            >
              <option value="">Select</option>
              {QUALIFICATION_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <Field id={`${formId}-percentage`} label="Academic percentage">
            <select
              id={`${formId}-percentage`}
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className={selectClass}
            >
              <option value="">Select</option>
              {PERCENTAGE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field id={`${formId}-budget`} label="Approximate budget">
            <select id={`${formId}-budget`} value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
              <option value="">Select budget</option>
              {BUDGET_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <Field id={`${formId}-goal`} label="Primary goal">
            <select id={`${formId}-goal`} value={goal} onChange={(e) => setGoal(e.target.value)} className={selectClass}>
              <option value="">Select goal</option>
              {GOAL_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-1 border-t border-neutral-border pt-3">
          <Field id={`${formId}-name`} label="Full name">
            <input
              id={`${formId}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </Field>
        </div>

        <Field id={`${formId}-phone`} label="WhatsApp number">
          <input
            id={`${formId}-phone`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="numeric"
            placeholder="10-digit mobile number"
            className={inputClass}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </Field>

        <Field id={`${formId}-email`} label="Email address">
          <input
            id={`${formId}-email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Button type="submit" className="mt-4 h-auto w-full bg-brand-yellow py-2.5 text-ink hover:bg-brand-yellow/90">
        Submit enquiry
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-ink">
        <Lock className="h-3 w-3" aria-hidden="true" />
        Your information is used only for admission counselling.
      </p>
    </form>
  )
}
