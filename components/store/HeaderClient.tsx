'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { HeaderActions } from './HeaderActions'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  storeName: string
  navLinks: { name: string; href: string }[]
}

export function HeaderClient({ storeName, navLinks }: HeaderClientProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-outline-variant/30 dark:border-outline/20">
        <div className="flex flex-col items-center w-full px-4 md:px-margin-desktop max-w-container-max mx-auto py-3 md:py-4">
          <div className="w-full flex justify-between items-center mb-0 md:mb-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-primary p-1"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <Link 
              href="/"
              className="font-display text-xl md:text-display-lg tracking-widest text-primary dark:text-primary-fixed-dim absolute left-1/2 -translate-x-1/2"
            >
              {storeName.toUpperCase()}
            </Link>
            
            {/* Trailing Icons */}
            <HeaderActions />
          </div>
          
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-label-caps pb-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        links={navLinks}
        storeName={storeName}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  )
}
