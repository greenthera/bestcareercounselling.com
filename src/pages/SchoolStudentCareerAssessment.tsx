import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, ArrowRight, MessageCircle, Download } from 'lucide-react'
import { assessmentQuestions } from '@/data/SchoolStudentCareerAssessmentContent'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

type Answer = 0 | 1
type Stage = 'intro' | 'quiz' | 'result'
type Tone = 'green' | 'yellow'

const allQuestions = assessmentQuestions.flatMap((category) =>
    category.questions.map((question) => ({
        ...question,
        category: category.category,
    })),
)

const TOTAL_QUESTIONS = allQuestions.length

interface Tier {
    level: string
    description: string
    tone: Tone
}

function getTier(score: number): Tier {
    if (score <= 5) {
        return {
            level: 'Might not be urgent',
            description:
                "You already have a reasonable sense of direction. A conversation could still help you sharpen your plan and confirm you're on the right track.",
            tone: 'green',
        }
    }
    if (score <= 10) {
        return {
            level: 'Worth exploring',
            description:
                'A few areas feel unclear. Talking them through with a counsellor could resolve specific questions and add useful perspective.',
            tone: 'green',
        }
    }
    if (score <= 15) {
        return {
            level: 'Highly recommended',
            description:
                'Several areas feel uncertain right now. Guided counselling can bring real clarity and a practical plan to move forward.',
            tone: 'yellow',
        }
    }
    return {
        level: 'Strongly recommended',
        description:
            "You're carrying a lot of uncertainty across the board, which is completely normal at this stage. One-on-one guidance can make a big difference.",
        tone: 'yellow',
    }
}

const RING_RADIUS = 54
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const TONE_STROKE: Record<Tone, string> = { green: '#014924', yellow: '#FFCC01' }

function ScoreRing({ score, total, tone }: { score: number; total: number; tone: Tone }) {
    const fraction = score / total
    const offset = RING_CIRCUMFERENCE * (1 - fraction)

    return (
        <div className="relative mx-auto h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="#E6E8E5" strokeWidth="10" />
                <circle
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    stroke={TONE_STROKE[tone]}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-ink">{score}</span>
                <span className="text-sm text-muted-ink">out of {total}</span>
            </div>
        </div>
    )
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

export default function SchoolStudentCareerAssessment() {
    usePageSeo(pageSeo.schoolStudentCareerAssessment)

    const [stage, setStage] = useState<Stage>('intro')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, Answer>>({})
    const [error, setError] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)

    const question = allQuestions[currentQuestion]

    const selectedAnswer = answers[question.id]
    const categoryIndex = assessmentQuestions.findIndex((c) => c.category === question.category)

    const totalScore = Object.values(answers).filter((value) => value === 1).length

    const tier = getTier(totalScore)

    const categoryScores = assessmentQuestions.map((category) => {
        const score = category.questions.filter((q) => answers[q.id] === 1).length
        return { category: category.category, score, total: category.questions.length }
    })

    function handleAnswer(value: Answer) {
        setAnswers((previous) => ({ ...previous, [question.id]: value }))
        setError('')
    }

    function handleNext() {
        if (selectedAnswer === undefined) {
            setError('Choose an answer to continue.')
            return
        }
        setError('')
        if (currentQuestion === TOTAL_QUESTIONS - 1) {
            setStage('result')
            return
        }
        setCurrentQuestion((previous) => previous + 1)
    }

    function handlePrevious() {
        setError('')
        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1)
        }
    }

    function handleRestart() {
        setAnswers({})
        setCurrentQuestion(0)
        setError('')
        setStage('intro')
    }

    async function handleDownloadPdf() {
        setIsDownloading(true)
        try {
            const { downloadAssessmentPdf } = await import('@/lib/generateAssessmentPdf')
            await downloadAssessmentPdf({
                categories: assessmentQuestions,
                answers,
                totalScore,
                totalQuestions: TOTAL_QUESTIONS,
                tier,
            })
        } finally {
            setIsDownloading(false)
        }
    }

    const whatsappUrl = buildWhatsAppUrl(
        `Hi, I just completed the Career Assessment on your website.\n\nMy score: ${totalScore}/${TOTAL_QUESTIONS} (${tier.level})\n\nI would like a free pre-consulting 15 minutes enquiry session.`,
    )

    return (
        <section className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
            {stage === 'intro' && (
                <Reveal className="flex flex-col items-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-tint text-brand-green">
                        <Compass className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <h1 className="mt-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
                        How clear is your career direction?
                    </h1>
                    <p className="mt-4 max-w-lg text-muted-ink">
                        20 quick yes-or-no questions across career awareness, academic fit, decision-making, exploration and
                        personal growth. Takes about 3 minutes, and there are no wrong answers.
                    </p>
                    <button
                        type="button"
                        onClick={() => setStage('quiz')}
                        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                        Start the assessment
                        <EndcapArrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                </Reveal>
            )}

            {stage === 'quiz' && (
                <div>
                    <div className="flex gap-1.5" role="list" aria-label="Progress through assessment categories">
                        {assessmentQuestions.map((category, index) => (
                            <div
                                key={category.category}
                                role="listitem"
                                aria-current={index === categoryIndex ? 'step' : undefined}
                                aria-label={category.category}
                                className={cn(
                                    'h-1.5 flex-1 rounded-full transition-colors duration-300',
                                    index < categoryIndex && 'bg-brand-green',
                                    index === categoryIndex && 'bg-brand-yellow',
                                    index > categoryIndex && 'bg-neutral-border',
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
                                {question.category}
                            </span>
                            <span className="text-sm text-muted-ink">
                                Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
                            </span>
                        </div>

                        <fieldset className="mt-6">
                            <legend className="text-xl font-semibold leading-8 text-ink sm:text-2xl">{question.question}</legend>

                            <div className="mt-6 space-y-3">
                                {(
                                    [
                                        { value: 1 as const, label: 'Yes', hint: 'This applies to me.' },
                                        { value: 0 as const, label: 'No', hint: 'This does not apply to me.' },
                                    ]
                                ).map((option) => (
                                    <label
                                        key={option.value}
                                        className={cn(
                                            'flex min-h-[3.5rem] cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-green has-[:focus-visible]:ring-offset-2',
                                            selectedAnswer === option.value
                                                ? 'border-brand-yellow bg-brand-yellow/10'
                                                : 'border-neutral-border hover:border-brand-yellow/50 hover:bg-warm-white',
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            checked={selectedAnswer === option.value}
                                            onChange={() => handleAnswer(option.value)}
                                            className="h-5 w-5 shrink-0 accent-brand-green"
                                        />
                                        <div>
                                            <p className="font-semibold text-ink">{option.label}</p>
                                            <p className="text-sm text-muted-ink">{option.hint}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        {error && (
                            <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                                {error}
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
                                {currentQuestion === TOTAL_QUESTIONS - 1 ? 'See my result' : 'Next'}
                                <EndcapArrow className="bg-brand-yellow text-ink" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {stage === 'result' && (
                <Reveal>
                    <div className="rounded-[2rem] border border-neutral-border bg-white p-6 shadow-sm sm:p-10">
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-ink">Your assessment is complete</p>
                            <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Here's where you stand</h1>

                            <div className="mt-8">
                                <ScoreRing score={totalScore} total={TOTAL_QUESTIONS} tone={tier.tone} />
                            </div>

                            <span className="mt-6 inline-flex rounded-full bg-green-tint px-4 py-2 text-sm font-semibold text-brand-green">
                                {tier.level}
                            </span>

                            <p className="mx-auto mt-5 max-w-md leading-7 text-muted-ink">{tier.description}</p>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-lg font-semibold text-ink">How you scored, by area</h2>
                            <div className="mt-4 space-y-4">
                                {categoryScores.map((category) => (
                                    <div key={category.category}>
                                        <div className="flex items-center justify-between gap-4 text-sm">
                                            <p className="font-medium text-ink">{category.category}</p>
                                            <p className="font-semibold text-muted-ink">
                                                {category.score}/{category.total}
                                            </p>
                                        </div>
                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-green-tint">
                                            <div
                                                className="h-full rounded-full bg-brand-yellow transition-all duration-500 motion-reduce:transition-none"
                                                style={{ width: `${(category.score / category.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-8 rounded-xl border border-neutral-border bg-warm-white p-4 text-sm leading-6 text-muted-ink">
                            This is a preliminary self-check, not a final recommendation. A counsellor can offer a much fuller
                            picture of your interests, strengths and options.
                        </p>

                        <div className="mt-8 space-y-3">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                            >
                                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                                Free pre-consulting 15 minutes enquiry session
                            </a>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleDownloadPdf}
                                    disabled={isDownloading}
                                    className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-green py-2.5 pl-2 pr-5 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                                >
                                    <PillCtaEndcap
                                        tone="yellow"
                                        icon={Download}
                                        className="transition-transform duration-300 group-hover:-translate-x-0.5"
                                    />
                                    {isDownloading ? 'Preparing report…' : 'Download Report'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRestart}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                                >
                                    Take it again
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm">
                            <Link
                                to="/"
                                className="inline-block py-1.5 font-medium text-brand-green underline-offset-4 hover:underline"
                            >
                                Back to homepage
                            </Link>
                        </p>
                    </div>
                </Reveal>
            )}
        </section>
    )
}
