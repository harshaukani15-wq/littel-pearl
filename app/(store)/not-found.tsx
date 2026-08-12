import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className="flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <h1 className="font-display text-[120px] leading-none text-primary/20 mb-4">404</h1>
        <h2 className="font-display text-headline-md text-on-surface mb-4">Page Not Found</h2>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </main>
    </div>
  )
}
