'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getAdminReviews, toggleReviewApproval } from '@/app/actions/reviews'
import { toast } from 'react-hot-toast'
import { Loader2, Star, CheckCircle2, XCircle } from 'lucide-react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    const data = await getAdminReviews()
    setReviews(data)
    setLoading(false)
  }

  async function handleToggleApproval(id: string, currentStatus: boolean) {
    const result = await toggleReviewApproval(id, !currentStatus)
    if (result.error) toast.error(result.error)
    else {
      toast.success(currentStatus ? 'Review hidden' : 'Review approved')
      fetchReviews()
    }
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Reviews Moderation</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-on-surface-variant uppercase bg-surface-variant/30 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Rating & Review</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-surface-variant/10">
                      <td className="px-6 py-4 font-medium text-on-surface align-top pt-5">
                        {review.profiles?.display_name || 'Guest'}
                        {review.is_verified_purchase && (
                          <div className="text-[10px] text-green-600 font-bold uppercase tracking-wide mt-1">Verified Buyer</div>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        <div className="font-medium text-primary">{review.product?.name}</div>
                        <div className="text-xs text-on-surface-variant">{new Date(review.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-amber-500 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <h4 className="font-bold text-on-surface mb-1">{review.title}</h4>
                        <p className="text-sm text-on-surface-variant line-clamp-2">{review.body}</p>
                      </td>
                      <td className="px-6 py-4 text-right align-top pt-5">
                        {review.is_approved ? (
                          <span className="inline-flex items-center text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                            <XCircle className="w-3 h-3 mr-1" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right align-top pt-5">
                        <button 
                          onClick={() => handleToggleApproval(review.id, review.is_approved)}
                          className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                            review.is_approved 
                              ? 'border-red-200 text-red-600 hover:bg-red-50' 
                              : 'border-green-200 text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {review.is_approved ? 'Hide Review' : 'Approve Review'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
