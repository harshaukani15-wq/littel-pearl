import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Little Pearl',
  description: 'Get in touch with the Little Pearl team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-8 md:mb-12 text-center">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-body-lg text-on-surface-variant">
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Get in Touch</h2>
            <p className="mb-6">
              We'd love to hear from you. Whether you have a question about our products, need help with an order, or just want to say hello, our team is ready to assist.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-label text-label-caps text-on-surface">Email</h3>
                <p>support@littlepearl.in</p>
              </div>
              
              <div>
                <h3 className="font-label text-label-caps text-on-surface">Phone</h3>
                <p>+91 98765 43210</p>
                <p className="text-body-sm mt-1">Mon-Fri, 9am - 6pm IST</p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container rounded-xl p-6 md:p-8 border border-outline-variant/30">
            <h2 className="font-display text-title-lg text-on-surface mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium mb-1">Name</label>
                <input type="text" id="name" className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium mb-1">Email</label>
                <input type="email" id="email" className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-body-sm font-medium mb-1">Message</label>
                <textarea id="message" rows={4} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"></textarea>
              </div>
              <button type="button" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
