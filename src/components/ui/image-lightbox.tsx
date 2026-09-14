import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxImage {
  src: string
  alt: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

export function ImageLightbox({ images, index, onIndexChange }: ImageLightboxProps) {
  const open = index !== null
  const current = index !== null ? images[index] : null

  function showPrev() {
    if (index === null) return
    onIndexChange((index - 1 + images.length) % images.length)
  }

  function showNext() {
    if (index === null) return
    onIndexChange((index + 1) % images.length)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:p-10"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') showPrev()
            if (event.key === 'ArrowRight') showNext()
          }}
        >
          <DialogPrimitive.Title className="sr-only">{current?.alt ?? 'Photo'}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Use the arrow buttons to browse photos, or press Escape to close.
          </DialogPrimitive.Description>

          {current && (
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          )}

          <DialogPrimitive.Close className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-warm-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow">
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-warm-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-warm-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow sm:right-6"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Next photo</span>
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-warm-white sm:bottom-8">
                {index !== null ? index + 1 : 0} / {images.length}
              </span>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
