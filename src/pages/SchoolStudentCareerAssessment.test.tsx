import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SchoolStudentCareerAssessment from './SchoolStudentCareerAssessment'
import { assessmentQuestions } from '@/data/SchoolStudentCareerAssessmentContent'

const downloadAssessmentPdf = vi.fn().mockResolvedValue(undefined)
vi.mock('@/lib/generateAssessmentPdf', () => ({
  downloadAssessmentPdf: (...args: unknown[]) => downloadAssessmentPdf(...args),
}))

const TOTAL_QUESTIONS = assessmentQuestions.reduce((total, category) => total + category.questions.length, 0)

function renderPage() {
  return render(
    <MemoryRouter>
      <SchoolStudentCareerAssessment />
    </MemoryRouter>,
  )
}

describe('SchoolStudentCareerAssessment page', () => {
  it('starts on an intro screen and sets the page title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /how clear is your career direction/i })).toBeInTheDocument()
    expect(document.title).toBe('Career Assessment for School Students | Best Career Counselling')
  })

  it('requires an answer before moving to the next question', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /start the assessment/i }))

    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/choose an answer/i)
  })

  it('walks through every question and shows a scored result', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /start the assessment/i }))

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      expect(screen.getByText(`Question ${i + 1} of ${TOTAL_QUESTIONS}`)).toBeInTheDocument()
      await user.click(screen.getByRole('radio', { name: /yes/i }))
      await user.click(screen.getByRole('button', { name: i === TOTAL_QUESTIONS - 1 ? /see my result/i : /next/i }))
    }

    expect(screen.getByRole('heading', { name: /here's where you stand/i })).toBeInTheDocument()
    expect(screen.getByText(String(TOTAL_QUESTIONS))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a free 15-minute consultation/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me'),
    )

    // Every category should get its own scored row, not a single combined total.
    for (const category of assessmentQuestions) {
      expect(screen.getByText(category.category)).toBeInTheDocument()
    }
    const questionCount = assessmentQuestions[0].questions.length
    expect(screen.getAllByText(`${questionCount}/${questionCount}`)).toHaveLength(assessmentQuestions.length)
  })

  it('downloads a PDF report with the answers and result', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /start the assessment/i }))

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      await user.click(screen.getByRole('radio', { name: /yes/i }))
      await user.click(screen.getByRole('button', { name: i === TOTAL_QUESTIONS - 1 ? /see my result/i : /next/i }))
    }

    await user.click(screen.getByRole('button', { name: /download pdf/i }))

    expect(downloadAssessmentPdf).toHaveBeenCalledTimes(1)
    const [payload] = downloadAssessmentPdf.mock.calls[0]
    expect(payload.categories).toBe(assessmentQuestions)
    expect(payload.totalQuestions).toBe(TOTAL_QUESTIONS)
    expect(payload.totalScore).toBe(TOTAL_QUESTIONS)
    expect(Object.keys(payload.answers)).toHaveLength(TOTAL_QUESTIONS)
    expect(payload.tier.level).toBeTruthy()
  })

  it('restarts back to the intro screen', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /start the assessment/i }))

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      await user.click(screen.getByRole('radio', { name: /no/i }))
      await user.click(screen.getByRole('button', { name: i === TOTAL_QUESTIONS - 1 ? /see my result/i : /next/i }))
    }

    await user.click(screen.getByRole('button', { name: /take it again/i }))
    expect(screen.getByRole('heading', { name: /how clear is your career direction/i })).toBeInTheDocument()
  })
})
