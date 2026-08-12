'use server'

import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getStoreSettings() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .single()

  if (error) {
    console.error('Failed to fetch settings:', error)
    return null
  }

  return data
}

export async function updateStoreSettings(formData: FormData) {
  try {
    const supabase = await getAdminSupabase()
    
    const settings = {
      store_name: formData.get('store_name') as string,
      store_description: formData.get('store_description') as string,
      hero_title: formData.get('hero_title') as string,
      hero_subtitle: formData.get('hero_subtitle') as string,
      contact_email: formData.get('contact_email') as string,
      contact_phone: formData.get('contact_phone') as string,
      shipping_banner_text: formData.get('shipping_banner_text') as string,
    }

    const { error } = await supabase
      .from('store_settings')
      .update(settings)
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) throw error

    // Revalidate paths that use these settings
    revalidatePath('/')
    revalidatePath('/harshafeni/settings')
    revalidatePath('/(store)', 'layout')

    return { success: true }
  } catch (error: any) {
    console.error('Error updating settings:', error)
    return { error: error.message || 'Failed to update settings' }
  }
}
