'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Bookmark, LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<{ email: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // get current logged in user
  useEffect(() => {
    const supabaseClient = createClient()
    supabaseClient.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? '' })
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  // check if a nav link is active
  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/series', label: 'Series' },
    { href: '/anime', label: 'Anime' },
    { href: '/watchlist', label: 'Watchlist' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-sm border-b border-brand-border' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 md:px-8 tv:px-16 h-16 tv:h-20">

          {/* logo */}
          <Link href="/" className="text-2xl tv:text-tv-xl font-bold tracking-tight flex-shrink-0">
            <span className="text-brand-orange">Rian</span>
            <span className="text-brand-yellow">Flix</span>
          </Link>

          {/* desktop nav links */}
          <div className="hidden md:flex items-center gap-6 tv:gap-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tv:text-tv-sm transition-colors tv-focusable ${
                  isActive(link.href)
                    ? 'text-brand-yellow font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* right side actions */}
          <div className="flex items-center gap-3 tv:gap-5">
            {/* search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-brand-card border border-brand-border rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange w-40 md:w-56 tv:w-80 tv:text-tv-sm tv:py-3"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-400 hover:text-white transition-colors tv-focusable"
                aria-label="Open search"
              >
                <Search size={20} className="tv:w-7 tv:h-7" />
              </button>
            )}

            {/* watchlist icon */}
            <Link
              href="/watchlist"
              className="hidden md:block text-gray-400 hover:text-brand-yellow transition-colors tv-focusable"
              aria-label="Watchlist"
            >
              <Bookmark size={20} className="tv:w-7 tv:h-7" />
            </Link>

            {/* user avatar + logout */}
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 tv:w-12 tv:h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-yellow flex items-center justify-center text-brand-dark text-xs tv:text-tv-sm font-bold">
                  {user.email[0].toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-400 transition-colors tv-focusable"
                  aria-label="Sign out"
                >
                  <LogOut size={16} className="tv:w-6 tv:h-6" />
                </button>
              </div>
            )}

            {/* mobile menu toggle */}
            <button
              className="md:hidden text-gray-400 hover:text-white tv-focusable"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-dark/98 border-t border-brand-border px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive(link.href)
                    ? 'text-brand-yellow font-medium'
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="text-left text-sm text-red-400 py-2"
              >
                Sign out
              </button>
            )}
          </div>
        )}
      </nav>

   
      <div className="h-16 tv:h-20" />
    </>
  )
}