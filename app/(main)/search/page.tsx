import { searchMulti } from '@/lib/tmdb'
import SearchResults from '@/components/layout/SearchResults'

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? ''

  // don't fetch if its no query
  const results = query
    ? await searchMulti(query)
    : { results: [], total_results: 0, page: 1, total_pages: 0 }

  return (
    <div className="px-4 md:px-8 tv:px-16 pt-6 pb-16">
      {/* header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 tv:h-12 bg-brand-yellow rounded-full" />
        <h1 className="text-3xl tv:text-tv-2xl font-bold text-brand-yellow">
          Search
        </h1>
      </div>

      {query ? (
        <p className="text-gray-400 text-sm tv:text-tv-sm mb-6">
          {results.total_results} results for{' '}
          <span className="text-white font-medium">&quot;{query}&quot;</span>
        </p>
      ) : (
        <p className="text-gray-500 text-sm tv:text-tv-sm mb-6">
          Use the search bar above to find movies, series and anime.
        </p>
      )}

      <SearchResults results={results.results} />
    </div>
  )
}