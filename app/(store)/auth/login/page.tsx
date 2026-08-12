import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { STORE_NAME } from '@/lib/constants'

export default function LoginPage() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center py-12 px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-md bg-surface-container rounded-2xl p-8 md:p-12 shadow-sm border border-outline-variant/30">
        <div className="text-center mb-8">
          <h1 className="font-display text-headline-md text-on-surface mb-2">Welcome Back</h1>
          <p className="font-body text-body-sm text-on-surface-variant">Sign in to your {STORE_NAME} account</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="font-body text-body-sm text-on-surface" htmlFor="email">Email Address</label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-body text-body-sm text-on-surface" htmlFor="password">Password</label>
              <Link href="#" className="font-body text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          
          <Button type="submit" className="w-full h-12 text-base">Sign In</Button>
        </form>

        <div className="mt-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-outline-variant/50 after:mt-0.5 after:flex-1 after:border-t after:border-outline-variant/50">
          <p className="mx-4 mb-0 text-center font-label text-xs font-semibold text-on-surface-variant uppercase">
            Or
          </p>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
            </svg>
            Sign in with Google
          </Button>
        </div>

        <p className="mt-8 text-center font-body text-body-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
