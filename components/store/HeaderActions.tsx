'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/lib/store/useCartStore'
import { useWishlistStore } from '@/lib/store/useWishlistStore'
import { useState, useEffect, useRef } from 'react'

export function HeaderActions() {
  const [isClient, setIsClient] = useState(false)
  
  const cartItemsCount = useCartStore(state => state.getTotalItems())
  const wishlistItemsCount = useWishlistStore(state => state.items.length)
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }
  
  return (
    <>
      {/* Mobile full-width search overlay */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-x-0 top-0 z-[80] bg-surface border-b border-outline-variant/30 px-4 py-3 flex items-center gap-2 shadow-elevation-1">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
            <Search className="h-5 w-5 text-on-surface-variant shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent text-on-surface text-base outline-none placeholder:text-on-surface-variant/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button
            onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}
            className="p-1 text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-4 md:gap-6 ml-auto text-primary">
        {/* Desktop inline search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-surface-variant text-on-surface border-none rounded-full py-1.5 px-4 text-sm outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setIsSearchOpen(false)}
            />
          </div>
          <button 
            type="button"
            className="hover:opacity-80 transition-all duration-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Mobile search trigger */}
        <button
          className="md:hidden hover:opacity-80 transition-all duration-300"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </button>

        <Link href="/account" className="hover:opacity-80 transition-all duration-300 hidden md:block">
          <User className="h-5 w-5" />
        </Link>
        <Link href="/wishlist" className="hover:opacity-80 transition-all duration-300 flex items-center relative">
          <Heart className="h-5 w-5" />
          {isClient && wishlistItemsCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {wishlistItemsCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="hover:opacity-80 transition-all duration-300 flex items-center relative">
          <ShoppingBag className="h-5 w-5" />
          {isClient && cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>
    </>
  )
}
