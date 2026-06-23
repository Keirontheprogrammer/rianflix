import { getPopularTV, getTopRatedTV, getOnAirTV, getTVGenres } from '@/lib/tmdb'
import BrowsePage from '@/components/layout/BrowsePage'

export const metadata = { title: 'Series — RianFlix' }

export default async function SeriesPage() {
  const [popular, topRated, onAir, genres] = await Promise.all([
    getPopularTV(),
    getTopRatedTV(),
    getOnAirTV(),
    getTVGenres(),
  ])

  return (
    <BrowsePage
      heading="Series"
      color="cyan"
      sections={[
        { title: 'On Air Now', items: onAir.results,    mediaType: 'tv' },
        { title: 'Popular',    items: popular.results,  mediaType: 'tv' },
        { title: 'Top Rated',  items: topRated.results, mediaType: 'tv' },
      ]}
      genres={genres}
      mediaType="tv"
    />
  )
}