export interface VideoTestimonial {
  id: string
  name: string
  relationship: string
  city: string
  thumbnailAlt: string
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'testimonial-1',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Parent',
    city: 'Surat',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — PARENT, SURAT]',
  },
  {
    id: 'testimonial-2',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Parent',
    city: 'Navsari',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — PARENT, NAVSARI]',
  },
  {
    id: 'testimonial-3',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Student',
    city: 'Ankleshwar',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — STUDENT, ANKLESHWAR]',
  },
]

export interface WrittenTestimonial {
  id: string
  quote: string
  name: string
  relationship: string
  city: string
}

export const writtenTestimonials: WrittenTestimonial[] = [
  {
    id: 'written-testimonial-1',
    quote: 'We were stuck between Science and Commerce for months. One session with Kishan sir made it obvious.',
    name: 'Priya Shah',
    relationship: 'Parent',
    city: 'Surat',
  },
  {
    id: 'written-testimonial-2',
    quote: 'The report gave us a clear roadmap, not just a stream. Worth every rupee.',
    name: 'Rakesh Patel',
    relationship: 'Parent',
    city: 'Navsari',
  },
  {
    id: 'written-testimonial-3',
    quote: 'I finally understood why I kept losing interest in my old plan — and what actually fits me.',
    name: 'Ananya Desai',
    relationship: 'Student',
    city: 'Ankleshwar',
  },
  {
    id: 'written-testimonial-4',
    quote: "Meeta ma'am listened to my daughter first, then to me. That balance is rare.",
    name: 'Sunita Mehta',
    relationship: 'Parent',
    city: 'Vapi',
  },
]
