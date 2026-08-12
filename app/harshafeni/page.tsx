import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, cn } from '@/lib/utils'
import { IndianRupee, ShoppingBag, Package, TrendingUp } from 'lucide-react'

export const revalidate = 60 // Refresh stats every minute

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // 1. Get total revenue (completed orders)
  const { data: revenueData } = await supabase
    .from('orders')
    .select('total')
    .in('status', ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'])

  const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total), 0) || 0

  // 2. Total Orders
  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  // 3. Active Products
  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 4. Low Stock Variants (<= threshold)
  // We'll use a direct query for variants to find those low on stock
  const { count: lowStock } = await supabase
    .from('product_variants')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .filter('stock_quantity', 'lte', 5) // Hardcoding threshold 5 for simplicity, could use db threshold

  const avgOrderValue = totalOrders && totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-headline-md text-on-surface mb-2">Dashboard Overview</h1>
        <p className="font-body text-body-md text-on-surface-variant">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          icon={<IndianRupee className="w-5 h-5 text-primary" />} 
          trend="+12.5% from last month"
          trendUp={true}
        />
        <StatsCard 
          title="Total Orders" 
          value={totalOrders?.toString() || '0'} 
          icon={<ShoppingBag className="w-5 h-5 text-primary" />} 
          trend="+5.2% from last month"
          trendUp={true}
        />
        <StatsCard 
          title="Active Products" 
          value={activeProducts?.toString() || '0'} 
          icon={<Package className="w-5 h-5 text-primary" />} 
          trend="In catalog"
          trendUp={null}
        />
        <StatsCard 
          title="Low Stock Items" 
          value={lowStock?.toString() || '0'} 
          icon={<TrendingUp className="w-5 h-5 text-error" />} 
          trend="Requires attention"
          trendUp={false}
          valueColor={lowStock && lowStock > 0 ? 'text-error' : 'text-on-surface'}
        />
      </div>

      {/* Charts Placeholder - Recharts would go here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-surface-container border-outline-variant/30">
          <CardHeader>
            <CardTitle className="font-display text-lg text-on-surface">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t border-outline-variant/30 bg-surface/50 m-6 rounded-lg">
            <span className="text-on-surface-variant font-body">Chart Area</span>
          </CardContent>
        </Card>

        <Card className="bg-surface-container border-outline-variant/30">
          <CardHeader>
            <CardTitle className="font-display text-lg text-on-surface">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-outline-variant/30 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm text-on-surface">#LP-2026081{i}</p>
                    <p className="text-xs text-on-surface-variant">Just now</p>
                  </div>
                  <span className="font-medium text-sm text-primary">₹{(Math.random() * 5000 + 1000).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, trend, trendUp, valueColor = "text-on-surface" }: any) {
  return (
    <Card className="bg-surface border border-outline-variant/30 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-on-surface-variant">{title}</CardTitle>
        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-display font-semibold mb-1 ${valueColor}`}>{value}</div>
        <p className={cn("text-xs font-medium", 
          trendUp === true ? "text-[#34A853]" : 
          trendUp === false ? "text-error" : 
          "text-on-surface-variant"
        )}>
          {trend}
        </p>
      </CardContent>
    </Card>
  )
}
