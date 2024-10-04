import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter object with SMTP configuration
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // you can use any email service (SendGrid, Mailgun, etc.)
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or an app-specific password
      },
    });

    try {
      // Send the email
      let info = await transporter.sendMail({
        from: `"${name}" <${email}>`, // sender address
        to: process.env.EMAIL_TO, // receiver address
        subject: 'New message from your app', // Subject line
        text: message, // plain text body
        html: `<b>${message}</b>`, // HTML body content
      });

      res.status(200).json({ success: true, info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
