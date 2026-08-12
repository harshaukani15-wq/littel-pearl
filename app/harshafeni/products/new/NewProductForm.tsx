'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createProduct, uploadProductImage } from '@/app/actions/products'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProductForm({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Extract files from formData
    const files = formData.getAll('images') as File[]
    
    const result = await createProduct(formData)
    
    if (result.error) {
      toast.error(result.error)
      setSaving(false)
    } else {
      // Upload images if any
      const validFiles = files.filter(f => f.size > 0 && f.name !== '')
      if (validFiles.length > 0) {
        toast.success(`Product created. Uploading ${validFiles.length} image(s)...`)
        for (const file of validFiles) {
          const imgFormData = new FormData()
          imgFormData.append('file', file)
          await uploadProductImage(result.product.id, imgFormData)
        }
      }
      
      toast.success('Product created successfully')
      router.push('/harshafeni/products')
    }
  }

  return (
    <>
      <div className="mb-6">
        <Link href="/harshafeni/products" className="text-sm font-medium text-primary hover:underline flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
        </Link>
        <h1 className="text-3xl font-display font-semibold text-on-surface">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input name="name" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  name="category_id" 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Price (₹)</label>
                <Input name="base_price" type="number" step="0.01" required min="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Compare At Price (₹) - Optional</label>
                <Input name="compare_at_price" type="number" step="0.01" min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Images (JPG, PNG)</label>
              <Input name="images" type="file" multiple accept="image/jpeg, image/png, image/webp" />
              <p className="text-xs text-muted-foreground">You can select multiple images at once.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description (Summary)</label>
              <Input name="short_description" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description</label>
              <textarea 
                name="description" 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-outline-variant">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" defaultChecked className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Active (Visible on store)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_featured" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Featured Product</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </>
  )
}
