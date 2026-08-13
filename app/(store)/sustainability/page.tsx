import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sustainability | Little Pearl',
  description: 'Our commitment to sustainable and ethical practices.',
}

export default function SustainabilityPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-8 md:mb-12 text-center">
          Our Commitment to Sustainability
        </h1>
        
        <div className="prose prose-stone dark:prose-invert max-w-none font-body text-body-lg text-on-surface-variant space-y-8">
          <p>
            At Little Pearl, we believe that the beauty of our products should never come at the expense of our planet. Our commitment to sustainability is woven into every aspect of our business, from the sourcing of our materials to our packaging.
          </p>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Ethical Sourcing</h2>
            <p>
              Our pearls are carefully sourced from certified, sustainable farms that prioritize the health of marine ecosystems. We work closely with our partners to ensure fair labor practices and environmental responsibility.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Organic Fabrics</h2>
            <p>
              For our baby apparel, we exclusively use GOTS-certified organic cotton and natural linens. These materials are grown without harmful pesticides, ensuring they are gentle on your baby's delicate skin and better for the earth.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Eco-Friendly Packaging</h2>
            <p>
              We have eliminated single-use plastics from our packaging. Every Little Pearl order arrives in beautiful, recyclable, and biodegradable materials designed to minimize our carbon footprint while providing a premium unboxing experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
