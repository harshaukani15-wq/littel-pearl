'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2, ShoppingBag } from 'lucide-react'
import { STORE_NAME } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/lib/store/useCartStore'
import { toast } from 'react-hot-toast'

export default function CartPage() {
  const [isClient, setIsClient] = useState(false)
  const cartItems = useCartStore(state => state.items)
  const subtotal = useCartStore(state => state.getTotalPrice())
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="min-h-[70vh]"></div>

  const handleUpdateQuantity = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change
    if (newQty < 1) return
    updateQuantity(id, newQty)
  }

  const handleRemove = (id: string) => {
    removeItem(id)
    toast.success('Item removed')
  }

  return (
    <div className="bg-background min-h-[70vh]">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6 md:py-16">
        <h1 className="font-display text-2xl md:text-headline-md text-on-surface mb-6 md:mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant/30 font-label text-label-caps text-on-surface-variant">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-outline-variant/30">
                {cartItems.map((item) => {
                  // @ts-ignore
                  const primaryImage = item.product.product_images?.find((img: any) => img.is_primary) || item.product.product_images?.[0] || item.product.images?.[0];
                  const imageUrl = primaryImage ? primaryImage.url : '/placeholder.jpg';
                  
                  const price = item.variant?.price_override ?? item.product.base_price;
                  const finalPrice = (item.product.compare_at_price && item.product.compare_at_price < price) 
                    ? item.product.compare_at_price 
                    : price;

                  return (
                    <div key={item.id} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">
                      <div className="col-span-6 flex gap-4 w-full">
                        <Link href={`/product/${item.product.slug}`} className="relative w-24 aspect-[4/5] bg-surface-variant rounded-md overflow-hidden shrink-0">
                          <Image src={imageUrl} alt={item.product.name} fill className="object-cover" />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link href={`/product/${item.product.slug}`} className="font-body text-body-md text-on-surface mb-1 hover:text-primary transition-colors">
                            {item.product.name}
                          </Link>
                          {item.variant && <p className="font-body text-body-sm text-on-surface-variant mb-2">{item.variant.name || item.variant.size}</p>}
                          <p className="font-body text-body-md text-primary md:hidden">{formatCurrency(finalPrice)}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 flex justify-between md:justify-center items-center w-full md:w-auto mt-4 md:mt-0">
                        <div className="flex items-center border border-outline-variant/50 rounded-md">
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)} className="px-3 py-1 text-on-surface-variant hover:bg-surface-variant transition-colors">-</button>
                          <span className="px-2 font-body text-body-md w-8 text-center">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)} className="px-3 py-1 text-on-surface-variant hover:bg-surface-variant transition-colors">+</button>
                        </div>
                        <button onClick={() => handleRemove(item.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors md:ml-4">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="col-span-3 text-right hidden md:block w-full">
                        <span className="font-body text-body-md text-primary font-medium">{formatCurrency(finalPrice * item.quantity)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-surface-container rounded-xl p-6 lg:p-8 sticky top-24">
                <h2 className="font-display text-headline-sm text-on-surface mb-6">Order Summary</h2>
                
                <div className="space-y-4 font-body text-body-md text-on-surface mb-6">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-outline-variant/30 font-medium">
                    <span>Total</span>
                    <span className="text-primary text-lg">{formatCurrency(subtotal)}</span>
                  </div>
                </div>
                
                {/* 
                <Button asChild size="lg" className="w-full mb-4 py-6 text-base shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                */}
                
                <div className="text-center font-body text-body-sm text-on-surface-variant">
                  <Link href="/shop" className="underline hover:text-primary transition-colors">Continue Shopping</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-xl border border-outline-variant/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface rounded-full mb-6 shadow-elevation-1">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-headline-sm text-on-surface mb-2">Your cart is empty</h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover our beautiful collection of baby wear and pearls.
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
