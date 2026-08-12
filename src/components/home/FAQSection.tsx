import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Reveal } from '@/components/ui/reveal'
import type { Faq } from '@/data/faqs'

interface FAQSectionProps {
  faqs: Faq[]
  heading?: string
}

export function FAQSection({ faqs, heading = 'Frequently asked questions' }: FAQSectionProps) {
  const headingWords = heading.split(' ')
  const lastWord = headingWords.pop()
  const headingLead = headingWords.join(' ')

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
          {headingLead && `${headingLead} `}
          <span className="text-brand-green">{lastWord}</span>
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <Accordion type="single" collapsible className="mt-9 grid gap-3.5 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="rounded-[1.375rem] border border-neutral-border bg-white px-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  )
}
