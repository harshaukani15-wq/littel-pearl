import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { STORE_NAME } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function CheckoutPage() {
  const subtotal = 0
  const total = subtotal

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        
        <h1 className="font-display text-display-lg-mobile md:text-headline-md text-on-surface mb-8 text-center md:text-left">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          {/* Checkout Steps */}
          <div className="w-full lg:w-3/5 space-y-10">
            
            {/* Step 1: Contact */}
            <section>
              <h2 className="font-display text-headline-sm text-on-surface mb-4 pb-2 border-b border-outline-variant/30 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-body text-body-sm text-on-surface">Email Address</label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-body-sm text-on-surface">Phone Number</label>
                  <Input type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
            </section>

            {/* Step 2: Address */}
            <section>
              <h2 className="font-display text-headline-sm text-on-surface mb-4 pb-2 border-b border-outline-variant/30 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant text-sm">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-body text-body-sm text-on-surface">Full Name</label>
                  <Input type="text" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-body text-body-sm text-on-surface">Address Line 1</label>
                    <Input type="text" placeholder="Street address, house number" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-body text-body-sm text-on-surface">Address Line 2 (Optional)</label>
                    <Input type="text" placeholder="Apartment, suite, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-body-sm text-on-surface">City</label>
                    <Input type="text" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-body-sm text-on-surface">State</label>
                    <Input type="text" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-body-sm text-on-surface">PIN Code</label>
                    <Input type="text" placeholder="400001" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section>
              <h2 className="font-display text-headline-sm text-on-surface mb-4 pb-2 border-b border-outline-variant/30 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant text-sm">3</span>
                Payment
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-4 p-4 border border-primary rounded-lg bg-primary-container/20 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="mt-1 w-4 h-4 text-primary focus:ring-primary accent-primary" />
                  <div>
                    <span className="font-body text-body-md text-on-surface font-medium block">Pay via Razorpay</span>
                    <span className="font-body text-body-sm text-on-surface-variant">UPI, Credit/Debit Cards, NetBanking, Wallets</span>
                  </div>
                </label>
                
                <label className="flex items-start gap-4 p-4 border border-outline-variant/50 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  <input type="radio" name="payment" className="mt-1 w-4 h-4 text-primary focus:ring-primary accent-primary" />
                  <div>
                    <span className="font-body text-body-md text-on-surface font-medium block">Cash on Delivery (COD)</span>
                    <span className="font-body text-body-sm text-on-surface-variant">Pay in cash upon delivery</span>
                  </div>
                </label>
              </div>

              <div className="mt-10">
                <Button size="lg" className="w-full md:w-auto py-6 px-12 text-base">Place Order</Button>
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-2/5 mt-10 lg:mt-0">
            <div className="bg-surface-container rounded-xl p-6 lg:p-8 sticky top-24">
              <h3 className="font-display text-headline-sm text-on-surface mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-outline-variant/30">
                {/* Mock item for visual purposes */}
                <div className="flex gap-4">
                  <div className="relative w-16 aspect-[4/5] bg-surface-variant rounded-md overflow-hidden shrink-0">
                    {/* Placeholder image */}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-body text-body-sm text-on-surface line-clamp-1">Placeholder Item</h4>
                    <p className="font-body text-xs text-on-surface-variant">Qty: 1</p>
                  </div>
                  <div className="font-body text-body-sm text-on-surface font-medium self-center">
                    {formatCurrency(0)}
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 font-body text-body-md text-on-surface mb-6">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-outline-variant/30 font-medium">
                  <span>Total</span>
                  <span className="text-primary text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
