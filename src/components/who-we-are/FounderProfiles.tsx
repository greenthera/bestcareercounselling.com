import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import counsellingThree from '@/assets/CounsellingThree.webp'
import counsellingTwo from '@/assets/CounsellingTwo.webp'

export function FounderProfiles() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Kishan & Meeta</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="group h-full overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden" role="img" aria-label="Kishan Patel">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderVisual label="Kishan Patel" src={counsellingThree} />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xl font-bold text-brand-green">Kishan Patel</p>
                <p className="text-sm text-muted-ink">Career Counsellor</p>
                <p className="mt-2 text-sm text-ink">30+ years guiding students across Gujarat.</p>
                <p className="text-sm text-ink">Certified Career Analyst — Edumilestones.</p>
                <p className="mt-2 text-sm text-muted-ink">
                  Kishan began counselling students in Surat after years of watching bright kids pick streams for the
                  wrong reasons. Since then he's worked with thousands of families, combining structured aptitude
                  testing with the kind of plain-spoken advice he'd want for his own children.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="group h-full overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden" role="img" aria-label="Meeta Patel">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderVisual label="Meeta Patel" src={counsellingTwo} />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xl font-bold text-brand-green">Meeta Patel</p>
                <p className="text-sm text-muted-ink">Career Counsellor</p>
                <p className="mt-2 text-sm text-ink">
                  Specialises in working with parents and students together, particularly around stream selection
                  after Class 10.
                </p>
                <p className="text-sm text-ink">Certified with the Edumilestones psychometric framework.</p>
                <p className="mt-2 text-sm text-muted-ink">
                  Meeta joined the practice to focus on the conversations that get skipped — the ones between parents
                  and children who each have a different idea of what "the right choice" looks like. She helps both
                  sides get heard before a decision gets made.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
