import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, User } from 'lucide-react'

export default async function AccountDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data
  }

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, order_number, status, total, created_at')
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="space-y-8">
      <h2 className="font-display text-headline-sm text-on-surface">Welcome back, {profile?.display_name || user?.email?.split('@')[0]}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="bg-surface-container border-outline-variant/30">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profile Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-body text-body-md text-on-surface-variant"><strong className="text-on-surface">Name:</strong> {profile?.display_name || 'Not provided'}</p>
            <p className="font-body text-body-md text-on-surface-variant"><strong className="text-on-surface">Email:</strong> {user?.email}</p>
            <p className="font-body text-body-md text-on-surface-variant"><strong className="text-on-surface">Phone:</strong> {profile?.phone || 'Not provided'}</p>
            <div className="pt-4">
              <Link href="/account/settings" className="text-primary font-medium text-sm hover:underline">Edit Profile</Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Links Card */}
        <Card className="bg-surface-container border-outline-variant/30">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders && recentOrders.length > 0 ? (
              <ul className="space-y-3 mb-4">
                {recentOrders.map((order) => (
                  <li key={order.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{order.order_number}</span>
                    <span className="text-on-surface-variant capitalize">{order.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-body-sm text-on-surface-variant mb-4">You have no recent orders.</p>
            )}
            <Link href="/account/orders" className="text-primary font-medium text-sm hover:underline">View All Orders</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
