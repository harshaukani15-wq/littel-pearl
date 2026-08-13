'use server'

import nodemailer from 'nodemailer'

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Simple validation
  if (!name || !email || !phone || !message) {
    return { error: 'All fields are required.' }
  }

  // Get credentials from environment
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    console.error('Email credentials are not configured. Please add EMAIL_USER and EMAIL_PASS to your .env file.')
    return { error: 'Server configuration error. Please contact the administrator.' }
  }

  try {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    })

    // Prepare the email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Inquiry</h2>
        
        <p style="color: #334155; font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="color: #334155; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="color: #334155; font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
        
        <h3 style="color: #0f172a; margin-top: 24px;">Message:</h3>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #cbd5e1;">
          <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `

    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Little Pearl Contact Form" <${user}>`, // Sender address
      to: user, // Send to the admin's own email (or replace with contact_email setting)
      replyTo: email, // If admin clicks "Reply", it goes to the customer
      subject: `New Inquiry from ${name}`, // Subject line
      html: htmlContent, // HTML body
    })

    return { success: 'Your message has been sent successfully. We will get back to you soon!' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send message. Please try again later.' }
  }
}
