'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAdminOrders, updateOrderStatus } from '@/app/actions/orders'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const data = await getAdminOrders()
    setOrders(data)
    setLoading(false)
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    const result = await updateOrderStatus(orderId, newStatus)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Order status updated')
      fetchOrders()
    }
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Orders</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-on-surface-variant uppercase bg-surface-variant/30 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-medium">Order Number</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-variant/10">
                      <td className="px-6 py-4 font-medium text-on-surface">{order.order_number}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="text-on-surface">{order.profiles?.display_name || 'Guest'}</div>
                        <div className="text-xs text-on-surface-variant">{order.contact_email}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-primary">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="returned">Returned</option>
                        </select>
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
