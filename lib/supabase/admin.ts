import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// This client uses the service role key and bypasses RLS.
// ONLY use this in protected server actions.
export async function getAdminSupabase() {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get('admin_auth_cookie')?.value
  
  if (adminCookie !== 'harshafeni_secure') {
    throw new Error('Unauthorized')
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
