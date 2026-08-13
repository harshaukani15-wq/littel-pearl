'use client'

interface ContactFormProps {
  targetEmail: string
}

export function ContactForm({ targetEmail }: ContactFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')

    const subject = encodeURIComponent(`New Inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMobile: ${phone}\n\nMessage:\n${message}`)
    
    // Use JS to open the user's default email client
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label uppercase tracking-wider hover:bg-primary/90 transition-colors">
        Send Message
      </button>
    </form>
  )
}
