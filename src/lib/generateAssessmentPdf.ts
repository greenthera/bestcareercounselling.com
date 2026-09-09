import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoUrl from '@/assets/logo.png'

// Matches the site's own brand palette (see tailwind.config.js) — kept as plain hex
// here since jsPDF takes color strings directly, no Tailwind involved.
const INK = '#111513'
const MUTED = '#66706A'
const GREEN = '#014924'
const YELLOW = '#FFCC01'
const BORDER = '#E6E8E5'
const SOFT_CREAM = '#FFF9E6'

const SHIVANTRA_URL = 'https://shivantra.com/'
const MARGIN = 16

interface Question {
  id: number
  question: string
}

interface Category {
  category: string
  questions: Question[]
}

interface Tier {
  level: string
  description: string
}

export interface AssessmentPdfInput {
  categories: Category[]
  answers: Record<number, 0 | 1>
  totalScore: number
  totalQuestions: number
  tier: Tier
}

async function loadImageAsDataUrl(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Could not read logo image'))
      reader.readAsDataURL(blob)
    })
  } catch {
    // A missing logo shouldn't block the whole PDF from downloading.
    return undefined
  }
}

function drawFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const y = pageHeight - 10

  doc.setDrawColor(BORDER)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y - 6, pageWidth - MARGIN, y - 6)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(GREEN)
  doc.text('Best Career Counselling', MARGIN, y)
  const companyWidth = doc.getTextWidth('Best Career Counselling')

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  const separator = '  ·  Developed by '
  doc.text(separator, MARGIN + companyWidth, y)
  const separatorWidth = doc.getTextWidth(separator)

  const linkX = MARGIN + companyWidth + separatorWidth
  const linkText = 'Shivantra'
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(GREEN)
  doc.textWithLink(linkText, linkX, y, { url: SHIVANTRA_URL })
  const linkWidth = doc.getTextWidth(linkText)
  doc.setDrawColor(GREEN)
  doc.setLineWidth(0.25)
  doc.line(linkX, y + 0.8, linkX + linkWidth, y + 0.8)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - MARGIN, y, { align: 'right' })
}

export async function downloadAssessmentPdf(input: AssessmentPdfInput) {
  const { categories, answers, totalScore, totalQuestions, tier } = input
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const contentWidth = pageWidth - MARGIN * 2

  const logoDataUrl = await loadImageAsDataUrl(logoUrl)

  // Header — logo plus report title/date, design is otherwise ours to choose.
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', MARGIN, 10, 16, 18.6)
  }
  const titleX = MARGIN + (logoDataUrl ? 21 : 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.setTextColor(INK)
  doc.text('Career Assessment Report', titleX, 19)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(MUTED)
  doc.text('School Student Career Assessment', titleX, 26)
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.text(dateStr, pageWidth - MARGIN, 19, { align: 'right' })

  doc.setDrawColor(YELLOW)
  doc.setLineWidth(1)
  doc.line(MARGIN, 34, pageWidth - MARGIN, 34)

  let y = 46

  // Result summary
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(INK)
  doc.text(`Score: ${totalScore} / ${totalQuestions}`, MARGIN, y)

  doc.setFontSize(11)
  doc.setTextColor(GREEN)
  doc.text(tier.level, pageWidth - MARGIN, y, { align: 'right' })

  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(MUTED)
  const descriptionLines: string[] = doc.splitTextToSize(tier.description, contentWidth)
  doc.text(descriptionLines, MARGIN, y)
  y += descriptionLines.length * 5 + 8

  // Category breakdown
  const categoryScores = categories.map((category) => {
    const score = category.questions.filter((q) => answers[q.id] === 1).length
    return [category.category, `${score} / ${category.questions.length}`]
  })

  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Category', 'Score']],
    body: categoryScores,
    theme: 'plain',
    headStyles: { fillColor: GREEN, textColor: '#FFFFFF', fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { textColor: INK, fontSize: 10 },
    alternateRowStyles: { fillColor: SOFT_CREAM },
    styles: { cellPadding: 3, lineColor: BORDER, lineWidth: 0.2 },
  })

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // Full question-by-question answers, grouped by category
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(INK)
  doc.text('Your answers', MARGIN, y)
  y += 8

  for (const category of categories) {
    if (y > pageHeight - 40) {
      doc.addPage()
      y = 20
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12.5)
    doc.setTextColor(GREEN)
    doc.text(category.category, MARGIN, y)
    y += 9

    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      body: category.questions.map((q) => [
        q.question,
        answers[q.id] === 1 ? 'Yes' : answers[q.id] === 0 ? 'No' : 'Not answered',
      ]),
      theme: 'plain',
      columnStyles: {
        0: { cellWidth: contentWidth - 26 },
        1: { cellWidth: 26, halign: 'right', fontStyle: 'bold' },
      },
      bodyStyles: {
        textColor: INK,
        fontSize: 9.5,
        cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
        minCellHeight: 10,
        valign: 'middle',
      },
      alternateRowStyles: { fillColor: SOFT_CREAM },
      styles: { lineColor: BORDER, lineWidth: 0.2 },
    })

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 14
  }

  const totalPages = doc.getNumberOfPages()
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page)
    drawFooter(doc, page, totalPages)
  }

  doc.save('career-assessment-report.pdf')
}
