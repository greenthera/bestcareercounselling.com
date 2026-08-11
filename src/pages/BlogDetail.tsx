import { useParams } from 'react-router-dom'

export default function BlogDetail() {
  const { slug } = useParams()
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Blog Post: {slug}</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 3.</p>
    </div>
  )
}
