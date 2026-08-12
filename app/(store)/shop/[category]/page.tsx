import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/store/ProductCard'
import { Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Find the category by slug
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id, name, slug, description')
    .eq('slug', resolvedParams.category)
    .eq('is_active', true)
    .single()

  if (categoryError || !category) {
    notFound()
  }

  const searchQuery = searchParams?.q as string | undefined

  let query = supabase
    .from('products')
    .select(`
      *,
      product_images (url, alt_text, is_primary)
    `)
    .eq('category_id', category.id)
    .eq('is_active', true)

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`)
  }

  const { data: products, error } = await query
    .order('created_at', { ascending: false })
    .limit(20)

  // Fetch all active categories for the sidebar
  const { data: allCategories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="font-display text-2xl md:text-display-lg text-primary mb-2 md:mb-4">{category.name}</h1>
        <p className="font-body text-body-md md:text-body-lg text-on-surface-variant">
          {category.description || `Discover our collection of elegant ${category.name.toLowerCase()}.`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 border border-outline-variant/50 rounded-xl p-6 bg-surface">
            <h3 className="font-display text-headline-sm text-on-surface mb-6 border-b border-outline-variant/30 pb-4">Filters</h3>
            
            <div className="mb-8">
              <h4 className="font-label text-label-caps text-on-surface mb-4">Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/shop" className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors">All Products</a>
                </li>
                {allCategories?.map((cat) => (
                  <li key={cat.id}>
                    <a 
                      href={`/shop/${cat.slug}`} 
                      className={`font-body text-body-md transition-colors ${cat.slug === resolvedParams.category ? 'text-primary font-medium' : 'text-on-surface-variant hover:text-primary'}`}
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="font-label text-label-caps text-on-surface mb-4">Price Range</h4>
              <ul className="space-y-3">
                <li>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                    <span className="font-body text-body-md text-on-surface-variant">Under ₹1,000</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                    <span className="font-body text-body-md text-on-surface-variant">₹1,000 - ₹3,000</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" />
                    <span className="font-body text-body-md text-on-surface-variant">Over ₹3,000</span>
                  </label>
                </li>
              </ul>
            </div>
            
            <Button className="w-full">Apply Filters</Button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Mobile Filter & Sort Toolbar */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
            <Button variant="outline" className="lg:hidden flex gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
            
            <div className="hidden lg:block text-body-sm text-on-surface-variant">
              Showing {products?.length || 0} products
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-label text-label-caps text-on-surface-variant hidden md:inline-block">Sort By</span>
              <button className="flex items-center gap-2 font-body text-body-md text-on-surface px-4 py-2 border border-outline-variant/50 rounded-md hover:bg-surface-variant transition-colors">
                Newest <ChevronDown className="w-4 h-4 text-on-surface-variant" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container rounded-xl border border-outline-variant/20">
              <h3 className="font-display text-headline-sm text-on-surface mb-2">No products found</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6">We couldn't find any products in this category.</p>
              <Button>View All Products</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
