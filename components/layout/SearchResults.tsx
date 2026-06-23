'use client'

import { useState } from 'react'
import { TMDBMedia } from '@/types/tmdb'
import MediaCard from '@/components/cards/MediaCard'

interface SearchResultsProps {
  results: TMDBMedia[]
}

// filter tabs
const FILTERS = ['All', 'Movies', 'Series'] as const
type Filter = typeof FILTERS[number]

export default function SearchResults({ results }: SearchResultsProps) {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = results.filter(item => {
    

    if (item.media_type === 'person' as string) return false
    if (filter === 'Movies') return item.media_type === 'movie'
    if (filter === 'Series') return item.media_type === 'tv'
    return true
  })

  if (results.length === 0) return null

  return (
    <div>
      {/* filter  */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 tv:px-6 tv:py-2.5 tv:text-tv-sm rounded-full text-sm border transition-colors tv-focusable ${
              filter === f
                ? 'bg-brand-yellow text-brand-dark font-medium border-transparent'
                : 'bg-transparent text-gray-400 border-brand-border hover:border-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

     
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 tv:grid-cols-8 gap-3 tv:gap-5">
          {filtered.map(item => (
            <MediaCard
              key={item.id}
              item={item}
              mediaType={item.media_type as 'movie' | 'tv'}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm py-12 text-center">
          No {filter.toLowerCase()} found for this search.
        </p>
      )}
    </div>
  )
}