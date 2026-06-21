
export interface TMDBMedia {
  id: number
  title?: string            // movies use title
  name?: string             // TV shows and anime use name
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  release_date?: string     // movies
  first_air_date?: string   // TV shows
  genre_ids: number[]
  media_type?: 'movie' | 'tv'
  adult: boolean
  original_language: string
  popularity: number
}

export interface TMDBResponse {
  page: number
  results: TMDBMedia[]
  total_pages: number
  total_results: number
}

export interface TMDBVideo {
  id: string
  key: string        // YouTube video ID
  name: string
  site: string       // YouTube or 
  type: string       // Trailer, Teaser, Clip
  official: boolean
}

export interface TMDBCast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface TMDBCrew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBMovieDetails extends TMDBMedia {
  runtime: number
  tagline: string
  status: string
  budget: number
  revenue: number
  genres: TMDBGenre[]
  videos: { results: TMDBVideo[] }
  credits: { cast: TMDBCast[]; crew: TMDBCrew[] }
  similar: TMDBResponse
}

export interface TMDBTVDetails extends TMDBMedia {
  number_of_seasons: number
  number_of_episodes: number
  episode_run_time: number[]
  tagline: string
  status: string
  genres: TMDBGenre[]
  videos: { results: TMDBVideo[] }
  credits: { cast: TMDBCast[]; crew: TMDBCrew[] }
  similar: TMDBResponse
}