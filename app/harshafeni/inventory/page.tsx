'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAdminInventory, updateVariantStock } from '@/app/actions/inventory'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function InventoryPage() {
  const [variants, setVariants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventory()
  }, [])

  async function fetchInventory() {
    const data = await getAdminInventory()
    setVariants(data)
    setLoading(false)
  }

  async function handleStockChange(variantId: string, newQuantity: number) {
    if (newQuantity < 0) return
    
    // Optimistic UI update
    setVariants(variants.map(v => v.id === variantId ? { ...v, stock_quantity: newQuantity } : v))
    
    const result = await updateVariantStock(variantId, newQuantity)
    if (result.error) {
      toast.error(result.error)
      fetchInventory() // Revert on error
    } else {
      toast.success('Stock updated')
    }
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Inventory Management</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-on-surface-variant uppercase bg-surface-variant/30 border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Variant Name</th>
                  <th className="px-6 py-4 font-medium">SKU</th>
                  <th className="px-6 py-4 font-medium w-32">Stock</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {variants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No variants found in inventory.
                    </td>
                  </tr>
                ) : (
                  variants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-surface-variant/10">
                      <td className="px-6 py-4 font-medium text-on-surface">{variant.product?.name}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{variant.name || 'Default'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">{variant.sku || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <Input 
                          type="number" 
                          min="0"
                          value={variant.stock_quantity}
                          onChange={(e) => handleStockChange(variant.id, parseInt(e.target.value) || 0)}
                          className="w-24 h-8"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {variant.stock_quantity <= 0 ? (
                          <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">Out of Stock</span>
                        ) : variant.stock_quantity <= variant.low_stock_threshold ? (
                          <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Low Stock</span>
                        ) : (
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">In Stock</span>
                        )}
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
