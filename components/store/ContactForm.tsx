'use client'

import { useActionState } from 'react'
import { sendContactEmail } from '@/app/actions/contact'
import { Loader2, CheckCircle2 } from 'lucide-react'

// Using useFormStatus from react-dom
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-primary text-on-primary py-3 rounded-lg font-label uppercase tracking-wider hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, null)

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg mb-6 flex flex-col items-center text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
        <h3 className="text-xl font-medium mb-1">Thank You!</h3>
        <p className="text-sm">{state.success}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 text-sm font-medium text-green-700 hover:text-green-900 underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}

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
          placeholder="0000000000"
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

      <SubmitButton />
    </form>
  )
}
