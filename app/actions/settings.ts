'use server'

import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { getAdminSupabase } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { unstable_cache } from 'next/cache'

// A lightweight Supabase client that does NOT use cookies (safe for unstable_cache)
function getPublicSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Cache getStoreSettings for 5 minutes to avoid hitting the database on every page load
const getCachedSettings = unstable_cache(
  async () => {
    const supabase = getPublicSupabase()

    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .single()

    if (error) {
      console.error('Failed to fetch settings:', error)
      return null
    }

    return data
  },
  ['store-settings'],
  { revalidate: 300, tags: ['store-settings'] } // Cache for 5 minutes
)

export async function getStoreSettings() {
  return getCachedSettings()
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
      contact_timing: formData.get('contact_timing') as string,
      contact_heading: formData.get('contact_heading') as string,
      shipping_banner_text: formData.get('shipping_banner_text') as string,
    }

    const { error } = await supabase
      .from('store_settings')
      .update(settings)
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) throw error

    // Revalidate paths that use these settings
    revalidatePath('/', 'layout')
    revalidatePath('/harshafeni/settings')

    return { success: true }
  } catch (error: any) {
    console.error('Error updating settings:', error)
    return { error: error.message || 'Failed to update settings' }
  }
}
