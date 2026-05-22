import { Resend } from "resend";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const { name, email, mobile, message } = JSON.parse(event.body);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

   const data = await resend.emails.send({
      from: "Madhumitha Portfolio <Portfolio@resend.dev>",
      to: "gmadhumitha.official@gmail.com",
      subject: `Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

 if (data.error) {
      console.error("⚠️ Resend API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "⚠️ API error" })
      };
    }

    console.log("✅ Email sent successfully:", data.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "✅ Message sent successfully!!" })
    };

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "❌ Failed to send message.." })
    };
  }
}