import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ProductWithImages } from '@/types'
import { formatCurrency } from '@/lib/utils'

export function ProductCard({ product }: { product: ProductWithImages }) {
  // @ts-ignore
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0] || product.images?.[0]
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.base_price

  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-variant mb-4 border border-transparent transition-colors group-hover:border-tertiary">
        {hasDiscount && (
          <Badge variant="sale" className="absolute top-3 left-3 z-10">Sale</Badge>
        )}
        
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
            No image
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-body text-body-md text-on-surface truncate mb-1" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-body text-body-md text-primary font-medium">
            {formatCurrency(product.base_price)}
          </span>
          {hasDiscount && (
            <span className="font-body text-body-sm text-on-surface-variant line-through">
              {formatCurrency(product.compare_at_price!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
