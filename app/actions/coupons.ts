'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAdminCoupons() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch admin coupons:', error)
    return []
  }

  return data
}

export async function createCoupon(formData: FormData) {
  try {
    const supabase = await getAdminSupabase()
    
    const coupon = {
      code: (formData.get('code') as string).toUpperCase(),
      type: formData.get('type') as 'percentage' | 'fixed',
      value: parseFloat(formData.get('value') as string),
      min_order_amount: formData.get('min_order_amount') ? parseFloat(formData.get('min_order_amount') as string) : 0,
      usage_limit: formData.get('usage_limit') ? parseInt(formData.get('usage_limit') as string) : null,
      is_active: formData.get('is_active') === 'on'
    }

    const { error } = await supabase
      .from('coupons')
      .insert(coupon)

    if (error) throw error

    revalidatePath('/harshafeni/coupons')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error creating coupon:', error)
    return { error: error.message || 'Failed to create coupon' }
  }
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: isActive })
      .eq('id', id)

    if (error) throw error

    revalidatePath('/harshafeni/coupons')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error toggling coupon status:', error)
    return { error: error.message || 'Failed to update coupon' }
  }
}

export async function deleteCoupon(id: string) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath('/harshafeni/coupons')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting coupon:', error)
    return { error: error.message || 'Failed to delete coupon' }
  }
}
