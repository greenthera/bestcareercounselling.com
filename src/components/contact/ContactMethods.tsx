import { Reveal } from '@/components/ui/reveal'

export function ContactMethods() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Contact methods</h2>
        <div className="mt-6 space-y-2 text-lg">
          <p>
            <a href="tel:+918758175187" className="font-medium text-brand-green hover:underline">
              +91 87581 75187
            </a>
          </p>
          <p className="break-words">
            <a href="mailto:kishan@bestcareercounselling.com" className="font-medium text-brand-green hover:underline">
              kishan@bestcareercounselling.com
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
