const WHATSAPP_NUMBER = '918758175187'

export function isValidIndianPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/^\+?91/, '').replace(/\D/g, '')
  return /^[6-9]\d{9}$/.test(digitsOnly)
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
