import { notFound } from 'next/navigation'
import { getMovieDetails, getTVDetails, getTrailer, getTitle, getYear, formatRating, formatRuntime } from '@/lib/tmdb'
import { TMDBMovieDetails, TMDBTVDetails } from '@/types/tmdb'
import TitleDetailClient from './TitleDetailClient'

interface TitlePageProps {
  params: { id: string }
  searchParams: { type?: string; category?: string }
}

export default async function TitlePage({ params, searchParams }: TitlePageProps) {
  const id = Number(params.id)
  const mediaType = searchParams.type === 'tv' ? 'tv' : 'movie'
  const isAnime = searchParams.category === 'anime'

  if (isNaN(id)) notFound()

  let details: TMDBMovieDetails | TMDBTVDetails | null = null

  try {
    details = mediaType === 'tv'
      ? await getTVDetails(id)
      : await getMovieDetails(id)
  } catch {
    notFound()
  }

  if (!details) notFound()

  // Safe access with fallbacks
  const trailer = details.videos?.results
    ? getTrailer(details.videos)
    : null

  // Wrap helpers in try/catch or ensure they handle missing data
  const title = getTitle(details) ?? 'Untitled'
  const year = getYear(details) ?? 'Unknown'
  const rating = details.vote_average != null 
    ? formatRating(details.vote_average) 
    : 'N/A'

  const director = details.credits?.crew?.find(c => c.job === 'Director')?.name ?? undefined
  const cast = details.credits?.cast?.slice(0, 8) ?? []
  const similar = details.similar?.results?.slice(0, 12) ?? []
  const genres = details.genres ?? []

  const runtime = mediaType === 'movie' && 'runtime' in details && details.runtime
    ? formatRuntime(details.runtime)
    : undefined

  const numberOfSeasons = mediaType === 'tv' && 'number_of_seasons' in details
    ? details.number_of_seasons
    : undefined

  const tagline = 'tagline' in details ? details.tagline : undefined
  const status = 'status' in details ? details.status : undefined

  return (
    <TitleDetailClient
      id={id}
      mediaType={mediaType}
      isAnime={isAnime}
      title={title}
      year={year}
      overview={details.overview ?? ''}
      backdropPath={details.backdrop_path ?? null}
      posterPath={details.poster_path ?? null}
      rating={rating}
      voteCount={details.vote_count ?? 0}
      genres={genres}
      cast={cast}
      similar={similar}
      trailerKey={trailer?.key ?? null}
      director={director}
      runtime={runtime}
      numberOfSeasons={numberOfSeasons}
      tagline={tagline}
      status={status ?? 'Unknown'}
    />
  )
}