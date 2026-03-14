import "dotenv/config";
import nodemailer from "nodemailer";

// Re-create your transporter exactly as it is in your main auth file
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // This is the magic line for Plesk/cPanel servers
    rejectUnauthorized: false,
  },
});

async function testEmailConnection() {
  console.log("Email User: ", process.env.EMAIL_USER);
  console.log("Email Pass: ", process.env.EMAIL_PASSWORD);
  console.log("Email Host: ", process.env.EMAIL_HOST);
  console.log("Email Port: ", process.env.EMAIL_PORT);

  console.log("Testing email transporter connection...");

  try {
    // 1. Verify the connection configuration
    const isVerified = await transporter.verify();
    console.log(
      "✅ Server is ready to take our messages. Verification status:",
      isVerified,
    );

    // 2. Send a test email
    console.log("Sending a test email...");
    const info = await transporter.sendMail({
      from: '"AllTerra Global" <info@allterraglobal.com>', // Make sure the 'from' domain matches your authenticated user
      to: "test-v09h59sni@srv1.mail-tester.com", // Send it to yourself for the test
      subject: "Test Email from Nodemailer",
      text: "Hello! If you are reading this, your Nodemailer transporter is working perfectly.",
      html: "<p>Hello! If you are reading this, your <b>Nodemailer</b> transporter is working perfectly.</p>",
    });

    console.log("✅ Test email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Email transporter test failed:");
    console.error(error);
  }
}

// Execute the test
testEmailConnection();
