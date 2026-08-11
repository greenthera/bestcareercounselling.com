import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const FAQS = [
  {
    question: 'How does career counselling work?',
    answer:
      'We start with a free consultation call, followed by a psychometric assessment covering aptitude, interest, personality and EQ, then a one-on-one session where we walk through your report and build a roadmap together.',
  },
  {
    question: 'Is the first consultation really free?',
    answer: 'Yes. The first consultation is completely free, with no obligation to continue.',
  },
  {
    question: 'My child is in Class 10 — is that too early?',
    answer:
      "Class 10 is actually the ideal time to start, since it's right before the stream-selection decision that shapes the next several years.",
  },
  {
    question: 'Do you do online sessions or only in person?',
    answer: 'We offer both online sessions and in-person sessions at our Surat, Navsari, Ankleshwar and Valsad locations.',
  },
  {
    question: 'How long does the whole process take?',
    answer: 'Most families complete the full process — consultation, assessment, session and roadmap — within a couple of weeks.',
  },
  {
    question: 'Is this just a psychometric test, or actual counselling?',
    answer: 'The assessment is one input. The core of our work is the one-on-one counselling session where we interpret the results together with you.',
  },
  {
    question: 'Should my child attend alone, or do parents come too?',
    answer: 'We generally recommend both — the assessment is for the student, but the counselling conversation works best with parents involved too.',
  },
  {
    question: 'Do you help with the actual college admission process?',
    answer: 'Yes. Beyond the roadmap, we help with course shortlisting, college shortlisting, applications and deadline tracking.',
  },
]

export function FAQSection() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Frequently asked questions</h2>

      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  )
}
