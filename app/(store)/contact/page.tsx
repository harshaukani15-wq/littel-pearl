import { Metadata } from 'next'
import { getStoreSettings } from '@/app/actions/settings'

export const metadata: Metadata = {
  title: 'Contact Us | Little Pearl',
  description: 'Get in touch with the Little Pearl team.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const settings = await getStoreSettings()
  const contactEmail = settings?.contact_email || 'support@littlepearl.in'
  const contactPhone = settings?.contact_phone || '+91 98765 43210'
  const contactFormEmail = process.env.CONTACT_FORM_EMAIL || 'harshaukani15@gmail.com'
  const contactTiming = settings?.contact_timing || 'Mon-Fri, 9am - 6pm IST'
  const contactHeading = settings?.contact_heading || "We'd love to hear from you. Whether you have a question about our products, need help with an order, or just want to say hello, our team is ready to assist."

  // Determine if the form was successfully submitted
  const params = await searchParams
  const isSuccess = params?.success === 'true'

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-8 md:mb-12 text-center">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-body-lg text-on-surface-variant">
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Get in Touch</h2>
            <p className="mb-6 whitespace-pre-wrap">
              {contactHeading}
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-label text-label-caps text-on-surface">Email</h3>
                <p>{contactEmail}</p>
              </div>
              
              {/* 
              <div>
                <h3 className="font-label text-label-caps text-on-surface">Phone</h3>
                <p>{contactPhone}</p>
                <p className="text-body-sm mt-1">{contactTiming}</p>
              </div> 
              */}
            </div>
          </div>
          
          <div className="bg-surface-container rounded-xl p-6 md:p-8 border border-outline-variant/30">
            <h2 className="font-display text-title-lg text-on-surface mb-6">Send a Message</h2>
            
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm mt-1">We will get back to you shortly.</p>
              </div>
            ) : null}

            <form action={`https://formsubmit.co/${contactFormEmail}`} method="POST" className="space-y-4">
              <input type="hidden" name="_next" value="https://littel-pearl.vercel.app/contact?success=true" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Contact Form Submission - Little Pearl" />
              
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium mb-1">Name</label>
                <input type="text" id="name" name="name" required className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  required 
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary invalid:focus:border-error" 
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-body-sm font-medium mb-1">Mobile Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="e.g. 9876543210"
                  pattern="^[6-9]\d{9}$"
                  title="Please enter a valid 10-digit Indian mobile number"
                  required 
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary invalid:focus:border-error" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-body-sm font-medium mb-1">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
