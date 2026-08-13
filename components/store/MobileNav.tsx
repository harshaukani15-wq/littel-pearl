'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

interface MobileNavProps {
  links: { name: string; href: string }[]
  storeName: string
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ links, storeName, isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-surface z-[70] shadow-elevation-3 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
          <span className="font-display text-lg tracking-widest text-primary uppercase">{storeName}</span>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-3.5 font-label text-label-caps transition-colors ${
                pathname === link.href
                  ? 'text-primary bg-primary/5 border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 py-6 border-t border-outline-variant/30 absolute bottom-0 left-0 right-0">
          <div className="flex flex-col gap-3">
            <Link href="/wishlist" onClick={onClose} className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors">
              ♡ Wishlist
            </Link>
            <Link href="/account" onClick={onClose} className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors">
              👤 Account
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
