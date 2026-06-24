'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Bookmark, Play } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { IMG } from '@/lib/tmdb'
import { WatchlistItem } from '@/types/supabase'

interface WatchlistClientProps {
  items: WatchlistItem[]
  userEmail: string
}

export default function WatchlistClient({ items, userEmail }: WatchlistClientProps) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(items)
  const [removing, setRemoving] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all')
  const supabase = createClient()

  async function removeItem(item: WatchlistItem) {
    setRemoving(item.id)

    const { error } = await supabase
      .from('watchlist')
      .delete()
      .match({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        media_id: item.media_id,
        media_type: item.media_type,
      })

    if (!error) {
      // remove from local state instantly — no page reload needed
      setWatchlist(prev => prev.filter(w => w.id !== item.id))
    }

    setRemoving(null)
  }

  const filtered = watchlist.filter(item => {
    if (filter === 'all') return true
    return item.media_type === filter
  })

  const badgeColor = (type: string) =>
    type === 'tv' ? 'bg-cyan-700' : 'bg-brand-orange'

  const badgeLabel = (type: string) =>
    type === 'tv' ? 'Series' : 'Movie'

  return (
    <div className="px-4 md:px-8 tv:px-16 pt-6 pb-16">
      {/* header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-8 tv:h-12 bg-brand-orange rounded-full" />
        <h1 className="text-3xl tv:text-tv-2xl font-bold text-brand-orange">
          My Watchlist
        </h1>
      </div>
      <p className="text-gray-500 text-sm tv:text-tv-sm mb-6 ml-5">
        {userEmail}
      </p>

      {/* filter tabs */}
      <div className="flex gap-2 mb-8">
        {(['all', 'movie', 'tv'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 tv:px-6 tv:py-2.5 tv:text-tv-sm rounded-full text-sm border transition-colors tv-focusable capitalize ${
              filter === f
                ? 'bg-brand-orange text-white border-transparent'
                : 'bg-transparent text-gray-400 border-brand-border hover:border-gray-500'
            }`}
          >
            {f === 'all' ? 'All' : f === 'tv' ? 'Series' : 'Movies'}
          </button>
        ))}
      </div>

      {/* empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Bookmark size={48} className="text-brand-border mb-4" />
          <h2 className="text-white text-xl font-medium mb-2">
            {watchlist.length === 0 ? 'Your watchlist is empty' : 'No results for this filter'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {watchlist.length === 0
              ? 'Start adding movies and series you want to watch'
              : 'Try switching to a different filter'
            }
          </p>
          {watchlist.length === 0 && (
            <Link
              href="/"
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors tv-focusable"
            >
              Browse titles
            </Link>
          )}
        </div>
      )}

      {/* watchlist grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 tv:grid-cols-4 gap-4 tv:gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-brand-card border border-brand-border rounded-xl overflow-hidden flex gap-4 p-3 tv:p-4 group hover:border-brand-yellow transition-colors"
            >
              {/* poster */}
              <Link
                href={`/title/${item.media_id}?type=${item.media_type}`}
                className="flex-shrink-0"
              >
                <div className="relative w-16 tv:w-24 aspect-[2/3] rounded-lg overflow-hidden bg-brand-dark">
                  <Image
                    src={IMG.poster(item.poster_path)}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  {/* badge */}
                  <div className={`inline-block ${badgeColor(item.media_type)} text-white text-[10px] font-medium px-2 py-0.5 rounded-full mb-1.5`}>
                    {badgeLabel(item.media_type)}
                  </div>

                  {/* title */}
                  <Link href={`/title/${item.media_id}?type=${item.media_type}`}>
                    <h3 className="text-white text-sm tv:text-tv-sm font-medium leading-tight hover:text-brand-yellow transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  {/* date added */}
                  <p className="text-gray-600 text-[11px] tv:text-tv-sm mt-1">
                    Added {new Date(item.added_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* action buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/title/${item.media_id}?type=${item.media_type}`}
                    className="flex items-center gap-1.5 bg-brand-orange hover:bg-orange-600 text-white text-xs tv:text-tv-sm px-3 py-1.5 rounded-lg transition-colors tv-focusable"
                  >
                    <Play size={12} fill="currentColor" />
                    Watch
                  </Link>
                  <button
                    onClick={() => removeItem(item)}
                    disabled={removing === item.id}
                    className="flex items-center gap-1.5 bg-brand-dark hover:bg-red-500/20 border border-brand-border hover:border-red-500/50 text-gray-500 hover:text-red-400 text-xs tv:text-tv-sm px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 tv-focusable"
                    aria-label="Remove from watchlist"
                  >
                    {removing === item.id ? (
                      <div className="w-3 h-3 border border-gray-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}