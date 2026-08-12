'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { STORE_NAME } from '@/lib/constants'
import { useWishlistStore } from '@/lib/store/useWishlistStore'
import { ProductCard } from '@/components/store/ProductCard'

export default function WishlistPage() {
  const [isClient, setIsClient] = useState(false)
  const wishlistItems = useWishlistStore(state => state.items)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="min-h-[70vh]"></div>

  return (
    <div className="bg-background min-h-[70vh]">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6 md:py-16">
        <div className="flex items-center gap-3 mb-6 md:mb-8 pb-4 border-b border-outline-variant/30">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
          <h1 className="font-display text-2xl md:text-headline-md text-on-surface">Your Wishlist</h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-xl border border-outline-variant/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface rounded-full mb-6 shadow-elevation-1">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-display text-headline-sm text-on-surface mb-2">Your wishlist is empty</h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
              Save your favorite items here to easily find them later.
            </p>
            <Button asChild size="lg" className="px-8 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
              <Link href="/shop">Explore {STORE_NAME}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
