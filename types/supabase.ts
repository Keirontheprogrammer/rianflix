

export interface Profile {
  id: string           
  email: string
  username: string | null
  avatar_url: string | null
  created_at: string
}

export interface WatchlistItem {
  id: number
  user_id: string       // foreign key for them profiles.ids you feel
  media_id: number      // TMDB movie or show ID
  media_type: 'movie' | 'tv'
  title: string         // no need to re-fetch from TMDB you digg
  poster_path: string | null
  added_at: string
}
