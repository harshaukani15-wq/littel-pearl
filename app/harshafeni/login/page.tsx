import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { STORE_NAME } from '@/lib/constants'
import { Lock } from 'lucide-react'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  async function login(formData: FormData) {
    'use server'
    const password = formData.get('password')
    
    if (password === 'Harsha@$163616') {
      const cookieStore = await cookies()
      cookieStore.set('admin_auth_cookie', 'harshafeni_secure', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
      redirect('/harshafeni')
    } else {
      redirect('/harshafeni/login?error=Invalid+password')
    }
  }

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center py-12 px-margin-mobile">
      <div className="w-full max-w-md bg-surface-container rounded-2xl p-8 shadow-sm border border-outline-variant/30 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container text-primary mb-6">
          <Lock className="w-8 h-8" />
        </div>
        
        <h1 className="font-display text-headline-sm text-on-surface mb-2">{STORE_NAME} Admin</h1>
        <p className="font-body text-body-sm text-on-surface-variant mb-8">
          Restricted Area. Please enter the master password to continue.
        </p>

        {searchParams.error && (
          <div className="bg-error-container text-on-error-container text-sm font-medium p-3 rounded-lg mb-6">
            {searchParams.error}
          </div>
        )}

        <form action={login} className="space-y-4">
          <Input 
            type="password" 
            name="password" 
            placeholder="Enter admin password" 
            className="text-center"
            required 
            autoFocus
          />
          <Button type="submit" className="w-full">Unlock Dashboard</Button>
        </form>
      </div>
    </div>
  )
}
