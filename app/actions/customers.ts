'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'

export async function getAdminCustomers() {
  const supabase = await getAdminSupabase()
  
  // Get all customers (profiles with role customer)
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer')
    .order('created_at', { ascending: false })

  if (profileError) {
    console.error('Failed to fetch admin customers:', profileError)
    return []
  }

  // To get order counts and total spent, we need to query orders
  // Since Supabase doesn't easily allow cross-table aggregation in a single simple query without RPC,
  // we'll fetch orders for these users and aggregate in memory for the admin dashboard.
  // Note: For huge datasets, an RPC function or a materialized view is much better.
  const userIds = profiles.map(p => p.id)
  
  if (userIds.length === 0) return []

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('user_id, total, status')
    .in('user_id', userIds)
    // Only count completed/valid orders for total spent
    .not('status', 'in', '("cancelled", "returned")')

  if (ordersError) {
    console.error('Failed to fetch customer orders:', ordersError)
    return profiles // Return profiles without order stats if error
  }

  // Aggregate
  const customerStats = userIds.reduce((acc: any, id: string) => {
    const userOrders = orders.filter(o => o.user_id === id)
    acc[id] = {
      orderCount: userOrders.length,
      totalSpent: userOrders.reduce((sum, order) => sum + Number(order.total), 0)
    }
    return acc
  }, {})

  // Merge
  return profiles.map(profile => ({
    ...profile,
    stats: customerStats[profile.id] || { orderCount: 0, totalSpent: 0 }
  }))
}
