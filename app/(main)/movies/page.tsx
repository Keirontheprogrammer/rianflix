import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies, getMovieGenres } from '@/lib/tmdb'
import BrowsePage from '@/components/layout/BrowsePage'

export const metadata = { title: 'Movies — RianFlix' }

export default async function MoviesPage() {
  const [popular, topRated, nowPlaying, upcoming, genres] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getMovieGenres(),
  ])

  return (
    <BrowsePage
      heading="Movies"
      color="orange"
      sections={[
        { title: 'Now Playing', items: nowPlaying.results, mediaType: 'movie' },
        { title: 'Popular',     items: popular.results,    mediaType: 'movie' },
        { title: 'Top Rated',   items: topRated.results,   mediaType: 'movie' },
        { title: 'Upcoming',    items: upcoming.results,   mediaType: 'movie' },
      ]}
      genres={genres}
      mediaType="movie"
    />
  )
}