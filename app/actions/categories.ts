'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAdminCategories() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to fetch admin categories:', error)
    return []
  }

  return data
}

export async function createCategory(formData: FormData) {
  try {
    const supabase = await getAdminSupabase()
    
    let name = formData.get('name') as string
    let slug = formData.get('slug') as string || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const category = {
      name,
      slug,
      description: formData.get('description') as string || null,
      is_active: formData.get('is_active') === 'on',
    }

    const { error } = await supabase
      .from('categories')
      .insert(category)

    if (error) throw error

    revalidatePath('/harshafeni/categories')
    revalidatePath('/(store)', 'layout')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error creating category:', error)
    return { error: error.message || 'Failed to create category' }
  }
}

export async function deleteCategory(id: string) {
  try {
    const supabase = await getAdminSupabase()
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath('/harshafeni/categories')
    revalidatePath('/(store)', 'layout')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting category:', error)
    return { error: error.message || 'Failed to delete category' }
  }
}
