'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/lib/cloudinary'

export async function getAdminProducts() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch admin products:', error)
    return []
  }

  return data
}

export async function createProduct(formData: FormData) {
  try {
    const supabase = await getAdminSupabase()
    
    // Auto-generate slug from name if not provided, and ensure it's URL-safe
    let name = formData.get('name') as string
    let rawSlug = formData.get('slug') as string || name
    let slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const product = {
      name,
      slug,
      description: formData.get('description') as string || null,
      short_description: formData.get('short_description') as string || null,
      base_price: parseFloat(formData.get('base_price') as string),
      compare_at_price: formData.get('compare_at_price') ? parseFloat(formData.get('compare_at_price') as string) : null,
      category_id: formData.get('category_id') as string || null,
      is_active: formData.get('is_active') === 'on',
      is_featured: formData.get('is_featured') === 'on',
    }

    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error

    revalidatePath('/harshafeni/products')
    revalidatePath('/(store)', 'layout')
    
    return { success: true, product: data }
  } catch (error: any) {
    console.error('Error creating product:', error)
    return { error: error.message || 'Failed to create product' }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const supabase = await getAdminSupabase()
    
    let rawSlug = formData.get('slug') as string || formData.get('name') as string
    let slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const product = {
      name: formData.get('name') as string,
      slug,
      description: formData.get('description') as string || null,
      short_description: formData.get('short_description') as string || null,
      base_price: parseFloat(formData.get('base_price') as string),
      compare_at_price: formData.get('compare_at_price') ? parseFloat(formData.get('compare_at_price') as string) : null,
      category_id: formData.get('category_id') as string || null,
      is_active: formData.get('is_active') === 'on',
      is_featured: formData.get('is_featured') === 'on',
    }

    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)

    if (error) throw error

    revalidatePath('/harshafeni/products')
    revalidatePath('/(store)', 'layout')
    revalidatePath(`/products/${product.slug}`)
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating product:', error)
    return { error: error.message || 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath('/harshafeni/products')
    revalidatePath('/(store)', 'layout')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting product:', error)
    return { error: error.message || 'Failed to delete product' }
  }
}

export async function uploadProductImage(productId: string, formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Cloudinary upload using upload_stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'little-pearl/products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const supabase = await getAdminSupabase();
    
    // Check how many images exist to determine sort_order and is_primary
    const { data: existingImages } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId);
      
    const isPrimary = existingImages?.length === 0;
    const sortOrder = existingImages?.length || 0;

    const { error } = await supabase.from('product_images').insert({
      product_id: productId,
      url: uploadResult.secure_url,
      is_primary: isPrimary,
      sort_order: sortOrder
    });

    if (error) throw error;
    
    revalidatePath('/harshafeni/products');
    revalidatePath(`/harshafeni/products/${productId}/edit`);
    revalidatePath('/(store)', 'layout');
    
    return { success: true, url: uploadResult.secure_url };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return { error: error.message || 'Failed to upload image' };
  }
}

export async function deleteProductImage(imageId: string, cloudinaryUrl: string) {
  try {
     // Extract public ID from URL
     // https://res.cloudinary.com/qwmgbgut/image/upload/v1234567/little-pearl/products/abcde.jpg
     const urlParts = cloudinaryUrl.split('/');
     const filename = urlParts[urlParts.length - 1];
     const publicId = `little-pearl/products/${filename.split('.')[0]}`;
     
     await cloudinary.uploader.destroy(publicId);
     
     const supabase = await getAdminSupabase();
     await supabase.from('product_images').delete().eq('id', imageId);
     
     revalidatePath('/harshafeni/products');
     revalidatePath('/(store)', 'layout');
     return { success: true };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return { error: error.message || 'Failed to delete image' };
  }
}
