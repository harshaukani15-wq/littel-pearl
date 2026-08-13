import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Little Pearl',
  description: 'Our privacy policy and how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-display-md md:text-display-lg text-on-surface mb-8 md:mb-12 text-center">
          Privacy Policy
        </h1>
        
        <div className="prose prose-stone dark:prose-invert max-w-none font-body text-body-lg text-on-surface-variant space-y-8">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          
          <p>
            At Little Pearl, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from littlepearl.in.
          </p>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Personal Information We Collect</h2>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">How Do We Use Your Personal Information?</h2>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Sharing Your Personal Information</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. We use Supabase to power our backend and database. We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </div>
          
          <div>
            <h2 className="font-display text-headline-sm text-on-surface mb-4">Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@littlepearl.in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
