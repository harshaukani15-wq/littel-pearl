import Link from 'next/link'
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background min-h-[80vh]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
        <h1 className="font-display text-display-lg-mobile md:text-headline-md text-on-surface mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Account Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col space-y-2">
              <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-variant text-on-surface transition-colors font-medium">
                <User className="w-5 h-5 text-on-surface-variant" />
                Dashboard
              </Link>
              <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-variant text-on-surface transition-colors">
                <Package className="w-5 h-5 text-on-surface-variant" />
                My Orders
              </Link>
              <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-variant text-on-surface transition-colors">
                <MapPin className="w-5 h-5 text-on-surface-variant" />
                Addresses
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-variant text-on-surface transition-colors">
                <Heart className="w-5 h-5 text-on-surface-variant" />
                Wishlist
              </Link>
              
              <div className="pt-4 mt-4 border-t border-outline-variant/30">
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-error-container text-error transition-colors text-left">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
