import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default async function OrdersPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all orders
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (id, product_name, quantity, price, image_url)
    `)
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-secondary text-secondary-foreground'
      case 'cancelled': case 'returned': return 'bg-error-container text-on-error-container'
      case 'shipped': case 'out_for_delivery': return 'bg-tertiary-container text-on-tertiary-container'
      default: return 'bg-primary-container text-on-primary-container'
    }
  }

  return (
    <div>
      <h2 className="font-display text-headline-sm text-on-surface mb-6">Order History</h2>
      
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-outline-variant/30 rounded-xl overflow-hidden bg-surface">
              {/* Order Header */}
              <div className="bg-surface-container/50 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-outline-variant/30">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="font-label text-label-caps text-on-surface-variant mb-1">Order Number</p>
                    <p className="font-medium text-sm text-on-surface">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="font-label text-label-caps text-on-surface-variant mb-1">Date Placed</p>
                    <p className="font-medium text-sm text-on-surface">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="font-label text-label-caps text-on-surface-variant mb-1">Total Amount</p>
                    <p className="font-medium text-sm text-on-surface">{formatCurrency(order.total)}</p>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className={`border-none ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-surface-variant rounded-md shrink-0 overflow-hidden">
                        {item.image_url && <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-on-surface">{item.product_name}</p>
                        <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium text-sm">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-outline-variant/30 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/account/orders/${order.id}`}>View Details & Tracking</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface-container rounded-xl">
          <p className="font-body text-body-md text-on-surface-variant mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
