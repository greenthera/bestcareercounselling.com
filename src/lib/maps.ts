export function buildGoogleMapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export function buildGoogleMapsEmbedUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}
