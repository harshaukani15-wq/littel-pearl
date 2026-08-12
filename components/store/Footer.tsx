import Link from 'next/link'
import { STORE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant/20 w-full block mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-8 px-margin-mobile md:px-margin-desktop py-12 md:py-16 max-w-container-max mx-auto">
        <div className="col-span-2 md:col-span-1 flex flex-col items-start md:pr-4">
          <span className="font-display text-headline-md text-primary dark:text-primary-fixed-dim mb-3 md:mb-4 tracking-widest uppercase">
            {STORE_NAME}
          </span>
          <p className="font-body text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} {STORE_NAME} India.<br className="hidden md:block" /> All Rights Reserved.
          </p>
        </div>
        
        <div className="col-span-1 flex flex-col gap-3">
          <h4 className="font-display text-title-md text-on-surface mb-1 md:mb-2">Shop</h4>
          <Link href="/shop" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Shop All</Link>
          <Link href="/shop/baby" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Baby Apparel</Link>
          <Link href="/shop/jewellery" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Pearl Jewellery</Link>
        </div>
        
        <div className="col-span-1 flex flex-col gap-3">
          <h4 className="font-display text-title-md text-on-surface mb-1 md:mb-2">About</h4>
          <Link href="/story" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Our Heritage</Link>
          <Link href="#" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Sustainability</Link>
        </div>
        
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3 mt-2 md:mt-0">
          <h4 className="font-display text-title-md text-on-surface mb-1 md:mb-2">Help</h4>
          <Link href="#" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Shipping & Returns</Link>
          <Link href="#" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Contact Us</Link>
          <Link href="#" className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
