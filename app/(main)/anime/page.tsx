import { getPopularAnime, getTopRatedAnime, getOnAirAnime } from '@/lib/tmdb'
import BrowsePage from '@/components/layout/BrowsePage'

export const metadata = { title: 'Anime — RianFlix' }

export default async function AnimePage() {
  const [popular, topRated, onAir] = await Promise.all([
    getPopularAnime(),
    getTopRatedAnime(),
    getOnAirAnime(),
  ])

  return (
    <BrowsePage
      heading="Anime"
      color="purple"
      sections={[
        { title: 'Currently Airing', items: onAir.results,    mediaType: 'tv', isAnime: true },
        { title: 'Popular',          items: popular.results,  mediaType: 'tv', isAnime: true },
        { title: 'Top Rated',        items: topRated.results, mediaType: 'tv', isAnime: true },
      ]}
      mediaType="tv"
      isAnime
    />
  )
}