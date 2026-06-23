'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface EpisodeSelectorProps {
  numberOfSeasons: number
  onPlay: (season: number, episode: number) => void
}

export default function EpisodeSelector({ numberOfSeasons, onPlay }: EpisodeSelectorProps) {
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)

  
  const episodes = Array.from({ length: 24 }, (_, i) => i + 1)
  const seasons = Array.from({ length: numberOfSeasons }, (_, i) => i + 1)

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-5 tv:p-8">
      <h3 className="text-white font-medium text-sm tv:text-tv-base mb-4">
        Select Episode
      </h3>

      <div className="flex flex-wrap gap-4 mb-5">
        {/* season selector */}
        <div className="relative">
          <select
            value={season}
            onChange={e => { setSeason(Number(e.target.value)); setEpisode(1) }}
            className="appearance-none bg-brand-dark border border-brand-border text-white text-sm tv:text-tv-sm rounded-lg px-4 py-2.5 tv:px-6 tv:py-3 pr-8 focus:outline-none focus:border-brand-orange cursor-pointer"
          >
            {seasons.map(s => (
              <option key={s} value={s}>Season {s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* episode grid */}
      <div className="flex flex-wrap gap-2 tv:gap-3 max-h-48 tv:max-h-64 overflow-y-auto no-scrollbar">
        {episodes.map(ep => (
          <button
            key={ep}
            onClick={() => { setEpisode(ep); onPlay(season, ep) }}
            className={`w-10 h-10 tv:w-14 tv:h-14 tv:text-tv-sm rounded-lg text-sm font-medium transition-colors tv-focusable ${
              episode === ep
                ? 'bg-brand-orange text-white'
                : 'bg-brand-dark border border-brand-border text-gray-400 hover:border-brand-orange hover:text-white'
            }`}
          >
            {ep}
          </button>
        ))}
      </div>
    </div>
  )
}