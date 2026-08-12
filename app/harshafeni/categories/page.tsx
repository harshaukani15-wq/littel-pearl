import { getAdminCategories, deleteCategory, createCategory } from '@/app/actions/categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Categories</h1>
        <p className="text-on-surface-variant font-body">Manage product categories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* List */}
        <div className="md:col-span-2">
          <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full text-left text-sm text-on-surface">
              <thead className="bg-surface-variant/50 border-b border-outline-variant font-label text-label-caps uppercase text-on-surface-variant">
                <tr>
                  <th className="px-6 py-4 font-medium">Category Name</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-on-surface-variant">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-on-surface">{cat.name}</div>
                        <div className="text-xs text-on-surface-variant">{cat.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        {cat.is_active ? 'Active' : 'Draft'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          'use server'
                          await deleteCategory(cat.id)
                        }}>
                          <Button variant="outline" size="sm" className="text-error hover:bg-error-container hover:text-on-error-container" type="submit">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={async (formData) => {
                'use server'
                await createCategory(formData)
              }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input name="description" />
                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_active" defaultChecked className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
                <Button type="submit" className="w-full mt-4">Create Category</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
