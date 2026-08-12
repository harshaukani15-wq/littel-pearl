import Image from 'next/image'

export default function StoryPage() {
  return (
    <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-8 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="font-display text-3xl md:text-display-lg text-primary mb-4 md:mb-6">Our Story</h1>
        <p className="font-body text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
          Little Pearl was born from a simple desire: to create clothing and accessories for little ones that are as pure and precious as they are.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-elevation-1">
          <div className="absolute inset-0 bg-secondary/20"></div>
          {/* Placeholder for actual image */}
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant font-display text-headline-md">
            Our Beginnings
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="font-display text-headline-lg text-on-surface">The Inspiration</h2>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            When I became a mother, I struggled to find premium, ethically made clothing that celebrated the innocence of childhood while maintaining a timeless aesthetic. I wanted fabrics that were incredibly soft against delicate skin, and designs that could be passed down through generations.
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            That search led to the creation of Little Pearl. We source only the finest organic cottons, softest linens, and ethically harvested pearls to craft pieces that are designed to be loved, worn, and cherished.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="font-display text-headline-lg text-on-surface">Our Commitment</h2>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Every piece in our collection is crafted with meticulous attention to detail by skilled artisans. We believe in slow fashion—creating fewer, better things that stand the test of time.
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Our pearls, specifically chosen for their delicate luster, are meant to be a child's first heirloom. We invite you to explore our collection and find the perfect piece for your little pearl.
          </p>
        </div>
        
        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-elevation-1 order-1 md:order-2">
          <div className="absolute inset-0 bg-primary/20"></div>
          {/* Placeholder for actual image */}
          <div className="absolute inset-0 flex items-center justify-center text-primary font-display text-headline-md">
            Our Craft
          </div>
        </div>
      </div>
    </div>
  )
}
