import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Check if required environment variables are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      return res.status(500).json({ success: false, message: 'Missing email configuration' });
    }

    // Create a transporter object with SMTP configuration
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use Gmail or any other email service like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address from the environment variable
        pass: process.env.EMAIL_PASS, // your Gmail password or app-specific password
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('Server is ready to send emails');
      }
    });
    

    try {
      // Send the email
      let info = await transporter.sendMail({
        from: `"${name}" <${email}>`, // sender address
        to: process.env.EMAIL_TO, // receiver email from the environment variable
        subject: 'New message from your app', // Subject line
        text: message, // plain text body
        html: `<b>${message}</b>`, // HTML body content
      });

      res.status(200).json({ success: true, info });
    } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
