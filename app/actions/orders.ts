'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAdminOrders() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles:user_id(display_name),
      items:order_items(id, product_name, variant_label, quantity, price)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch admin orders:', error)
    return []
  }

  return data
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) throw error

    revalidatePath('/harshafeni/orders')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating order status:', error)
    return { error: error.message || 'Failed to update order' }
  }
}
