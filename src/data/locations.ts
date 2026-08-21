export interface Location {
  city: string
  address: string
  landmark: string
  /** Plain address used for map geocoding, without landmark phrases that can pull the pin onto a nearby business. */
  mapQuery?: string
  /** Google Maps embed URL for our verified Business Profile listing, showing our own pin rather than a geocoded address. */
  mapEmbedUrl?: string
  /** Shareable Google Maps link to our verified Business Profile listing. */
  mapLink?: string
  timings: string
  phone: string
  hasMap: boolean
}

export const locations: Location[] = [
  {
    city: 'Surat',
    address:
      'LG-22, Nariman Point, City Light Rd, opp. Dharmraj Suzuki Showroom, near Ashok Panhouse, City Light Town, Athwa, Surat, Gujarat 395007',
    landmark: '',
    mapQuery: 'LG-22, Nariman Point, City Light Rd, City Light Town, Athwa, Surat, Gujarat 395007',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7441.331204393257!2d72.7939999!3d21.165702099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dfb1bc77627%3A0xd7f5d36d7431045c!2sBest%20Career%20Counselling!5e0!3m2!1sen!2sin!4v1787314919885!5m2!1sen!2sin',
    mapLink: 'https://maps.app.goo.gl/ND7zWHZV3Znj1FbNA',
    timings: 'Mon–Sat, 10:00 AM – 7:00 PM',
    phone: '+91 87581 75187',
    hasMap: true,
  },
  {
    city: 'Navsari',
    address: 'Station Road, Navsari, Gujarat 396445',
    landmark: 'Near Navsari Railway Station',
    timings: 'Tue & Thu, 11:00 AM – 5:00 PM',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Ankleshwar',
    address: 'GIDC Char Rasta, Ankleshwar, Gujarat 393002',
    landmark: 'Near Ankleshwar Bus Stand',
    timings: 'Wed & Sat, 11:00 AM – 5:00 PM',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Valsad',
    address: 'Tithal Road, Valsad, Gujarat 396001',
    landmark: 'Near Valsad Railway Station',
    timings: 'By appointment only',
    phone: '+91 87581 75187',
    hasMap: false,
  },
]
