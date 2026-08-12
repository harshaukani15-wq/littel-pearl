'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAdminCoupons, createCoupon, toggleCouponStatus, deleteCoupon } from '@/app/actions/coupons'
import { toast } from 'react-hot-toast'
import { Loader2, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCoupons()
  }, [])

  async function fetchCoupons() {
    const data = await getAdminCoupons()
    setCoupons(data)
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await createCoupon(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Coupon created')
      ;(e.target as HTMLFormElement).reset()
      fetchCoupons()
    }
    setSaving(false)
  }

  async function handleToggleStatus(id: string, currentStatus: boolean) {
    const result = await toggleCouponStatus(id, !currentStatus)
    if (result.error) toast.error(result.error)
    else fetchCoupons()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this coupon?')) return
    const result = await deleteCoupon(id)
    if (result.error) toast.error(result.error)
    else fetchCoupons()
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Coupons & Discounts</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create New Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <Input name="code" required placeholder="e.g. SUMMER20" className="uppercase" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select name="type" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value</label>
                    <Input name="value" type="number" step="0.01" required min="0" placeholder="20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Min. Order Amount (₹)</label>
                  <Input name="min_order_amount" type="number" step="0.01" min="0" placeholder="Optional" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Usage Limit</label>
                  <Input name="usage_limit" type="number" min="1" placeholder="Optional (e.g. 100)" />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" name="is_active" defaultChecked className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                  <label className="text-sm font-medium">Active (Ready to use)</label>
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Creating...' : 'Create Coupon'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active & Past Coupons</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-on-surface-variant uppercase bg-surface-variant/30 border-b border-outline-variant">
                    <tr>
                      <th className="px-6 py-4 font-medium">Code</th>
                      <th className="px-6 py-4 font-medium">Discount</th>
                      <th className="px-6 py-4 font-medium">Usage</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {coupons.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                          No coupons found.
                        </td>
                      </tr>
                    ) : (
                      coupons.map((coupon) => (
                        <tr key={coupon.id} className="hover:bg-surface-variant/10">
                          <td className="px-6 py-4 font-bold text-on-surface">{coupon.code}</td>
                          <td className="px-6 py-4">
                            {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                            {coupon.min_order_amount > 0 && <div className="text-xs text-on-surface-variant">Min: ₹{coupon.min_order_amount}</div>}
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant">
                            {coupon.used_count} {coupon.usage_limit ? `/ ${coupon.usage_limit}` : 'used'}
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleToggleStatus(coupon.id, coupon.is_active)}
                              className={`text-xs font-medium px-2 py-1 rounded-full ${coupon.is_active ? 'text-green-600 bg-green-100 hover:bg-green-200' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                            >
                              {coupon.is_active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
      </div>
    </div>
  )
}
