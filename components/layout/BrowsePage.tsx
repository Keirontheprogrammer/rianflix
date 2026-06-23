'use client'

import { useState } from 'react'
import { TMDBMedia, TMDBGenre } from '@/types/tmdb'
import ContentRow from '@/components/layout/ContentRow'
import MediaCard from '@/components/cards/MediaCard'
import AnimeCard from '@/components/cards/AnimeCard'

interface Section {
  title: string
  items: TMDBMedia[]
  mediaType?: 'movie' | 'tv'
  isAnime?: boolean
}

interface BrowsePageProps {
  heading: string
  color: 'orange' | 'cyan' | 'purple'
  sections: Section[]
  genres?: TMDBGenre[]
  mediaType?: 'movie' | 'tv'
  isAnime?: boolean
}


const colorMap = {
  orange: 'bg-brand-orange',
  cyan:   'bg-cyan-600',
  purple: 'bg-purple-700',
}

const textColorMap = {
  orange: 'text-brand-orange',
  cyan:   'text-cyan-400',
  purple: 'text-purple-400',
}

const borderColorMap = {
  orange: 'border-brand-orange',
  cyan:   'border-cyan-500',
  purple: 'border-purple-500',
}

export default function BrowsePage({
  heading,
  color,
  sections,
  genres,
  mediaType,
  isAnime = false,
}: BrowsePageProps) {
  const [activeGenre, setActiveGenre] = useState<number | null>(null)

  // filter by selected genre
  const filteredSections = sections.map(section => ({
    ...section,
    items: activeGenre
      ? section.items.filter(item => item.genre_ids.includes(activeGenre))
      : section.items,
  }))

  return (
    <div className="pb-16">
      

      <div className="px-4 md:px-8 tv:px-16 pt-6 pb-6 tv:pt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-1.5 h-8 tv:h-12 ${colorMap[color]} rounded-full`} />
          <h1 className={`text-3xl tv:text-tv-2xl font-bold ${textColorMap[color]}`}>
            {heading}
          </h1>
        </div>

        {/* tima genre pills */}
        {genres && genres.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            
            <button
              onClick={() => setActiveGenre(null)}
              className={`px-4 py-1.5 tv:px-6 tv:py-2.5 tv:text-tv-sm rounded-full text-sm border transition-colors tv-focusable ${
                activeGenre === null
                  ? `${colorMap[color]} text-white border-transparent`
                  : 'bg-transparent text-gray-400 border-brand-border hover:border-gray-500'
              }`}
            >
              All
            </button>

            {genres.map(genre => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id === activeGenre ? null : genre.id)}
                className={`px-4 py-1.5 tv:px-6 tv:py-2.5 tv:text-tv-sm rounded-full text-sm border transition-colors tv-focusable ${
                  activeGenre === genre.id
                    ? `${colorMap[color]} text-white border-transparent`
                    : 'bg-transparent text-gray-400 border-brand-border hover:border-gray-500'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>

     
      {activeGenre ? (
        <div className="px-4 md:px-8 tv:px-16">
          <p className={`text-sm tv:text-tv-sm mb-4 ${textColorMap[color]}`}>
            Filtered by: {genres?.find(g => g.id === activeGenre)?.name}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 tv:grid-cols-8 gap-3 tv:gap-5">
            {filteredSections.flatMap(s => s.items).map(item =>
              isAnime ? (
                <AnimeCard key={item.id} item={item} />
              ) : (
                <MediaCard key={item.id} item={item} mediaType={mediaType} />
              )
            )}
          </div>
          

          {filteredSections.flatMap(s => s.items).length === 0 && (
            <p className="text-gray-500 text-sm py-12 text-center">
              No results for this genre in the current page.
            </p>
          )}
        </div>
      ) : (
        // default view — rows per section
        filteredSections.map(section => (
          <ContentRow
            key={section.title}
            title={section.title}
            items={section.items}
            mediaType={section.mediaType}
            isAnime={section.isAnime || isAnime}
          />
        ))
      )}
    </div>
  )
}