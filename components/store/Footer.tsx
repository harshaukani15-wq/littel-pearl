import Link from 'next/link'
import { STORE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant/20 w-full block mt-auto pb-24 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <span className="font-display text-display-lg-mobile text-primary dark:text-primary-fixed-dim mb-4 tracking-widest uppercase">
            {STORE_NAME}
          </span>
          <p className="font-body text-body-sm text-on-surface-variant mb-4">
            © {new Date().getFullYear()} {STORE_NAME} India. All Rights Reserved.
          </p>
        </div>
        
        <div className="col-span-1 flex flex-col gap-3 mt-8 md:mt-0">
          <h4 className="font-display text-headline-sm text-on-surface mb-2">Shop</h4>
          <Link href="/shop" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Shop All</Link>
          <Link href="/shop/baby" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Baby Apparel</Link>
          <Link href="/shop/jewellery" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Pearl Jewellery</Link>
        </div>
        
        <div className="col-span-1 flex flex-col gap-3 mt-8 md:mt-0">
          <h4 className="font-display text-headline-sm text-on-surface mb-2">About</h4>
          <Link href="/story" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Our Heritage</Link>
          <Link href="/sustainability" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Sustainability</Link>
        </div>
        
        <div className="col-span-1 flex flex-col gap-3 mt-8 md:mt-0">
          <h4 className="font-display text-headline-sm text-on-surface mb-2">Help</h4>
          <Link href="/shipping" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Shipping & Returns</Link>
          <Link href="/contact" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Contact Us</Link>
          <Link href="/privacy" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
