'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateProduct, uploadProductImage, deleteProductImage } from '@/app/actions/products'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function EditProductForm({ product, categories }: { product: any, categories: any[] }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // Keep local state for optimistic UI updates on images
  const [images, setImages] = useState<any[]>(product.images || [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await updateProduct(product.id, formData)
    
    if (result.error) {
      toast.error(result.error)
      setSaving(false)
    } else {
      toast.success('Product updated successfully')
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    let uploadedCount = 0;
    
    for (const file of files) {
      if (file.size === 0) continue;
      
      const formData = new FormData();
      formData.append('file', file);
      
      const result = await uploadProductImage(product.id, formData);
      if (result.error) {
        toast.error(`Failed to upload ${file.name}: ${result.error}`);
      } else {
        uploadedCount++;
        // Refresh router to get new images, or append locally (we'll just refresh)
      }
    }
    
    if (uploadedCount > 0) {
      toast.success(`Uploaded ${uploadedCount} image(s)`);
      router.refresh();
      // Temporary hack to show the user it uploaded before a hard refresh:
      // ideally we'd fetch the new images list here. For now router.refresh() works well in Next App router.
    }
    
    setUploading(false);
    if (e.target) e.target.value = ''; // Reset input
  }

  async function handleDeleteImage(imageId: string, url: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    setImages(images.filter(img => img.id !== imageId)); // Optimistic UI update
    
    const result = await deleteProductImage(imageId, url);
    if (result.error) {
      toast.error(result.error);
      // Revert optimistic update
      setImages(product.images || []);
    } else {
      toast.success('Image deleted');
      router.refresh();
    }
  }

  return (
    <>
      <div className="mb-6">
        <Link href="/harshafeni/products" className="text-sm font-medium text-primary hover:underline flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
        </Link>
        <h1 className="text-3xl font-display font-semibold text-on-surface">Edit Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input name="name" defaultValue={product.name} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  name="category_id" 
                  defaultValue={product.category_id || ''}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL identifier)</label>
              <Input name="slug" defaultValue={product.slug} required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Price (₹)</label>
                <Input name="base_price" type="number" step="0.01" defaultValue={product.base_price} required min="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Compare At Price (₹) - Optional</label>
                <Input name="compare_at_price" type="number" step="0.01" defaultValue={product.compare_at_price || ''} min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description (Summary)</label>
              <Input name="short_description" defaultValue={product.short_description || ''} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description</label>
              <textarea 
                name="description" 
                defaultValue={product.description || ''}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-outline-variant">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" defaultChecked={product.is_active} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Active (Visible on store)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_featured" defaultChecked={product.is_featured} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Featured Product</span>
              </label>
            </div>
          </CardContent>
        </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Images Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {images.length === 0 && (
                  <div className="col-span-2 py-8 text-center text-on-surface-variant border-2 border-dashed border-outline-variant rounded-lg">
                    No images uploaded yet.
                  </div>
                )}
                {images.map((img) => (
                  <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-outline-variant bg-surface-variant/20">
                    <Image 
                      src={img.url} 
                      alt="Product image" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDeleteImage(img.id, img.url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {img.is_primary && (
                      <div className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-outline-variant">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-outline-variant rounded-lg cursor-pointer bg-surface hover:bg-surface-variant/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                       <Loader2 className="w-8 h-8 mb-3 text-primary animate-spin" />
                    ) : (
                       <Upload className="w-8 h-8 mb-3 text-on-surface-variant" />
                    )}
                    <p className="mb-2 text-sm text-on-surface-variant">
                      <span className="font-semibold">{uploading ? 'Uploading...' : 'Click to upload'}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant">SVG, PNG, JPG (Multiple allowed)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
