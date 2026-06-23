import {
  getTrending,
  getPopularMovies,
  getPopularTV,
  getPopularAnime,
  getTopRatedMovies,
  getTopRatedAnime,
} from '@/lib/tmdb'
import HeroBanner from '@/components/layout/HeroBanner'
import ContentRow from '@/components/layout/ContentRow'
import Navbar from '@/components/layout/Navbar'

// this is a Server Component — all data fetching happens on the server
// multiple fetches run in parallel with Promise.all for speed
export default async function HomePage() {
  const [
    trending,
    popularMovies,
    popularTV,
    popularAnime,
    topRatedMovies,
    topRatedAnime,
  ] = await Promise.all([
    getTrending('all', 'week'),
    getPopularMovies(),
    getPopularTV(),
    getPopularAnime(),
    getTopRatedMovies(),
    getTopRatedAnime(),
  ])

  return (
    <>
      <Navbar />
      {/* hero banner uses trending results */}
      <HeroBanner items={trending.results} />

      <div className="mt-6 tv:mt-10 pb-16">
        <ContentRow
          title="Trending This Week"
          items={trending.results}
          seeAllHref="/movies"
        />
        <ContentRow
          title="Popular Movies"
          items={popularMovies.results}
          mediaType="movie"
          seeAllHref="/movies"
        />
        <ContentRow
          title="Popular Series"
          items={popularTV.results}
          mediaType="tv"
          seeAllHref="/series"
        />
        <ContentRow
          title="Top Rated Anime"
          items={topRatedAnime.results}
          isAnime
          seeAllHref="/anime"
        />
        <ContentRow
          title="Popular Anime"
          items={popularAnime.results}
          isAnime
          seeAllHref="/anime"
        />
        <ContentRow
          title="Top Rated Movies"
          items={topRatedMovies.results}
          mediaType="movie"
          seeAllHref="/movies"
        />
      </div>
    </>
  )
}