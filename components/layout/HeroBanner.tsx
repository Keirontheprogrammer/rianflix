'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Play, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { TMDBMedia } from '@/types/tmdb'
import { IMG, getTitle, getYear, formatRating } from '@/lib/tmdb'

interface HeroBannerProps {
  items: TMDBMedia[]
}

export default function HeroBanner({ items }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const router = useRouter()

  //  6 items for the banner rotation
  const featured = items.slice(0, 6)
  const item = featured[current]

  // auto-rotate  7 seconds
  const next = useCallback(() => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % featured.length)
      setAnimating(false)
    }, 300)
  }, [animating, featured.length])

  const prev = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(prev => (prev - 1 + featured.length) % featured.length)
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  const type = item.media_type ?? 'movie'
  const title = getTitle(item)
  const year = getYear(item)

  return (
    <div className="relative w-full h-[56vw] min-h-[320px] max-h-[680px] tv:max-h-[860px] overflow-hidden">
      

      <div className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={IMG.backdrop(item.backdrop_path)}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

      {/* content */}
      <div className={`absolute bottom-12 tv:bottom-20 left-4 md:left-8 tv:left-16 max-w-lg tv:max-w-2xl transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {/* media type badge */}
        <div className={`inline-block text-white text-xs tv:text-tv-sm font-medium px-3 py-1 rounded-full mb-3 ${
          type === 'tv' ? 'bg-cyan-700' : 'bg-brand-orange'
        }`}>
          {type === 'tv' ? 'Series' : 'Movie'}
        </div>

       
        <h1 className="text-3xl md:text-4xl tv:text-tv-2xl font-bold text-white mb-3 leading-tight">
          {title}
        </h1>

       
        <div className="flex items-center gap-3 mb-4 text-sm tv:text-tv-sm text-gray-300">
          <div className="flex items-center gap-1 text-brand-yellow">
            <Star size={14} fill="currentColor" />
            <span className="font-medium">{formatRating(item.vote_average)}</span>
          </div>
          <span className="text-gray-600">•</span>
          <span>{year}</span>
          {item.original_language && (
            <>
              <span className="text-gray-600">•</span>
              <span className="uppercase text-xs">{item.original_language}</span>
            </>
          )}
        </div>

       
        {item.overview && (
          <p className="text-gray-300 text-sm tv:text-tv-sm leading-relaxed mb-6 line-clamp-3 max-w-md tv:max-w-xl">
            {item.overview}
          </p>
        )}

        {/* action buttons */}
        <div className="flex items-center gap-3 tv:gap-5">
          <button
            onClick={() => router.push(`/title/${item.id}?type=${type}`)}
            className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-medium px-5 py-2.5 tv:px-8 tv:py-4 tv:text-tv-base rounded-lg transition-colors tv-focusable"
          >
            <Play size={18} fill="currentColor" className="tv:w-6 tv:h-6" />
            Watch Trailer
          </button>
          <button
            onClick={() => router.push(`/title/${item.id}?type=${type}`)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium px-5 py-2.5 tv:px-8 tv:py-4 tv:text-tv-base rounded-lg border border-white/20 transition-colors tv-focusable"
          >
            <Plus size={18} className="tv:w-6 tv:h-6" />
            More Info
          </button>
        </div>
      </div>

      {/* prev/next arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 tv:p-4 rounded-full transition-colors tv-focusable"
        aria-label="Previous"
      >
        <ChevronLeft size={20} className="tv:w-8 tv:h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 tv:p-4 rounded-full transition-colors tv-focusable"
        aria-label="Next"
      >
        <ChevronRight size={20} className="tv:w-8 tv:h-8" />
      </button>

     
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full tv-focusable ${
              i === current
                ? 'w-6 h-2 bg-brand-yellow'
                : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}