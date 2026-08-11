export type WhatsAppContext =
  | 'home'
  | 'after-10th'
  | 'after-12th'
  | 'ug-pg-admission'
  | 'mba'
  | 'study-abroad'
  | 'career-change'
  | 'assessment'

export interface WhatsAppFields {
  name: string
  phone: string
  currentClass?: string
  email?: string
}

function line(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : ''
}

const templates: Record<WhatsAppContext, (f: WhatsAppFields) => string> = {
  home: (f) =>
    `Hi, I would like to book a free career counselling consultation.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I found you through the website.`,
  'after-10th': (f) =>
    `Hi, I am looking for career counselling after Class 10.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about stream selection and career options.`,
  'after-12th': (f) =>
    `Hi, I am looking for career guidance after Class 12.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about course and college selection.`,
  'ug-pg-admission': (f) =>
    `Hi, I would like to know more about UG/PG admission guidance.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like help with course and college selection.`,
  mba: (f) =>
    `Hi, I would like to know more about MBA and professional career guidance.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}`,
  'study-abroad': (f) =>
    `Hi, I am interested in study abroad counselling.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about countries, universities and the admission process.`,
  'career-change': (f) =>
    `Hi, I am looking for career change counselling.\n\n` +
    `Name: ${f.name}\nPhone: ${f.phone}\n\n` +
    `I would like to discuss my career options and possible transition.`,
  assessment: (f) =>
    `Hi, I would like to take the free assessment.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n${line('Email', f.email)}`,
}

export function buildContextualMessage(context: WhatsAppContext, fields: WhatsAppFields): string {
  return templates[context](fields).trim()
}
