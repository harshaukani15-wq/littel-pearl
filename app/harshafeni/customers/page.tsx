'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getAdminCustomers } from '@/app/actions/customers'
import { Loader2 } from 'lucide-react'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const data = await getAdminCustomers()
    setCustomers(data)
    setLoading(false)
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Customers Directory</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-on-surface-variant uppercase bg-surface-variant/30 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer Name</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium text-center">Orders</th>
                  <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                  <th className="px-6 py-4 font-medium text-right">Joined On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-surface-variant/10">
                      <td className="px-6 py-4 font-medium text-on-surface">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {customer.display_name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          {customer.display_name || 'Unnamed User'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{customer.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-center font-medium">
                        {customer.stats.orderCount}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-primary">
                        ₹{customer.stats.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-on-surface-variant">
                        {new Date(customer.created_at).toLocaleDateString()}
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
