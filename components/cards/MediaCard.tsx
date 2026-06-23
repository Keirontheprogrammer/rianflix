'use client'

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { TMDBMedia } from "@/types/tmdb"
import { IMG, getTitle, getYear, formatRating } from '@/lib/tmdb'

interface MediaCardProps { 
    item: TMDBMedia
    
    mediaType?: 'movie' | 'tv'  // passed explicitly for some endpoints w/no media type
}

export default function MediaCard({ item, mediaType }: MediaCardProps) {
    const type = mediaType ?? item.media_type ?? 'movie'
    const title = getTitle(item)
    const year = getYear(item)

    //diff. color for the cards
    const badge = {
        movie: { label: 'Movie', className: 'bg-brand-orange' },
        tv: { label: 'Series', className: 'bg-cyan-700' },    
    }[type] ?? {label: 'Movie', className: 'bg-brand-orange'}

    return (
        <Link 
            href={`/title/${item.id}?type=${type}`}
            className="group flex-shrink-0 w-[140px] md:w-[160px] tv:w-[220px] tv-focusable"
            >
                {/* poster container */}

                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-brand-card border border-brand-border group-hover:border-brand-yellow transition-all duration-300 group-hover:scale-105">
                    <Image
                        src={IMG.poster(item.poster_path)}
                        alt={title || "Poster"}
                        fill
                        sizes="(max-width: 768px) 140px, (max-width: 1920px) 160px, 220px"
                        className="object-cover"

                        loading="lazy"
                    >
                    </Image>
                    
                    {/* show rating on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-1 text-brand-yellow font-medium">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm">{formatRating(item.vote_average)}</span>

                        </div>
                    </div>

                    {/* media badge */}
                    <div className={`absolute top-2 left-2 ${badge.className} text-white text-[10px] font-medium px-2 py-0.5 rounded-full`}>
                        {badge.label}
                    </div>
                </div>

                <div className="mt-2 px-0.5">
                    <p className="text-white text-xs tv:text-tv-sm font-medium truncate group-hover:text-brand-yellow transition-colors">
                        {title}
                    </p>
                    <p className="text-gray-500 text-[11px] tv:text-tv-sm mt-0.5">
                        {year}
                    </p>

                </div>
        </Link>
    )

}