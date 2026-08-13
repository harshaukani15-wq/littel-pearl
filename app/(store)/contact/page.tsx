import { Metadata } from 'next'
import { getStoreSettings } from '@/app/actions/settings'
import { ContactForm } from '@/components/store/ContactForm'

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
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
