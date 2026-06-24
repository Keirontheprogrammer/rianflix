'use client'

import { useState, useEffect } from 'react'
import { X, AlertTriangle, Play, Monitor, Home } from 'lucide-react'

import Link from 'next/link'

interface VideoPlayerProps {
  tmdbId: number
  mediaType: 'movie' | 'tv'
  season?: number
  episode?: number
  title: string
  onClose: () => void
}

const SOURCES = [

  { 
    name: 'Source 1', 
    getUrl: (id: number, type: string, s: number, e: number) =>
      type === 'movie' ? `https://vidsrc.me/embed/movie?tmdb=${id}` : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}`
  },
  { 
    name: 'Source 2', 
    getUrl: (id: number, type: string, s: number, e: number) =>
      type === 'movie' ? `https://www.2embed.cc/embed/${id}` : `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`
  },
]

export default function VideoPlayer({
  tmdbId,
  mediaType,
  season,
  episode,
  title,
  onClose,
}: VideoPlayerProps) {
  const [selectedSource, setSelectedSource] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  const s = season ?? 1
  const e = episode ?? 1

  const embedUrl = selectedSource !== null 
    ? SOURCES[selectedSource].getUrl(tmdbId, mediaType, s, e)
    : null


  // reset loaded state when switching sources
  useEffect(() => {
    setLoaded(false)
  }, [selectedSource])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-3 tv:px-8 tv:py-4 bg-black/80 border-b border-brand-border flex-shrink-0">
      <div className='flex items-center gap-4'>
        {/* HOME */}
        <Link href="/" 
        className="flex items-center gap-1.5 text-gray-400 hover:text-brand-yellow transition-colors text-sm tv-focusable"
        onClick={()=> { document.body.style.overflow = 'unset' }}
        >
          <Home size={16} className="tv:w-5 tv:h-5"/>
          <span className='hidden md:inline'>Home</span>
        </Link>

        <div className='w-px h-4 bg-brand-border'/>

         <div>
          <p className="text-white font-medium text-sm tv:text-tv-base">{title}</p>
          {mediaType === 'tv' && (
            <p className="text-gray-500 text-xs tv:text-tv-sm">
              Season {s} · Episode {e}
            </p>
          )}
        </div>

      </div>
       
        <div className="flex items-center gap-3">
          {selectedSource !== null && (
            <button
              onClick={() => setSelectedSource(null)}
              className="text-gray-400 hover:text-brand-yellow transition-colors text-sm hidden md:block"
            >
              Change Source
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors tv-focusable flex items-center gap-2 text-sm"
            aria-label="Close player"
          >
            <X size={20} className="tv:w-7 tv:h-7" />
            <span className="hidden md:inline">Close</span>
          </button>
        </div>
      </div>

      {/* player area */}
      <div className="flex-1 relative bg-black">
        {/* source selection screen */}
        {selectedSource === null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <Monitor size={48} className="text-brand-orange mx-auto mb-4" />
              <h2 className="text-white text-xl font-medium mb-2">Select a Source</h2>
              <p className="text-gray-500 text-sm">Choose a streaming source to start watching</p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-md px-4">
              {SOURCES.map((source, index) => (
                <button
                  key={source.name}
                  onClick={() => setSelectedSource(index)}
                  className="flex items-center gap-4 bg-brand-card border border-brand-border hover:border-brand-yellow rounded-xl p-4 transition-all hover:scale-[1.02] tv-focusable group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-sm group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm group-hover:text-brand-yellow transition-colors">
                      {source.name}
                    </p>
                    <p className="text-gray-500 text-xs">Click to load player</p>
                  </div>
                  <Play size={18} className="text-gray-500 ml-auto group-hover:text-brand-yellow transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* loading overlay */}
        {selectedSource !== null && !loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
            <div className="w-10 h-10 border-2 border-brand-border border-t-brand-orange rounded-full animate-spin" />
            <p className="text-gray-500 text-sm tv:text-tv-sm">
              Loading {SOURCES[selectedSource].name}...
            </p>
          </div>
        )}

        {/* iframe */}
        {selectedSource !== null && embedUrl && (
          <iframe
            key={selectedSource}
            src={embedUrl}
            title={title}
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className={`w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          
          />
        )}
      </div>

      {/* disclaimer bar */}
      <div className="flex items-center gap-2 px-4 py-2 tv:px-8 bg-black/80 border-t border-brand-border flex-shrink-0">
        <AlertTriangle size={12} className="text-brand-yellow flex-shrink-0" />
        <p className="text-gray-600 text-[11px] tv:text-tv-sm">
          Streams are provided by third-party sources. RianFlix does not host any content.
        </p>
      </div>
    </div>
  )
}