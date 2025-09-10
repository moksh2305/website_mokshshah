import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve HTML

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "moksh230305@gmail.com", // your Gmail
        pass: "yebv suvo lcmt tsau", // ⚠️ Gmail App Password
      },
    });

    const mailOptions = {
      from: email,
      to: "moksh230305@gmail.com",
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
