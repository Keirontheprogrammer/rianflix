'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface TrailerModalProps {
  videoKey: string    // YouTube video ID
  onClose: () => void
}

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
  // close on Escape key 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    // fullscreen illusion div you digg
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl tv:max-w-7xl mx-4 aspect-video"
        // stop click inside player from closing modal
        onClick={e => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-brand-yellow transition-colors tv-focusable"
          aria-label="Close trailer"
        >
          <X size={28} />
        </button>

        {/* YouTube embed */}
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      </div>
    </div>
  )
}