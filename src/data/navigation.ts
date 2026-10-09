export interface NavSubItem {
  to: string
  label: string
}

export interface NavItem {
  to: string
  label: string
  children?: NavSubItem[]
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  {
    to: '/admission-consulting',
    label: 'Admission Consulting',
    children: [
      { to: '/mba-admission-counselling', label: 'MBA Admission Counselling' },
      { to: '/ug-admission-counselling', label: 'UG Admission Counselling' },
    ],
  },
  { to: '/career-counselling', label: 'Career Counselling' },
  { to: '/contact-us', label: 'Contact Us' },
]
