import { getAdminSupabase } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import EditProductForm from './EditProductForm'

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const supabase = await getAdminSupabase()
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('id', resolvedParams.id)
    .single()

  if (error || !product) {
    notFound()
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <EditProductForm product={product} categories={categories || []} />
    </div>
  )
}
