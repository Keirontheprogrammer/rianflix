import {
  TMDBResponse,
  TMDBMovieDetails,
  TMDBTVDetails,
  TMDBGenre,
} from '@/types/tmdb'


const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!


export const IMG = {
  poster: (path: string | null) =>
    path
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w500${path}`
      : '/placeholder-poster.jpg',
  backdrop: (path: string | null) =>
    path
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/original${path}`
      : '/placeholder-backdrop.jpg',
  profile: (path: string | null) =>
    path
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w185${path}`
      : '/placeholder-profile.jpg',
}


async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  // build query string from params object
  const query = new URLSearchParams(params).toString()
  const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ''}`

  const res = await fetch(url, {
    headers: {
      
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText} — ${url}`)
  }

  return res.json() as Promise<T>
}



export async function getMovieGenres(): Promise<TMDBGenre[]> {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>('/genre/movie/list')
  return data.genres
}

export async function getTVGenres(): Promise<TMDBGenre[]> {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>('/genre/tv/list')
  return data.genres
}


export function mapGenreIds(ids: number[], genres: TMDBGenre[]): string[] {
  return ids
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean) as string[]
}


// trending 
export async function getTrending(
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'week'
): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>(`/trending/${mediaType}/${timeWindow}`)
}

//movies

export async function getPopularMovies(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/movie/popular', { page: String(page) })
}

export async function getTopRatedMovies(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/movie/top_rated', { page: String(page) })
}

export async function getNowPlayingMovies(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/movie/now_playing', { page: String(page) })
}

export async function getUpcomingMovies(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/movie/upcoming', { page: String(page) })
}

export async function getMovieDetails(id: number): Promise<TMDBMovieDetails> {
  // append_to_response to fetch videos and credits in one request
  // instead of three separate API calls
  return tmdbFetch<TMDBMovieDetails>(`/movie/${id}`, {
    append_to_response: 'videos,credits,similar',
  })
}

export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/discover/movie', {
    with_genres: String(genreId),
    sort_by: 'popularity.desc',
    page: String(page),
  })
}

// TV series

export async function getPopularTV(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/tv/popular', { page: String(page) })
}

export async function getTopRatedTV(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/tv/top_rated', { page: String(page) })
}

export async function getOnAirTV(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/tv/on_the_air', { page: String(page) })
}

export async function getTVDetails(id: number): Promise<TMDBTVDetails> {
  return tmdbFetch<TMDBTVDetails>(`/tv/${id}`, {
    append_to_response: 'videos,credits,similar',
  })
}

export async function getTVByGenre(genreId: number, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/discover/tv', {
    with_genres: String(genreId),
    sort_by: 'popularity.desc',
    page: String(page),
  })
}

// anime

export async function getPopularAnime(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/discover/tv', {
    with_genres: '16',             
    with_original_language: 'ja', 
    sort_by: 'popularity.desc',
    page: String(page),
  })
}

export async function getTopRatedAnime(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/discover/tv', {
    with_genres: '16',
    with_original_language: 'ja',
    sort_by: 'vote_average.desc',
    'vote_count.gte': '200',       
    page: String(page),
  })
}

export async function getOnAirAnime(page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/discover/tv', {
    with_genres: '16',
    with_original_language: 'ja',
    sort_by: 'popularity.desc',
    with_status: '0',              
    page: String(page),
  })
}

// search

// multi-search hits movies, TV, and people in one call
export async function searchMulti(query: string, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/search/multi', {
    query,
    page: String(page),
    include_adult: 'false', 
  })
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/search/movie', {
    query,
    page: String(page),
    include_adult: 'false',
  })
}

export async function searchTV(query: string, page = 1): Promise<TMDBResponse> {
  return tmdbFetch<TMDBResponse>('/search/tv', {
    query,
    page: String(page),
    include_adult: 'false',
  })
}


// get the display title where movies use "title", & TV shows use "name"
export function getTitle(media: { title?: string; name?: string }): string {
  return media.title ?? media.name ?? 'Unknown'
}


export function getYear(media: {
  release_date?: string
  first_air_date?: string
}): string {
  const date = media.release_date ?? media.first_air_date
  return date ? new Date(date).getFullYear().toString() : 'N/A'
}


export function formatRating(rating: number): string {
  return rating.toFixed(1)
}


export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}


export function getTrailer(videos: { results: { key: string; type: string; site: string; official: boolean }[] }) {
  const youtubeVideos = videos.results.filter(v => v.site === 'YouTube')

  return (
    youtubeVideos.find(v => v.type === 'Trailer' && v.official) ??
    youtubeVideos.find(v => v.type === 'Trailer') ??
    youtubeVideos.find(v => v.type === 'Teaser') ??
    youtubeVideos[0] ??
    null
  )
}