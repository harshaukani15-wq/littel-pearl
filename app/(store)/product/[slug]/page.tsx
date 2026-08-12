import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Truck, ShieldCheck, RefreshCw, Star, ChevronRight } from 'lucide-react'
import ProductActions from './ProductActions'
import { formatCurrency } from '@/lib/utils'

export const revalidate = 60

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Fetch product with relations
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(id, url, alt_text, sort_order, is_primary),
      variants:product_variants(id, sku, name, size, color, material, price_override, stock_quantity, is_active)
    `)
    .eq('slug', resolvedParams.slug)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  // Sort images
  const images = [...(product.images || [])].sort((a, b) => {
    if (a.is_primary) return -1
    if (b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const primaryImage = images[0]
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.base_price

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-outline-variant/30 bg-surface/50">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-3 md:py-4 flex items-center text-xs md:text-sm font-label text-on-surface-variant overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 shrink-0" />
          <Link href="/shop" className="hover:text-primary transition-colors shrink-0">Shop</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 shrink-0" />
          {product.category && (
            <>
              {/* @ts-ignore */}
              <Link href={`/shop/${product.category.slug}`} className="hover:text-primary transition-colors shrink-0">{product.category.name}</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 shrink-0" />
            </>
          )}
          <span className="text-on-surface truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 md:gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden bg-surface-variant">
              {hasDiscount && (
                <Badge variant="sale" className="absolute top-3 left-3 md:top-4 md:left-4 z-10 text-xs md:text-sm px-2 md:px-3 py-1">Sale</Badge>
              )}
              {primaryImage ? (
                <Image src={primaryImage.url} alt={primaryImage.alt_text || product.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">No image</div>
              )}
            </div>
            
            {/* Thumbnails - horizontal scroll on mobile */}
            {images.length > 1 && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
                {images.map((img) => (
                  <button key={img.id} className={`relative w-16 md:w-20 aspect-square md:aspect-[4/5] rounded-lg overflow-hidden border-2 shrink-0 ${img.is_primary ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`}>
                    <Image src={img.url} alt={img.alt_text || 'Thumbnail'} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* @ts-ignore */}
            {product.category && <div className="font-label text-label-caps text-on-surface-variant mb-2 md:mb-4">{product.category.name}</div>}
            
            <h1 className="font-display text-2xl md:text-headline-md text-on-surface mb-3 md:mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span className="font-body text-headline-sm text-primary font-medium">{formatCurrency(product.base_price)}</span>
                {hasDiscount && (
                  <span className="font-body text-body-lg text-on-surface-variant line-through">{formatCurrency(product.compare_at_price!)}</span>
                )}
              </div>
              
              {product.review_count > 0 && (
                <div className="flex items-center gap-1 border-l border-outline-variant pl-4 ml-auto">
                  <Star className="w-4 h-4 fill-tertiary-fixed-dim text-tertiary-fixed-dim" />
                  <span className="font-label text-sm font-semibold">{product.avg_rating}</span>
                  <span className="text-on-surface-variant text-sm underline cursor-pointer">({product.review_count} reviews)</span>
                </div>
              )}
            </div>

            <p className="font-body text-body-md md:text-body-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
              {product.short_description || product.description}
            </p>

            {/* Variants (Mocked state UI for now) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-label text-label-caps text-on-surface">Select Variant</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v: any) => (
                    <button 
                      key={v.id} 
                      className="px-5 py-3 rounded-md border border-outline-variant/50 text-body-md font-medium text-on-surface hover:border-primary transition-colors disabled:opacity-50"
                      disabled={v.stock_quantity === 0}
                    >
                      {v.name || v.size || v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <ProductActions product={product} />

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 py-4 md:py-6 px-4 md:px-6 bg-surface-container rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="font-body text-body-sm text-on-surface">Free shipping over ₹2000</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-body text-body-sm text-on-surface">Secure payment</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span className="font-body text-body-sm text-on-surface">7-day easy returns</span>
              </div>
            </div>
            
            {/* Accordion content (Description/Details) would go here */}
            
          </div>
        </div>
      </div>
    </div>
  )
}
