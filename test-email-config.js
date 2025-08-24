const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmailConfiguration() {
  console.log("Testing email configuration...\n");

  const emailService = process.env.EMAIL_SERVICE || "resend";
  console.log(`Email service: ${emailService}\n`);

  if (emailService === "smtp") {
    console.log("Testing SMTP configuration...");
    console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
    console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
    console.log(`SMTP User: ${process.env.SMTP_USER}`);
    console.log(
      `SMTP Pass: ${process.env.SMTP_PASS ? "[SET]" : "[NOT SET]"}\n`
    );

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      // Verify SMTP connection
      await transporter.verify();
      console.log("✅ SMTP connection verified successfully!");

      // Send test email
      const testEmail = {
        from: `"Easeway Medicare Test" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "SMTP Email Test - Easeway Medicare",
        html: `
          <h2>SMTP Email Test</h2>
          <p>If you receive this email, your SMTP configuration is working correctly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        `,
      };

      const result = await transporter.sendMail(testEmail);
      console.log("✅ Test email sent successfully!");
      console.log(`Message ID: ${result.messageId}`);
    } catch (error) {
      console.error("❌ SMTP configuration failed:");
      console.error(error.message);
    }
  } else {
    console.log("Testing Resend configuration...");
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const result = await resend.emails.send({
        from: "Easeway Medicare Test <bookings@easeway-medicare.co.uk>",
        to: [process.env.ADMIN_EMAIL],
        subject: "Resend Email Test - Easeway Medicare",
        html: `
          <h2>Resend Email Test</h2>
          <p>If you receive this email, your Resend configuration is working correctly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        `,
      });

      console.log("✅ Test email sent successfully via Resend!");
      console.log(`Email ID: ${result.data?.id}`);
    } catch (error) {
      console.error("❌ Resend configuration failed:");
      console.error(error.message);
    }
  }
}

testEmailConfiguration().catch(console.error);
