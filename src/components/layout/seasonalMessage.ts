export function getSeasonalMessage(date: Date = new Date()): string {
  const month = date.getMonth() + 1

  if (month >= 1 && month <= 3) {
    return 'Board exams done? Book your stream selection session before results.'
  }
  if (month >= 4 && month <= 6) {
    return 'Results are out. Admission deadlines approaching — book now.'
  }
  if (month >= 7 && month <= 9) {
    return 'Late admissions still open. Talk to a counsellor today.'
  }
  return 'Planning for next year? Early birds get better college options.'
}
