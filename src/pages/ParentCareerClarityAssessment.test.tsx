import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ParentCareerClarityAssessment from './ParentCareerClarityAssessment'
import { parentAssessmentSections } from '@/data/ParentCareerClarityAssessmentContent'

const downloadParentAssessmentPdf = vi.fn().mockResolvedValue(undefined)
vi.mock('@/lib/generateAssessmentPdf', () => ({
  downloadParentAssessmentPdf: (...args: unknown[]) => downloadParentAssessmentPdf(...args),
}))

const TOTAL_QUESTIONS = parentAssessmentSections.reduce((total, section) => total + section.questions.length, 0)

function renderPage() {
  return render(
    <MemoryRouter>
      <ParentCareerClarityAssessment />
    </MemoryRouter>,
  )
}

async function completeQuiz(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /start the assessment/i }))
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const radios = screen.getAllByRole('radio')
    await user.click(radios[0])
    await user.click(
      screen.getByRole('button', { name: i === TOTAL_QUESTIONS - 1 ? /view my assessment result/i : /^next$/i }),
    )
  }
}

async function fillLeadCapture(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/parent name/i), 'Meera Shah')
  await user.type(screen.getByLabelText(/child name/i), 'Aarav Shah')
  await user.selectOptions(screen.getByLabelText(/child's class \/ grade/i), 'Class 9')
  await user.type(screen.getByLabelText(/mobile number/i), '9876543210')
  await user.click(screen.getByRole('button', { name: /view my assessment result/i }))
}

describe('ParentCareerClarityAssessment page', () => {
  let openSpy: ReturnType<typeof vi.spyOn>
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(new Response())
  })

  afterEach(() => {
    openSpy.mockRestore()
    fetchSpy.mockRestore()
  })

  it('starts on an intro screen and sets the page title', () => {
    renderPage()
    expect(screen.getByText(/parent career clarity assessment/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /how clear are you about your child's career direction/i }),
    ).toBeInTheDocument()
    expect(document.title).toBe('Parent Career Clarity Assessment | Best Career Counselling')
  })

  it('requires an answer before moving to the next question', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /start the assessment/i }))

    await user.click(screen.getByRole('button', { name: /^next$/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/choose an answer/i)
  })

  it('requires lead details before showing the result', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)

    await user.click(screen.getByRole('button', { name: /view my assessment result/i }))
    expect(screen.getByText(/parent name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/child's name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/select your child's class/i)).toBeInTheDocument()
    expect(screen.getByText(/mobile number is required/i)).toBeInTheDocument()
  })

  it('walks through the quiz and lead capture to show the result with a working Get in Touch link', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    expect(screen.getByRole('heading', { name: /let's understand where you currently stand/i })).toBeInTheDocument()
    expect(screen.getByText(/clarity-seeking/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your snapshot/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('submits the lead details to the Google Form with the correct entry IDs', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await user.type(screen.getByLabelText(/parent name/i), 'Meera Shah')
    await user.type(screen.getByLabelText(/child name/i), 'Aarav Shah')
    await user.selectOptions(screen.getByLabelText(/child's class \/ grade/i), 'Class 9')
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210')
    await user.type(screen.getByLabelText(/email address/i), 'meera@example.com')
    await user.click(screen.getByRole('button', { name: /view my assessment result/i }))

    expect(await screen.findByRole('heading', { name: /let's understand where you currently stand/i })).toBeInTheDocument()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://docs.google.com/forms/d/e/1FAIpQLSdTjBlQQkMcle2ZhKq59rPJ-tuHpXSYE8DAO0g8ahWHN_N5jg/formResponse')
    expect(options).toMatchObject({ method: 'POST', mode: 'no-cors' })

    const body = options?.body as FormData
    expect(body.get('entry.755426042')).toBe('Meera Shah')
    expect(body.get('entry.1783431080')).toBe('Aarav Shah')
    expect(body.get('entry.180962404')).toBe('Class 9')
    expect(body.get('entry.354449202')).toBe('9876543210')
    expect(body.get('entry.252864987')).toBe('meera@example.com')
  })

  it('shows a recoverable error if the lead submission fails', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not submit your details/i)
    expect(screen.getByRole('button', { name: /view my assessment result/i })).toBeEnabled()
  })

  it('downloads a PDF report with the lead details and answers', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    await user.click(screen.getByRole('button', { name: /download report/i }))

    expect(downloadParentAssessmentPdf).toHaveBeenCalledTimes(1)
    const [payload] = downloadParentAssessmentPdf.mock.calls[0]
    expect(payload.sections).toBe(parentAssessmentSections)
    expect(Object.keys(payload.answers)).toHaveLength(TOTAL_QUESTIONS)
    expect(payload.lead).toEqual({
      parentName: 'Meera Shah',
      childName: 'Aarav Shah',
      childClass: 'Class 9',
      mobile: '9876543210',
      email: undefined,
    })
  })

  it('shows a recoverable message if the report generator fails to load', async () => {
    downloadParentAssessmentPdf.mockRejectedValueOnce(new Error('Failed to fetch dynamically imported module'))
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    await user.click(screen.getByRole('button', { name: /download report/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/refresh the page and try again/i)
    expect(screen.getByRole('button', { name: /download report/i })).toBeEnabled()
  })

  it('submits the callback form via WhatsApp', async () => {
    const user = userEvent.setup()
    renderPage()
    await completeQuiz(user)
    await fillLeadCapture(user)

    await user.selectOptions(screen.getByLabelText(/what would you like help with/i), 'Stream Selection')
    await user.click(screen.getByRole('button', { name: /request a call back/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]
    expect(String(url)).toContain('https://wa.me/918758175187?text=')
    expect(decodeURIComponent(String(url))).toContain('Meera Shah')
    expect(screen.getByText(/we've opened whatsapp/i)).toBeInTheDocument()
  })
})
