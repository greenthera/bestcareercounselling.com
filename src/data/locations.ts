export interface Location {
  city: string
  address: string
  landmark: string
  timings: string
  phone: string
  hasMap: boolean
}

export const locations: Location[] = [
  {
    city: 'Surat',
    address: 'Nariman Point, City Light Rd, City Light Town, Athwa, Surat, Gujarat 395007',
    landmark: 'Opp. Dharmraj Suzuki Showroom, near Ashok Panhouse',
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
