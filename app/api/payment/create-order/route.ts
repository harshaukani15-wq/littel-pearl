import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
// import Razorpay from 'razorpay'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, amount } = body

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // IMPORTANT: Server-side validation of amount should happen here by recalculating
    // the cart total against the database prices before trusting the client amount.

    /*
    // =========================================================================
    // RAZORPAY INTEGRATION POINT
    // =========================================================================
    // 1. Initialize Razorpay (ensure keys are in .env.local and NOT NEXT_PUBLIC_)
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // 2. Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${orderId}`,
    }

    const rpOrder = await razorpay.orders.create(options)
    
    // 3. Store the Razorpay order ID in your database against the local order
    await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        razorpay_order_id: rpOrder.id,
        amount: amount,
        currency: 'INR',
        method: 'razorpay'
      })

    // 4. Return the order ID to the client to initialize the SDK
    return NextResponse.json({ 
      id: rpOrder.id,
      currency: rpOrder.currency,
      amount: rpOrder.amount 
    })
    */

    // Placeholder response until Razorpay is configured
    return NextResponse.json({
      message: 'Payment integration point reached. Configure Razorpay keys to enable real payments.',
      placeholder: true,
      amount: amount
    })

  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
