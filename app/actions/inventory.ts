'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAdminInventory() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('product_variants')
    .select(`
      *,
      product:products(name, slug)
    `)
    .order('stock_quantity', { ascending: true })

  if (error) {
    console.error('Failed to fetch admin inventory:', error)
    return []
  }

  return data
}

export async function updateVariantStock(variantId: string, quantity: number) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('product_variants')
      .update({ stock_quantity: quantity })
      .eq('id', variantId)

    if (error) throw error

    revalidatePath('/harshafeni/inventory')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating stock:', error)
    return { error: error.message || 'Failed to update stock' }
  }
}
