import { createBrowserClient } from '@supabase/ssr'


export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl) {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables!')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
