'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useCartStore } from '@/lib/store/useCartStore'
import { useWishlistStore } from '@/lib/store/useWishlistStore'
import { toast } from 'react-hot-toast'

export default function ProductActions({ product }: { product: any }) {
  const [addingToCart, setAddingToCart] = useState(false)
  const addItemToCart = useCartStore(state => state.addItem)
  
  const wishlistItems = useWishlistStore(state => state.items)
  const addToWishlist = useWishlistStore(state => state.addItem)
  const removeFromWishlist = useWishlistStore(state => state.removeItem)
  const hasInWishlist = useWishlistStore(state => state.hasItem)
  
  // Need to handle hydration mismatch if using Zustand persist with initial rendering
  const [isClient, setIsClient] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddToCart = () => {
    setAddingToCart(true)
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      addItemToCart(product)
      toast.success('Added to cart')
      setAddingToCart(false)
    }, 400)
  }

  const handleToggleWishlist = () => {
    if (hasInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="flex gap-4 mb-10">
      <Button 
        size="lg" 
        className="flex-1 py-6 text-base"
        onClick={handleAddToCart}
        disabled={addingToCart}
      >
        {addingToCart ? 'Adding...' : 'Add to Cart'}
      </Button>
      <Button 
        size="lg" 
        variant="secondary" 
        className={`px-6 transition-colors ${isClient && hasInWishlist(product.id) ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100' : ''}`}
        onClick={handleToggleWishlist}
      >
        <Heart className={`w-5 h-5 ${isClient && hasInWishlist(product.id) ? 'fill-current' : ''}`} />
      </Button>
    </div>
  )
}
