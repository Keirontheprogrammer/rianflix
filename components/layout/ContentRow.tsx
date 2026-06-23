import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { TMDBMedia } from '@/types/tmdb'
import MediaCard from '@/components/cards/MediaCard'
import AnimeCard from '@/components/cards/AnimeCard'

interface ContentRowProps {
  title: string              
  items: TMDBMedia[]        
  mediaType?: 'movie' | 'tv'
  isAnime?: boolean          
  seeAllHref?: string        
}

export default function ContentRow({
  title,
  items,
  mediaType,
  isAnime = false,
  seeAllHref,
}: ContentRowProps) {
  return (
    <section className="mb-8 tv:mb-12">
      {/* row header */}
      <div className="flex items-center justify-between px-4 md:px-8 tv:px-16 mb-4">
        <div className="flex items-center gap-3">
          
          
          <div className="w-1 h-5 tv:h-7 bg-brand-orange rounded-full" />
          <h2 className="text-white font-medium text-base md:text-lg tv:text-tv-lg">
            {title}
          </h2>
        </div>

        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="flex items-center gap-1 text-brand-yellow text-xs tv:text-tv-sm hover:underline tv-focusable"
          >
            See all <ChevronRight size={14} />
          </Link>
        )}
      </div>

      {/* horizontally scrollable card row */}
      <div className="flex gap-3 tv:gap-5 overflow-x-auto no-scrollbar px-4 md:px-8 tv:px-16 pb-2">
        {items.map(item =>
          isAnime ? (
            <AnimeCard key={item.id} item={item} />
          ) : (
            <MediaCard key={item.id} item={item} mediaType={mediaType} />
          )
        )}
      </div>
    </section>
  )
}