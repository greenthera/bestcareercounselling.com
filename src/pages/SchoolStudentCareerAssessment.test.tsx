import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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

async function completeQuiz(user: ReturnType<typeof userEvent.setup>, answer: 'yes' | 'no' = 'yes') {
  await user.click(screen.getByRole('button', { name: /start the assessment/i }))
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    await user.click(screen.getByRole('radio', { name: new RegExp(answer, 'i') }))
    await user.click(screen.getByRole('button', { name: i === TOTAL_QUESTIONS - 1 ? /see my result/i : /next/i }))
  }
}

async function fillLeadCapture(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
  await user.type(screen.getByLabelText(/parent name/i), 'Meera Shah')
  await user.selectOptions(screen.getByLabelText(/class/i), 'Class 9')
  await user.type(screen.getByLabelText(/mobile number/i), '9876543210')
  await user.click(screen.getByRole('button', { name: /see my result/i }))
}

describe('SchoolStudentCareerAssessment page', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(new Response())
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

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

  it('requires lead details before showing the result', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)

    await user.click(screen.getByRole('button', { name: /see my result/i }))
    expect(screen.getByText(/student's name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/parent's name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/select your class/i)).toBeInTheDocument()
    expect(screen.getByText(/mobile number is required/i)).toBeInTheDocument()
  })

  it('submits the lead details to the Google Form with the correct entry IDs', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/parent name/i), 'Meera Shah')
    await user.selectOptions(screen.getByLabelText(/class/i), 'Class 9')
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210')
    await user.type(screen.getByLabelText(/email address/i), 'meera@example.com')
    await user.click(screen.getByRole('button', { name: /see my result/i }))

    expect(await screen.findByRole('heading', { name: /here's where you stand/i })).toBeInTheDocument()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://docs.google.com/forms/d/e/1FAIpQLSdviDkn-2THnlcE3kt4rcx9ZdiGDMwqFlS1HIdFYXCeSIm6CQ/formResponse')
    expect(options).toMatchObject({ method: 'POST', mode: 'no-cors' })

    const body = options?.body as FormData
    expect(body.get('entry.1940346655')).toBe('Aarav Shah')
    expect(body.get('entry.1576762693')).toBe('Meera Shah')
    expect(body.get('entry.108097604')).toBe('Class 9')
    expect(body.get('entry.634323980')).toBe('9876543210')
    expect(body.get('entry.612697315')).toBe('meera@example.com')
  })

  it('shows a recoverable error if the lead submission fails', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not submit your details/i)
    expect(screen.getByRole('button', { name: /see my result/i })).toBeEnabled()
  })

  it('walks through every question and lead capture to show a scored result', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    expect(screen.getByRole('heading', { name: /here's where you stand/i })).toBeInTheDocument()
    expect(screen.getByText(String(TOTAL_QUESTIONS))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /free pre-consulting 15 minutes enquiry session/i })).toHaveAttribute(
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
    await completeQuiz(user)
    await fillLeadCapture(user)

    await user.click(screen.getByRole('button', { name: /download report/i }))

    expect(downloadAssessmentPdf).toHaveBeenCalledTimes(1)
    const [payload] = downloadAssessmentPdf.mock.calls[0]
    expect(payload.categories).toBe(assessmentQuestions)
    expect(payload.totalQuestions).toBe(TOTAL_QUESTIONS)
    expect(payload.totalScore).toBe(TOTAL_QUESTIONS)
    expect(Object.keys(payload.answers)).toHaveLength(TOTAL_QUESTIONS)
    expect(payload.tier.level).toBeTruthy()
  })

  it('shows a recoverable message if the report generator fails to load', async () => {
    downloadAssessmentPdf.mockRejectedValueOnce(new Error('Failed to fetch dynamically imported module'))
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    await user.click(screen.getByRole('button', { name: /download report/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/refresh the page and try again/i)
    expect(screen.getByRole('button', { name: /download report/i })).toBeEnabled()
  })

  it('restarts back to the intro screen', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user, 'no')
    await fillLeadCapture(user)

    await user.click(screen.getByRole('button', { name: /take it again/i }))
    expect(screen.getByRole('heading', { name: /how clear is your career direction/i })).toBeInTheDocument()
  })
})
