import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, ArrowRight, Phone, MessageCircle, CheckCircle2, Download } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import {
  parentAssessmentSections,
  parentAssessmentClassOptions,
  parentAssessmentHelpOptions,
  parentAssessmentSnapshot,
  parentAssessmentHelpsUnderstand,
  parentAssessmentWhyItMatters,
  parentAssessmentCompleteChecklist,
} from '@/data/ParentCareerClarityAssessmentContent'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { isValidIndianPhone, buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

type Stage = 'intro' | 'quiz' | 'leadCapture' | 'result'

const allQuestions = parentAssessmentSections.flatMap((section) =>
  section.questions.map((question) => ({ ...question, section: section.section })),
)

const TOTAL_QUESTIONS = allQuestions.length

interface LeadDetails {
  parentName: string
  childName: string
  childClass: string
  mobile: string
  email: string
}

interface LeadErrors {
  parentName?: string
  childName?: string
  childClass?: string
  mobile?: string
}

interface CallbackErrors {
  parentName?: string
  childName?: string
  childClass?: string
  mobile?: string
  reason?: string
}

function EndcapArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-warm-white', className)}
      aria-hidden="true"
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  )
}

export default function ParentCareerClarityAssessment() {
  usePageSeo(pageSeo.parentCareerClarityAssessment)

  const formId = useId()
  const [stage, setStage] = useState<Stage>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [quizError, setQuizError] = useState('')

  const [lead, setLead] = useState<LeadDetails>({ parentName: '', childName: '', childClass: '', mobile: '', email: '' })
  const [leadErrors, setLeadErrors] = useState<LeadErrors>({})

  const [reason, setReason] = useState('')
  const [callbackErrors, setCallbackErrors] = useState<CallbackErrors>({})
  const [callbackSent, setCallbackSent] = useState(false)

  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const question = allQuestions[currentQuestion]
  const selectedAnswer = answers[question.id]
  const sectionIndex = parentAssessmentSections.findIndex((s) => s.section === question.section)

  function handleAnswer(index: number) {
    setAnswers((previous) => ({ ...previous, [question.id]: index }))
    setQuizError('')
  }

  function handleNext() {
    if (selectedAnswer === undefined) {
      setQuizError('Choose an answer to continue.')
      return
    }
    setQuizError('')
    if (currentQuestion === TOTAL_QUESTIONS - 1) {
      setStage('leadCapture')
      return
    }
    setCurrentQuestion((previous) => previous + 1)
  }

  function handlePrevious() {
    setQuizError('')
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1)
    }
  }

  function handleLeadSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: LeadErrors = {}

    if (!lead.parentName.trim()) nextErrors.parentName = 'Parent name is required.'
    if (!lead.childName.trim()) nextErrors.childName = "Child's name is required."
    if (!lead.childClass) nextErrors.childClass = "Select your child's class."
    if (!lead.mobile.trim()) nextErrors.mobile = 'Mobile number is required.'
    else if (!isValidIndianPhone(lead.mobile)) nextErrors.mobile = 'Enter a valid 10-digit mobile number.'

    setLeadErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStage('result')
  }

  function buildGetInTouchUrl() {
    const message =
      `Hi, I completed the Parent Career Clarity Assessment for my child.\n\n` +
      `Parent Name: ${lead.parentName}\nChild Name: ${lead.childName}\nChild's Class: ${lead.childClass}\nPhone: ${lead.mobile}\n` +
      `${lead.email ? `Email: ${lead.email}\n` : ''}` +
      `\nI would like to know more about a complete career assessment for my child.`
    return buildWhatsAppUrl(message)
  }

  function handleCallbackSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: CallbackErrors = {}

    if (!lead.parentName.trim()) nextErrors.parentName = 'Parent name is required.'
    if (!lead.childName.trim()) nextErrors.childName = "Child's name is required."
    if (!lead.childClass) nextErrors.childClass = "Select your child's class."
    if (!lead.mobile.trim()) nextErrors.mobile = 'Mobile number is required.'
    else if (!isValidIndianPhone(lead.mobile)) nextErrors.mobile = 'Enter a valid 10-digit mobile number.'
    if (!reason) nextErrors.reason = 'Select what you would like help with.'

    setCallbackErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message =
      `Hi, I would like a call back regarding my child's career guidance.\n\n` +
      `Parent Name: ${lead.parentName}\nChild Name: ${lead.childName}\nChild's Class: ${lead.childClass}\nPhone: ${lead.mobile}\n` +
      `What I need help with: ${reason}`
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    setCallbackSent(true)
  }

  async function handleDownloadPdf() {
    setIsDownloading(true)
    setDownloadError('')
    try {
      const { downloadParentAssessmentPdf } = await import('@/lib/generateAssessmentPdf')
      await downloadParentAssessmentPdf({
        sections: parentAssessmentSections,
        answers,
        lead: {
          parentName: lead.parentName,
          childName: lead.childName,
          childClass: lead.childClass,
          mobile: lead.mobile,
          email: lead.email || undefined,
        },
      })
    } catch {
      setDownloadError('Could not prepare the report. Please refresh the page and try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section
      className={cn('mx-auto px-4 py-12 md:px-8 md:py-16', stage === 'result' ? 'max-w-4xl' : 'max-w-2xl')}
    >
      {stage === 'intro' && (
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-tint text-brand-green">
            <Compass className="h-8 w-8" aria-hidden="true" />
          </span>
          <span className="mt-6 inline-flex rounded-full bg-green-tint px-3.5 py-1.5 text-sm font-semibold text-brand-green">
            Parent Career Clarity Assessment
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            How clear are you about your child's career direction?
          </h1>
          <p className="mt-4 max-w-lg text-muted-ink">
            Choosing the right stream, course or career is an important decision. Marks are only one part of the picture —
            your child's interests, strengths, abilities, personality and motivations also play an important role.
          </p>
          <p className="mt-4 max-w-lg text-muted-ink">
            This short assessment will help you understand where you currently stand in your child's career-planning
            journey and whether there are areas that may need more attention.
          </p>
          <p className="mt-4 text-sm font-medium text-ink">Time required: 3–4 minutes</p>
          <p className="mt-1 text-sm text-muted-ink">Please answer honestly based on your current situation.</p>
          <button
            type="button"
            onClick={() => setStage('quiz')}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Start the Assessment
            <EndcapArrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      )}

      {stage === 'quiz' && (
        <div>
          <div className="flex gap-1.5" role="list" aria-label="Progress through assessment sections">
            {parentAssessmentSections.map((section, index) => (
              <div
                key={section.section}
                role="listitem"
                aria-current={index === sectionIndex ? 'step' : undefined}
                aria-label={section.section}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors duration-300',
                  index < sectionIndex && 'bg-brand-green',
                  index === sectionIndex && 'bg-brand-yellow',
                  index > sectionIndex && 'bg-neutral-border',
                )}
              />
            ))}
          </div>

          <div
            key={currentQuestion}
            className="mt-6 animate-in fade-in slide-in-from-right-3 rounded-[2rem] border border-neutral-border bg-white p-6 shadow-sm duration-300 motion-reduce:animate-none sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex rounded-full bg-green-tint px-3.5 py-1.5 text-sm font-semibold text-brand-green">
                {question.section}
              </span>
              <span className="text-sm text-muted-ink">
                Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
              </span>
            </div>

            <fieldset className="mt-6">
              <legend className="text-xl font-semibold leading-8 text-ink sm:text-2xl">{question.question}</legend>

              <div className="mt-6 space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={option}
                    className={cn(
                      'flex min-h-[3.5rem] cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-green has-[:focus-visible]:ring-offset-2',
                      selectedAnswer === index
                        ? 'border-brand-yellow bg-brand-yellow/10'
                        : 'border-neutral-border hover:border-brand-yellow/50 hover:bg-warm-white',
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selectedAnswer === index}
                      onChange={() => handleAnswer(index)}
                      className="h-5 w-5 shrink-0 accent-brand-green"
                    />
                    <p className="font-medium text-ink">{option}</p>
                  </label>
                ))}
              </div>
            </fieldset>

            {quizError && (
              <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                {quizError}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-green/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-3 rounded-full bg-brand-green py-2.5 pl-6 pr-2.5 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                {currentQuestion === TOTAL_QUESTIONS - 1 ? 'View My Assessment Result' : 'Next'}
                <EndcapArrow className="bg-brand-yellow text-ink" />
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'leadCapture' && (
        <Reveal>
          <div className="rounded-[2rem] border border-neutral-border bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-ink">Almost there!</h1>
            <p className="mt-2 text-muted-ink">To prepare your assessment snapshot, please share a few details.</p>

            <form onSubmit={handleLeadSubmit} noValidate className="mt-6">
              <div className="mb-4">
                <label htmlFor={`${formId}-parent-name`} className="mb-1 block text-sm font-medium text-ink">
                  Parent Name
                </label>
                <input
                  id={`${formId}-parent-name`}
                  value={lead.parentName}
                  onChange={(e) => setLead((previous) => ({ ...previous, parentName: e.target.value }))}
                  className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                />
                {leadErrors.parentName && <p className="mt-1 text-sm text-red-600">{leadErrors.parentName}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor={`${formId}-child-name`} className="mb-1 block text-sm font-medium text-ink">
                  Child Name
                </label>
                <input
                  id={`${formId}-child-name`}
                  value={lead.childName}
                  onChange={(e) => setLead((previous) => ({ ...previous, childName: e.target.value }))}
                  className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                />
                {leadErrors.childName && <p className="mt-1 text-sm text-red-600">{leadErrors.childName}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor={`${formId}-child-class`} className="mb-1 block text-sm font-medium text-ink">
                  Child's Class / Grade
                </label>
                <select
                  id={`${formId}-child-class`}
                  value={lead.childClass}
                  onChange={(e) => setLead((previous) => ({ ...previous, childClass: e.target.value }))}
                  className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                >
                  <option value="">Select class</option>
                  {parentAssessmentClassOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {leadErrors.childClass && <p className="mt-1 text-sm text-red-600">{leadErrors.childClass}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor={`${formId}-mobile`} className="mb-1 block text-sm font-medium text-ink">
                  Mobile Number
                </label>
                <input
                  id={`${formId}-mobile`}
                  value={lead.mobile}
                  onChange={(e) => setLead((previous) => ({ ...previous, mobile: e.target.value }))}
                  inputMode="numeric"
                  className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                />
                {leadErrors.mobile && <p className="mt-1 text-sm text-red-600">{leadErrors.mobile}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-medium text-ink">
                  Email Address <span className="font-normal text-muted-ink">(optional)</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  value={lead.email}
                  onChange={(e) => setLead((previous) => ({ ...previous, email: e.target.value }))}
                  className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                />
              </div>

              <Button type="submit" className="h-auto w-full py-2.5 bg-brand-yellow text-ink hover:bg-brand-yellow/90">
                View My Assessment Result
              </Button>
            </form>
          </div>
        </Reveal>
      )}

      {stage === 'result' && (
        <Reveal>
          <div className="rounded-[2rem] border border-neutral-border bg-white p-6 shadow-sm sm:p-10">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-ink">Your assessment is complete</p>
              <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Let's understand where you currently stand</h1>

              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-2 pr-5 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <PillCtaEndcap
                    tone="yellow"
                    icon={Download}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  {isDownloading ? 'Preparing report…' : 'Download Report'}
                </button>
                {downloadError && (
                  <p className="text-sm text-red-600" role="alert">
                    {downloadError}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-green-tint p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Your Current Stage</p>
              <p className="mt-1 text-2xl font-bold text-ink">Clarity-Seeking</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-ink">
                You are actively thinking about your child's future and are involved in the decision-making process.
                However, your responses suggest that some important pieces may still need to come together before you can
                make a truly confident career decision. You may have some understanding of your child's interests and
                abilities, but connecting these with the right career possibilities may require deeper evaluation.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">Your Snapshot</h2>
              <div className="mt-4 space-y-3">
                {parentAssessmentSnapshot.map((item) => (
                  <div key={item.title} className="rounded-xl border border-neutral-border bg-warm-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-ink">{item.title}</p>
                      <span className="inline-flex rounded-full bg-brand-yellow/20 px-3 py-1 text-xs font-semibold text-ink">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-ink">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-border bg-warm-white p-6">
              <h2 className="text-lg font-semibold text-ink">Important Insight</h2>
              <p className="mt-2 text-sm leading-6 text-muted-ink">
                Your child's career should not be chosen on the basis of marks or interest alone. A stronger career
                decision comes from understanding how different factors come together:
              </p>
              <p className="mt-4 text-center text-sm font-semibold text-brand-green sm:text-base">
                Interests → Personality → Abilities → Motivators → Career Possibilities
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-ink">
                Your child's complete profile can help explore these factors in greater depth.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">What a Complete Career Assessment Can Help You Understand</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {parentAssessmentHelpsUnderstand.map((item) => (
                  <div key={item.title} className="rounded-xl border border-neutral-border bg-white p-4">
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-ink">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-center text-lg font-semibold leading-8 text-ink">
              Your assessment gives you a snapshot.
              <br />A complete career assessment goes much deeper.
            </p>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">Why This Matters</h2>
              <p className="mt-2 text-sm text-muted-ink">Career decisions made with limited information can sometimes lead to:</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {parentAssessmentWhyItMatters.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-neutral-border bg-white px-3 py-2.5 text-ink"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-border bg-warm-white p-6 text-center">
              <h2 className="text-lg font-semibold text-ink">Key Question</h2>
              <p className="mt-4 text-sm text-muted-ink">The question is not just...</p>
              <p className="mt-2 text-lg font-semibold italic text-ink">"What career does my child want?"</p>
              <p className="mt-4 text-sm text-muted-ink">The more important question is:</p>
              <p className="mt-2 text-lg font-semibold italic text-brand-green">
                "Is that career actually the right fit for my child?"
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-ink">
                Understanding that requires looking beyond one subject, one mark sheet or one career preference.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-ink p-6 text-center text-warm-white sm:p-8">
              <h2 className="text-xl font-bold">Want to Understand Your Child's Complete Career Profile?</h2>
              <p className="mt-2 text-sm text-warm-white/80">Talk to a Career Counsellor.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-warm-white/80">
                Go beyond a basic snapshot and understand the factors that can influence your child's career direction. A
                complete assessment explores:
              </p>
              <ul className="mx-auto mt-5 grid max-w-md gap-2 text-left sm:grid-cols-2">
                {parentAssessmentCompleteChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium">Understand your child before deciding their future.</p>
              <a
                href={buildGetInTouchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-3 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                Get in Touch
                <PillCtaEndcap tone="dark" icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-10">
              <h2 className="text-center text-lg font-semibold text-ink">
                Have Questions About Your Child's Career Direction?
              </h2>
              <p className="mt-2 text-center text-sm text-muted-ink">
                Speak with our career counselling team and discuss your child's situation.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href="tel:+918758175187"
                  className="group flex flex-col items-center rounded-2xl border border-neutral-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">Call Us</p>
                  <p className="mt-1 text-sm text-brand-green">+91 87581 75187</p>
                </a>
                <a
                  href={buildWhatsAppUrl(
                    "Hi, I have a question about my child's career direction after completing the Parent Career Clarity Assessment.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-2xl border border-neutral-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">WhatsApp Us</p>
                  <p className="mt-1 text-sm text-brand-green">+91 87581 75187</p>
                </a>
              </div>

              <p className="mt-4 text-center text-sm text-muted-ink">
                Not sure what to ask? Simply send us your child's Class + Age + Area of Concern, and our team can guide you
                on the next step.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-border bg-warm-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink">Want Us to Call You?</h2>
              <p className="mt-2 text-sm text-muted-ink">
                Leave your details and our career counselling team will connect with you.
              </p>

              {callbackSent ? (
                <p className="mt-6 rounded-xl bg-green-tint p-4 text-sm font-medium text-brand-green">
                  Thanks! We've opened WhatsApp with your details — send the message and our team will reach out.
                </p>
              ) : (
                <form onSubmit={handleCallbackSubmit} noValidate className="mt-6">
                  <div className="mb-4">
                    <label htmlFor={`${formId}-cb-parent-name`} className="mb-1 block text-sm font-medium text-ink">
                      Parent Name
                    </label>
                    <input
                      id={`${formId}-cb-parent-name`}
                      value={lead.parentName}
                      onChange={(e) => setLead((previous) => ({ ...previous, parentName: e.target.value }))}
                      className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                    />
                    {callbackErrors.parentName && <p className="mt-1 text-sm text-red-600">{callbackErrors.parentName}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor={`${formId}-cb-child-name`} className="mb-1 block text-sm font-medium text-ink">
                      Child Name
                    </label>
                    <input
                      id={`${formId}-cb-child-name`}
                      value={lead.childName}
                      onChange={(e) => setLead((previous) => ({ ...previous, childName: e.target.value }))}
                      className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                    />
                    {callbackErrors.childName && <p className="mt-1 text-sm text-red-600">{callbackErrors.childName}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor={`${formId}-cb-child-class`} className="mb-1 block text-sm font-medium text-ink">
                      Child's Class
                    </label>
                    <select
                      id={`${formId}-cb-child-class`}
                      value={lead.childClass}
                      onChange={(e) => setLead((previous) => ({ ...previous, childClass: e.target.value }))}
                      className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select class</option>
                      {parentAssessmentClassOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {callbackErrors.childClass && <p className="mt-1 text-sm text-red-600">{callbackErrors.childClass}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor={`${formId}-cb-mobile`} className="mb-1 block text-sm font-medium text-ink">
                      Mobile Number
                    </label>
                    <input
                      id={`${formId}-cb-mobile`}
                      value={lead.mobile}
                      onChange={(e) => setLead((previous) => ({ ...previous, mobile: e.target.value }))}
                      inputMode="numeric"
                      className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                    />
                    {callbackErrors.mobile && <p className="mt-1 text-sm text-red-600">{callbackErrors.mobile}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`${formId}-reason`} className="mb-1 block text-sm font-medium text-ink">
                      What would you like help with?
                    </label>
                    <select
                      id={`${formId}-reason`}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select an option</option>
                      {parentAssessmentHelpOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {callbackErrors.reason && <p className="mt-1 text-sm text-red-600">{callbackErrors.reason}</p>}
                  </div>

                  <Button type="submit" className="h-auto w-full py-2.5 bg-brand-green text-warm-white hover:bg-brand-green/90">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Request a Call Back
                  </Button>
                </form>
              )}
            </div>

            <p className="mt-10 text-center text-sm">
              <Link to="/" className="inline-block py-1.5 font-medium text-brand-green underline-offset-4 hover:underline">
                Back to homepage
              </Link>
            </p>
          </div>
        </Reveal>
      )}
    </section>
  )
}
