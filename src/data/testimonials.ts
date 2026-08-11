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
