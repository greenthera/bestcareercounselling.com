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
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: true,
  },
  {
    city: 'Navsari',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Ankleshwar',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Valsad',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
]
