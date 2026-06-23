import { getTrending, getTitle, formatRating } from '@/lib/tmdb'

export default async function Home() {
  const trending = await getTrending('all', 'week')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-medium text-brand-yellow mb-6">
        TMDB Connection Test ✓
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trending.results.slice(0, 8).map(item => (
          <div key={item.id} className="bg-brand-card border border-brand-border rounded-lg p-4">
            <p className="text-white text-sm font-medium truncate">
              {getTitle(item)}
            </p>
            <p className="text-brand-yellow text-xs mt-1">
              ★ {formatRating(item.vote_average)}
            </p>
            <p className="text-gray-500 text-xs mt-1 capitalize">
              {item.media_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}