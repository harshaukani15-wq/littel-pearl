import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { getStoreSettings } from '@/app/actions/settings'
import { STORE_NAME } from '@/lib/constants'
import { ShieldCheck, Truck, RefreshCw, BadgeCheck } from 'lucide-react'

// Revalidate every hour
export const revalidate = 3600

export default async function HomePage() {
  const supabase = await createClient()
  const settings = await getStoreSettings()

  // Fetch top-level categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, image_url')
    .eq('is_active', true)
    .is('parent_id', null)
    .order('sort_order', { ascending: true })
    .limit(4)

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(`
      id, name, slug, base_price, compare_at_price, is_featured,
      product_images (url, alt_text)
    `)
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(4)

  // Fetch new arrivals
  const { data: newArrivals } = await supabase
    .from('products')
    .select(`
      id, name, slug, base_price, compare_at_price,
      product_images (url, alt_text)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Split Hero */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 min-h-[70vh] md:h-[80vh] md:min-h-[600px]">
        <div className="relative bg-surface-container flex items-center justify-center p-6 md:p-16 z-10">
          <div className="flex-1 flex flex-col justify-center py-12 md:py-0 text-center md:text-left">
            <h1 className="font-display text-3xl md:text-display-lg text-primary mb-4 md:mb-6 text-balance max-w-xl mx-auto md:mx-0">
              {settings?.hero_title || 'Little Moments, Beautifully Adorned.'}
            </h1>
            <p className="font-body text-body-md md:text-body-lg text-on-surface-variant mb-8 md:mb-10 text-balance max-w-lg mx-auto md:mx-0">
              {settings?.hero_subtitle || 'Discover our exquisite collection of soft, natural fabrics and delicate pearls designed for your little ones.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/shop/baby">Shop Baby Wear</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/shop/jewellery">Shop Jewellery</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image 
            src="/hero.png" 
            alt="Beautifully styled lifestyle photograph of a sleeping infant with a delicate pearl bracelet" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-outline-variant/30 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <h3 className="font-label text-label-caps text-on-surface">Free Shipping</h3>
              <p className="text-body-sm text-on-surface-variant">On orders over ₹2000</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h3 className="font-label text-label-caps text-on-surface">Secure Payments</h3>
              <p className="text-body-sm text-on-surface-variant">100% safe transactions</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              <h3 className="font-label text-label-caps text-on-surface">Easy Returns</h3>
              <p className="text-body-sm text-on-surface-variant">7-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <BadgeCheck className="h-6 w-6 text-primary" />
              <h3 className="font-label text-label-caps text-on-surface">Authentic Products</h3>
              <p className="text-body-sm text-on-surface-variant">Premium quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      {categories && categories.length > 0 && (
        <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <h2 className="font-display text-headline-md text-center text-on-surface mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/shop/${category.slug}`} className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-surface-variant">
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <h3 className="font-display text-headline-sm text-white mb-2">{category.name}</h3>
                  <span className="font-label text-label-caps text-white border-b border-white pb-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 bg-surface-container-low px-margin-mobile md:px-margin-desktop w-full">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-display text-headline-md text-on-surface">Featured Collection</h2>
              <Link href="/shop" className="font-label text-label-caps text-primary border-b border-primary pb-1 hidden md:block">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
              {featuredProducts.map((product) => {
                // @ts-ignore
                const primaryImage = product.product_images?.[0]
                
                return (
                  <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-variant mb-4 border border-transparent transition-colors group-hover:border-tertiary">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt_text || product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                          No image
                        </div>
                      )}
                    </div>
                    <h3 className="font-body text-body-md text-on-surface truncate mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-body-md text-primary font-medium">₹{product.base_price}</span>
                      {product.compare_at_price && (
                        <span className="font-body text-body-sm text-on-surface-variant line-through">₹{product.compare_at_price}</span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline" className="w-full">
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="text-center mb-12">
            <span className="font-label text-label-caps text-on-surface-variant tracking-[0.2em] mb-2 block">JUST IN</span>
            <h2 className="font-display text-headline-md text-on-surface">New Arrivals</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
            {newArrivals.map((product) => {
              // @ts-ignore
              const primaryImage = product.product_images?.[0]
              
              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-variant mb-4 border border-transparent transition-colors group-hover:border-tertiary">
                    {primaryImage ? (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt_text || product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                        No image
                      </div>
                    )}
                  </div>
                  <h3 className="font-body text-body-md text-on-surface truncate mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-body-md text-primary font-medium">₹{product.base_price}</span>
                    {product.compare_at_price && (
                      <span className="font-body text-body-sm text-on-surface-variant line-through">₹{product.compare_at_price}</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
      
      {/* Fallback empty state if no products are in the DB yet */}
      {(!categories || categories.length === 0) && (!featuredProducts || featuredProducts.length === 0) && (
        <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center w-full">
          <h2 className="font-display text-headline-md text-on-surface mb-4">Welcome to {settings?.store_name || STORE_NAME}</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            {settings?.store_description || 'Our store is currently being prepared. Check back soon for our exclusive collection of baby clothing and pearl jewellery.'}
          </p>
        </section>
      )}
    </div>
  )
}
