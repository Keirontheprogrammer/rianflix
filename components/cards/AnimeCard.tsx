'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { TMDBMedia } from '@/types/tmdb'
import { IMG, getTitle, getYear, formatRating } from '@/lib/tmdb'

export default function AnimeCard({ item }: { item: TMDBMedia }) {
  const title = getTitle(item)
  const year = getYear(item)

  return (
    <Link
      href={`/title/${item.id}?type=tv&category=anime`}
      className="group flex-shrink-0 w-[140px] md:w-[160px] tv:w-[220px] tv-focusable"
    >
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-brand-card border border-brand-border group-hover:border-brand-yellow transition-all duration-300 group-hover:scale-105">
        <Image
          src={IMG.poster(item.poster_path)}
          alt={title}
          fill
          sizes="(max-width: 768px) 140px, (max-width: 1920px) 160px, 220px"
          className="object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-1 text-brand-yellow font-medium">
            <Star size={16} fill="currentColor" />
            <span className="text-sm">{formatRating(item.vote_average)}</span>
          </div>
        </div>

        {/* anime badge */}
        <div className="absolute top-2 left-2 bg-purple-700 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          Anime
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <p className="text-white text-xs tv:text-tv-sm font-medium truncate group-hover:text-brand-yellow transition-colors">
          {title}
        </p>
        <p className="text-gray-500 text-[11px] tv:text-tv-sm mt-0.5">{year}</p>
      </div>
    </Link>
  )
}