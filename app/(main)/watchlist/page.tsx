import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import WatchlistClient from './WatchlistClient'

export const metadata = { title: 'My saved watchlist' }

export default async function WatchlistPage() {
    const supabase = await createClient()

    //the current user
    const { data: {user} } = await supabase.auth.getUser()

    // redirect 'em
    if (!user) redirect('/login')

    const { data: watchlist, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false })

    if (error){
        console.error('watchlist fetch error:', error)
    }

    return (
        <WatchlistClient
            items={watchlist ?? []}
            userEmail={user.email ?? ''} 
        />
    )
}