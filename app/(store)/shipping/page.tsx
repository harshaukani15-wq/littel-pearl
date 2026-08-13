import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns | Little Pearl',
  description: 'Information about shipping times, costs, and our return policy.',
}

export default function ShippingPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-8 md:mb-12 text-center">
          Shipping & Returns
        </h1>
        
        <div className="prose prose-stone dark:prose-invert max-w-none font-body text-body-lg text-on-surface-variant space-y-8">
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Domestic Shipping</h2>
            <p>
              We offer free standard shipping on all orders over ₹2000 within India. For orders under ₹2000, a flat rate of ₹150 applies. 
              Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available for ₹300 at checkout.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">International Shipping</h2>
            <p>
              We currently ship to select international destinations. Shipping rates and delivery times are calculated at checkout based on your location. Please note that international customers are responsible for any customs duties or taxes applied by their local authorities.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Returns Policy</h2>
            <p>
              We want you to be completely satisfied with your Little Pearl purchase. We accept returns within 7 days of delivery for unworn, unwashed items in their original condition with all tags attached. 
            </p>
            <p className="mt-4">
              Please note that for hygiene reasons, earrings and customized items cannot be returned unless faulty.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">How to Return</h2>
            <p>
              To initiate a return, please visit our <a href="/contact" className="text-primary hover:underline">Contact Us</a> page or email support@littlepearl.in with your order number. We will provide you with a return shipping label and instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
