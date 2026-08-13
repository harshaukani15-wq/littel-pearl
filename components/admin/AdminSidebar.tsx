'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Layers, Ticket, Users, Star, Settings, Store, LogOut, X, Menu } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <>
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
                onClick={() => setMobileOpen(false)}
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
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-body text-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        >
          <Store className="w-5 h-5" />
          View Store
        </Link>
        <Link 
          href="/harshafeni/settings"
          onClick={() => setMobileOpen(false)}
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
    </>
  )

  return (
    <>
      {/* Mobile Header Bar with hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface-container border-b border-outline-variant/30 flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-surface-variant transition-colors"
          aria-label="Open admin menu"
        >
          <Menu className="w-6 h-6 text-on-surface" />
        </button>
        <span className="font-display text-sm tracking-widest text-primary uppercase">{STORE_NAME}</span>
        <Badge variant="outline" className="text-[9px] bg-primary text-on-primary border-none">ADMIN</Badge>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-72 bg-surface-container z-[60] flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-4 p-1 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar (always visible) */}
      <aside className="hidden md:flex w-64 bg-surface-container border-r border-outline-variant/30 flex-col min-h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  )
}

function Badge({ className, children, ...props }: any) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", className)} {...props}>
      {children}
    </span>
  )
}
