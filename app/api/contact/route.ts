import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Send email via Resend (or your preferred provider)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: 'hello@lumiere-beauty.com',
    //   subject: `Contact Form: ${subject}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    // });

    // For now, log the submission
    console.log('[Contact Form]', { name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will respond within 24 hours.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
