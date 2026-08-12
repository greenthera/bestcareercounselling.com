import { Reveal } from '@/components/ui/reveal'

export function UniversitiesSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Universities & Colleges</h2>
        <div className="mt-8 rounded-[1.375rem] border border-dashed border-neutral-border bg-soft-cream p-8 text-sm text-muted-ink">
          [CLIENT TO PROVIDE VERIFIED INSTITUTION LOGOS — only logos of institutions with confirmed permission are
          shown here]
        </div>
      </Reveal>
    </section>
  )
}
