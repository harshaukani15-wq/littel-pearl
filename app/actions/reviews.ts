'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAdminReviews() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id(display_name),
      product:products(name)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch admin reviews:', error)
    return []
  }

  return data
}

export async function toggleReviewApproval(reviewId: string, isApproved: boolean) {
  try {
    const supabase = await getAdminSupabase()
    
    // 1. Update review approval status
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: isApproved })
      .eq('id', reviewId)

    if (error) throw error

    // 2. Fetch all approved reviews for this product to update the product's avg_rating and review_count
    const { data: review } = await supabase.from('reviews').select('product_id').eq('id', reviewId).single()
    
    if (review) {
      const { data: approvedReviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', review.product_id)
        .eq('is_approved', true)

      let newAvgRating = 0
      let newCount = 0

      if (approvedReviews && approvedReviews.length > 0) {
        newCount = approvedReviews.length
        const totalScore = approvedReviews.reduce((sum, r) => sum + r.rating, 0)
        newAvgRating = Number((totalScore / newCount).toFixed(1))
      }

      await supabase
        .from('products')
        .update({ avg_rating: newAvgRating, review_count: newCount })
        .eq('id', review.product_id)
    }

    revalidatePath('/harshafeni/reviews')
    revalidatePath('/(store)', 'layout') // Revalidate storefront
    
    return { success: true }
  } catch (error: any) {
    console.error('Error toggling review approval:', error)
    return { error: error.message || 'Failed to update review' }
  }
}
