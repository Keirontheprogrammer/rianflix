'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Play, Bookmark, BookmarkCheck,
  Star, Calendar, Clock, Tv, Film
} from 'lucide-react'
import { TMDBMedia, TMDBCast, TMDBGenre } from '@/types/tmdb'
import { IMG } from '@/lib/tmdb'
import VideoPlayer from '@/components/ui/VideoPlayer'
import TrailerModal from '@/components/ui/TrailerModal'
import EpisodeSelector from '@/components/ui/EpisodeSelector'
import MediaCard from '@/components/cards/MediaCard'
import { createClient } from '@/lib/supabase/client'

interface TitleDetailClientProps {
  id: number
  mediaType: 'movie' | 'tv'
  isAnime: boolean
  title: string
  year: string
  overview: string
  backdropPath: string | null
  posterPath: string | null
  rating: string
  voteCount: number
  genres: TMDBGenre[]
  cast: TMDBCast[]
  similar: TMDBMedia[]
  trailerKey: string | null
  director?: string
  runtime?: string
  numberOfSeasons?: number
  tagline?: string
  status?: string
}

export default function TitleDetailClient({
  id, mediaType, isAnime, title, year, overview,
  backdropPath, posterPath, rating, voteCount,
  genres, cast, similar, trailerKey, director,
  runtime, numberOfSeasons, tagline, status,
}: TitleDetailClientProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [playerSeason, setPlayerSeason] = useState(1)
  const [playerEpisode, setPlayerEpisode] = useState(1)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [watchlistLoading, setWatchlistLoading] = useState(false)

  const supabase = createClient()

  async function toggleWatchlist() {
    setWatchlistLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    if (inWatchlist) {
      await supabase
        .from('watchlist')
        .delete()
        .match({ user_id: user.id, media_id: id, media_type: mediaType })
      setInWatchlist(false)
    } else {
      await supabase.from('watchlist').insert({
        user_id: user.id,
        media_id: id,
        media_type: mediaType,
        title,
        poster_path: posterPath,
      })
      setInWatchlist(true)
    }
    setWatchlistLoading(false)
  }

  function handleEpisodePlay(season: number, episode: number) {
    setPlayerSeason(season)
    setPlayerEpisode(episode)
    setShowPlayer(true)
  }

  const badgeColor = isAnime
    ? 'bg-purple-700'
    : mediaType === 'tv' ? 'bg-cyan-700' : 'bg-brand-orange'

  const badgeLabel = isAnime ? 'Anime' : mediaType === 'tv' ? 'Series' : 'Movie'

  return (
    <>
      {/* video player fullscreen */}
      {showPlayer && (
        <VideoPlayer
          tmdbId={id}
          mediaType={mediaType}
          season={playerSeason}
          episode={playerEpisode}
          title={title}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {/* trailer modal */}
      {showTrailer && trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}

      <div className="min-h-screen">
        {/* backdrop hero */}
        <div className="relative w-full h-[50vw] min-h-[280px] max-h-[560px] tv:max-h-[700px]">
          <Image
            src={IMG.backdrop(backdropPath)}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        </div>

        {/* main content — overlaps the backdrop */}
        <div className="relative px-4 md:px-8 tv:px-16 -mt-32 tv:-mt-48 pb-16">
          <div className="flex flex-col md:flex-row gap-8 tv:gap-12">

            {/* poster */}
            <div className="flex-shrink-0 w-40 md:w-52 tv:w-72 mx-auto md:mx-0">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border-2 border-brand-border shadow-2xl">
                <Image
                  src={IMG.poster(posterPath)}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 160px, (max-width: 1920px) 208px, 288px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              {/* badge */}
              <div className={`inline-block ${badgeColor} text-white text-xs tv:text-tv-sm font-medium px-3 py-1 rounded-full mb-3`}>
                {badgeLabel}
              </div>

              {/* title */}
              <h1 className="text-3xl md:text-4xl tv:text-tv-2xl font-bold text-white mb-2 leading-tight">
                {title}
              </h1>

              {/* tagline */}
              {tagline && (
                <p className="text-gray-500 text-sm tv:text-tv-sm italic mb-3">
                  "{tagline}"
                </p>
              )}

              {/* meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm tv:text-tv-sm text-gray-400">
                <div className="flex items-center gap-1 text-brand-yellow">
                  <Star size={14} fill="currentColor" />
                  <span className="font-medium text-white">{rating}</span>
                  <span className="text-gray-600 text-xs">({voteCount.toLocaleString()})</span>
                </div>
                <span className="text-gray-700">•</span>
                <div className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{year}</span>
                </div>
                {runtime && (
                  <>
                    <span className="text-gray-700">•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{runtime}</span>
                    </div>
                  </>
                )}
                {numberOfSeasons && (
                  <>
                    <span className="text-gray-700">•</span>
                    <div className="flex items-center gap-1">
                      <Tv size={13} />
                      <span>{numberOfSeasons} Season{numberOfSeasons > 1 ? 's' : ''}</span>
                    </div>
                  </>
                )}
                {status && (
                  <>
                    <span className="text-gray-700">•</span>
                    <span className={status === 'Released' || status === 'Ended' ? 'text-gray-400' : 'text-green-400'}>
                      {status}
                    </span>
                  </>
                )}
              </div>

              {/* genres */}
              <div className="flex flex-wrap gap-2 mb-5">
                {genres.map(g => (
                  <span
                    key={g.id}
                    className="text-xs tv:text-tv-sm px-3 py-1 rounded-full border border-brand-border text-gray-400"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              {/* overview */}
              <p className="text-gray-300 text-sm tv:text-tv-sm leading-relaxed mb-6 max-w-2xl">
                {overview}
              </p>

              {/* director */}
              {director && (
                <p className="text-sm tv:text-tv-sm text-gray-500 mb-6">
                  Directed by{' '}
                  <span className="text-white">{director}</span>
                </p>
              )}

              {/* action buttons */}
              <div className="flex flex-wrap gap-3 tv:gap-4 mb-8">
                {/* watch now */}
                {mediaType === 'movie' && (
                  <button
                    onClick={() => setShowPlayer(true)}
                    className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-medium px-6 py-3 tv:px-10 tv:py-4 tv:text-tv-base rounded-lg transition-colors tv-focusable"
                  >
                    <Play size={18} fill="currentColor" className="tv:w-6 tv:h-6" />
                    Watch Now
                  </button>
                )}

                {/* trailer */}
                {trailerKey && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 tv:px-10 tv:py-4 tv:text-tv-base rounded-lg border border-white/20 transition-colors tv-focusable"
                  >
                    <Film size={18} className="tv:w-6 tv:h-6" />
                    Trailer
                  </button>
                )}

                {/* watchlist */}
                <button
                  onClick={toggleWatchlist}
                  disabled={watchlistLoading}
                  className="flex items-center gap-2 bg-brand-card hover:bg-brand-border text-white font-medium px-6 py-3 tv:px-10 tv:py-4 tv:text-tv-base rounded-lg border border-brand-border transition-colors disabled:opacity-50 tv-focusable"
                >
                  {inWatchlist
                    ? <BookmarkCheck size={18} className="text-brand-yellow tv:w-6 tv:h-6" />
                    : <Bookmark size={18} className="tv:w-6 tv:h-6" />
                  }
                  {inWatchlist ? 'Saved' : 'Watchlist'}
                </button>
              </div>

              {/* episode selector for TV/anime */}
              {mediaType === 'tv' && numberOfSeasons && (
                <EpisodeSelector
                  numberOfSeasons={numberOfSeasons}
                  onPlay={handleEpisodePlay}
                />
              )}
            </div>
          </div>

          {/* cast row */}
          {cast.length > 0 && (
            <div className="mt-12 tv:mt-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 tv:h-7 bg-brand-orange rounded-full" />
                <h2 className="text-white font-medium text-lg tv:text-tv-lg">Cast</h2>
              </div>
              <div className="flex gap-4 tv:gap-6 overflow-x-auto no-scrollbar pb-2">
                {cast.map(member => (
                  <div key={member.id} className="flex-shrink-0 w-20 tv:w-28 text-center">
                    <div className="relative w-16 h-16 tv:w-24 tv:h-24 mx-auto rounded-full overflow-hidden bg-brand-card border border-brand-border mb-2">
                      <Image
                        src={IMG.profile(member.profile_path)}
                        alt={member.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-white text-[11px] tv:text-tv-sm font-medium leading-tight truncate">
                      {member.name}
                    </p>
                    <p className="text-gray-600 text-[10px] tv:text-tv-sm truncate">
                      {member.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* similar titles */}
          {similar.length > 0 && (
            <div className="mt-12 tv:mt-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 tv:h-7 bg-brand-orange rounded-full" />
                <h2 className="text-white font-medium text-lg tv:text-tv-lg">
                  More Like This
                </h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 tv:grid-cols-8 gap-3 tv:gap-5">
                {similar.map(item => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    mediaType={mediaType}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}