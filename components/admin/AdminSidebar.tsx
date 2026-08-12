'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Layers, Ticket, Users, Star, Settings, Store, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORE_NAME } from '@/lib/constants'

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/harshafeni', icon: LayoutDashboard },
  { name: 'Products', href: '/harshafeni/products', icon: Package },
  { name: 'Orders', href: '/harshafeni/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/harshafeni/inventory', icon: Layers },
  { name: 'Coupons', href: '/harshafeni/coupons', icon: Ticket },
  { name: 'Customers', href: '/harshafeni/customers', icon: Users },
  { name: 'Reviews', href: '/harshafeni/reviews', icon: Star },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-surface-container border-r border-outline-variant/30 flex flex-col min-h-screen sticky top-0">
      <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
        <span className="font-display text-lg tracking-widest text-primary uppercase">{STORE_NAME}</span>
        <Badge variant="outline" className="text-[10px] bg-primary text-on-primary border-none">ADMIN</Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-4 text-xs font-label text-label-caps text-on-surface-variant px-4">Main Menu</div>
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/harshafeni' && pathname.startsWith(link.href))
            const Icon = link.icon
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body text-sm",
                  isActive 
                    ? "bg-primary text-on-primary font-medium shadow-sm" 
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-on-primary" : "text-on-surface-variant")} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-outline-variant/30 space-y-1">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-body text-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        >
          <Store className="w-5 h-5" />
          View Store
        </Link>
        <Link 
          href="/harshafeni/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-body text-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button 
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-body text-sm text-error hover:bg-error-container"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

function Badge({ className, variant, children, ...props }: any) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", className)} {...props}>
      {children}
    </span>
  )
}
