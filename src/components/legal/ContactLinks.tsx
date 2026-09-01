import { contactEmails } from '@/data/contact'

interface ContactLinksProps {
  lead: string
}

export function ContactLinks({ lead }: ContactLinksProps) {
  return (
    <>
      {lead}{' '}
      {contactEmails.map((email, index) => (
        <span key={email}>
          <a href={`mailto:${email}`} className="text-brand-green hover:underline">
            {email}
          </a>
          {index < contactEmails.length - 1 ? ', ' : ' '}
        </span>
      ))}
      or{' '}
      <a href="tel:+918758175187" className="text-brand-green hover:underline">
        +91 87581 75187
      </a>
      .
    </>
  )
}
