import { Reveal } from '@/components/ui/reveal'

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export function LegalPageLayout({ title, lastUpdated, intro, sections }: LegalPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
      <Reveal>
        <h1 className="text-4xl font-bold text-ink md:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-ink">Last updated: {lastUpdated}</p>
        <p className="mt-6 text-muted-ink">{intro}</p>
        <p className="mt-4 rounded-xl border border-dashed border-neutral-border bg-soft-cream p-4 text-xs text-muted-ink">
          Sample policy content for demonstration purposes — to be reviewed and finalised by legal counsel before
          publishing.
        </p>
      </Reveal>

      <div className="mt-10 space-y-8">
        {sections.map((section, index) => (
          <Reveal key={section.heading} delay={index * 60}>
            <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-muted-ink">
                {paragraph}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
