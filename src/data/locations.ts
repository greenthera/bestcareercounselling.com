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
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
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
