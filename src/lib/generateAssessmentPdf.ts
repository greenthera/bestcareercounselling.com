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

// Company details for the report letterhead and footer. Mirrors src/data/contact.ts,
// src/data/locations.ts and src/lib/seo.ts.
const COMPANY = {
  name: 'Best Career Counselling',
  description: [
    '30 years of career counselling and one-on-one guidance to every family,',
    'trusted by 5,000+ students and backed by 900+ five-star reviews.',
  ],
  phone: '+91 87581 75187',
  phoneUrl: 'tel:+918758175187',
  email: 'careercounsellingsurat@gmail.com',
  emailUrl: 'mailto:careercounsellingsurat@gmail.com',
  website: 'bestcareercounselling.com',
  websiteUrl: 'https://bestcareercounselling.com',
  address: 'LG-22, Nariman Point, City Light Rd, City Light Town, Athwa, Surat, Gujarat 395007',
}

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

function drawUnderlinedLink(doc: jsPDF, text: string, x: number, y: number, url: string): number {
  doc.textWithLink(text, x, y, { url })
  const width = doc.getTextWidth(text)
  doc.setDrawColor(GREEN)
  doc.setLineWidth(0.25)
  doc.line(x, y + 0.8, x + width, y + 0.8)
  return width
}

function drawFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const y = pageHeight - 10

  doc.setDrawColor(BORDER)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y - 6, pageWidth - MARGIN, y - 6)

  doc.setFontSize(9)

  // Left — company name links to the website.
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(GREEN)
  drawUnderlinedLink(doc, COMPANY.name, MARGIN, y, COMPANY.websiteUrl)

  // Centre — page number.
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth / 2, y, { align: 'center' })

  // Right — "Developed by Shivantra", Shivantra links out.
  const prefix = 'Developed by '
  const linkText = 'Shivantra'
  doc.setFont('helvetica', 'normal')
  const prefixWidth = doc.getTextWidth(prefix)
  doc.setFont('helvetica', 'bold')
  const linkWidth = doc.getTextWidth(linkText)
  const startX = pageWidth - MARGIN - prefixWidth - linkWidth

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  doc.text(prefix, startX, y)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(GREEN)
  drawUnderlinedLink(doc, linkText, startX + prefixWidth, y, SHIVANTRA_URL)
}

export async function downloadAssessmentPdf(input: AssessmentPdfInput) {
  const { categories, answers, totalScore, totalQuestions, tier } = input
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const contentWidth = pageWidth - MARGIN * 2

  const logoDataUrl = await loadImageAsDataUrl(logoUrl)

  // Letterhead — logo plus full company contact details.
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', MARGIN, 10, 19, 22.2)
  }
  const infoX = MARGIN + (logoDataUrl ? 24 : 0)

  const infoWidth = pageWidth - MARGIN - infoX
  let hy = 14

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(INK)
  doc.text(COMPANY.name, infoX, hy)
  hy += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(MUTED)
  const descLines: string[] = COMPANY.description.flatMap((line) => doc.splitTextToSize(line, infoWidth))
  doc.text(descLines, infoX, hy)
  hy += descLines.length * 4 + 1.5

  doc.setTextColor(MUTED)
  doc.text(COMPANY.address, infoX, hy)
  hy += 4.5

  // Contact line — phone, email and website are clickable links.
  const gap = 5
  doc.setTextColor(GREEN)
  let cx = infoX
  cx += drawUnderlinedLink(doc, COMPANY.phone, cx, hy, COMPANY.phoneUrl) + gap
  cx += drawUnderlinedLink(doc, COMPANY.email, cx, hy, COMPANY.emailUrl) + gap
  drawUnderlinedLink(doc, COMPANY.website, cx, hy, COMPANY.websiteUrl)

  const dividerY = Math.max(hy + 4, 34)
  doc.setDrawColor(YELLOW)
  doc.setLineWidth(1)
  doc.line(MARGIN, dividerY, pageWidth - MARGIN, dividerY)

  // Report title
  const titleY = dividerY + 9
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(INK)
  doc.text('Career Assessment Report', MARGIN, titleY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(MUTED)
  doc.text('School Student Career Assessment', MARGIN, titleY + 5.5)

  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.text(dateStr, pageWidth - MARGIN, titleY, { align: 'right' })

  let y = titleY + 17

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
