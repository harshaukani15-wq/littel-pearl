import Link from 'next/link'
import { getAdminProducts, deleteProduct } from '@/app/actions/products'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function AdminProductsPage() {
  const products = await getAdminProducts()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-on-surface">Products</h1>
          <p className="text-on-surface-variant font-body">Manage your store catalog.</p>
        </div>
        <Button asChild>
          <Link href="/harshafeni/products/new">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
        <table className="w-full text-left text-sm text-on-surface">
          <thead className="bg-surface-variant/50 border-b border-outline-variant font-label text-label-caps uppercase text-on-surface-variant">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-variant/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface">{product.name}</div>
                    <div className="text-xs text-on-surface-variant">{product.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {/* @ts-ignore - Supabase nested join type */}
                    {product.category?.name || 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4">{formatCurrency(product.base_price)}</td>
                  <td className="px-6 py-4">
                    {product.is_active ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/harshafeni/products/${product.id}/edit`}>
                          <Edit2 className="w-4 h-4" />
                        </Link>
                      </Button>
                      <form action={async () => {
                        'use server'
                        await deleteProduct(product.id)
                      }}>
                        <Button variant="outline" size="sm" className="text-error hover:bg-error-container hover:text-on-error-container" type="submit">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
