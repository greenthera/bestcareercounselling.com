import type { BlogAuthor } from '@/data/blogs'

const BIOS = {
  kishan: {
    name: 'Kishan Patel',
    role: 'Career Counsellor',
    credentials: '30+ years guiding students across Gujarat. Certified Career Analyst — Edumilestones.',
  },
  meeta: {
    name: 'Meeta Patel',
    role: 'Career Counsellor',
    credentials: 'Specialises in working with parents and students together, particularly around stream selection after Class 10.',
  },
} satisfies Record<BlogAuthor, { name: string; role: string; credentials: string }>

interface AuthorBioProps {
  author: BlogAuthor
}

export function AuthorBio({ author }: AuthorBioProps) {
  const bio = BIOS[author]

  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-[1.375rem] border border-neutral-border bg-green-tint p-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-warm-white"
          role="img"
          aria-label={bio.name}
        >
          {bio.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-brand-green">{bio.name}</p>
          <p className="text-sm text-muted-ink">{bio.role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink">{bio.credentials}</p>
    </div>
  )
}
