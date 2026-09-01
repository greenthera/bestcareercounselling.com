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
    name: 'Nikhil Joshi',
    relationship: 'Parent',
    city: 'Surat',
    thumbnailAlt: 'Video testimonial from a parent in Surat',
  },
  {
    id: 'testimonial-2',
    name: 'Kavita Rao',
    relationship: 'Parent',
    city: 'Navsari',
    thumbnailAlt: 'Video testimonial from a parent in Navsari',
  },
  {
    id: 'testimonial-3',
    name: 'Meet Trivedi',
    relationship: 'Student',
    city: 'Ankleshwar',
    thumbnailAlt: 'Video testimonial from a student in Ankleshwar',
  },
]
