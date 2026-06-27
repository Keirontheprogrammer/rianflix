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

  // fetch full details
  let details: TMDBMovieDetails | TMDBTVDetails

  try {
    details = mediaType === 'tv'
      ? await getTVDetails(id)
      : await getMovieDetails(id)
  } catch {
    notFound()
  }

  const trailer = getTrailer(details.videos)
  const title = getTitle(details)
  const year = getYear(details)
  const director = 'credits' in details
  ? details.credits?.crew?.find(c => c.job === 'Director')?.name
  : undefined

  // top 8 cast members
  const cast = details.credits?.cast?.slice(0, 8) ?? []

  // runtime string
  const runtime = mediaType === 'movie' && 'runtime' in details && details.runtime
    ? formatRuntime(details.runtime)
    : undefined

  
  const numberOfSeasons = mediaType === 'tv' && 'number_of_seasons' in details
    ? details.number_of_seasons
    : undefined

  return (
    <TitleDetailClient
      id={id}
      mediaType={mediaType}
      isAnime={isAnime}
      title={title}
      year={year}
      overview={details.overview}
      backdropPath={details.backdrop_path}
      posterPath={details.poster_path}
      rating={formatRating(details.vote_average)}
      voteCount={details.vote_count}
      genres={details.genres}
      cast={cast}
      similar={details.similar.results.slice(0, 12)}
      trailerKey={trailer?.key ?? null}
      director={director}
      runtime={runtime}
      numberOfSeasons={numberOfSeasons}
      tagline={'tagline' in details ? details.tagline : undefined}
      status={details.status}
    />
  )
}