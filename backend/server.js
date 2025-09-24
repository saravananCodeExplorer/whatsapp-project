// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Twilio client setup
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// API route to send WhatsApp message
app.post("/send-message", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, error: "Recipient number and message are required" });
  }

  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Must include "whatsapp:" prefix
      to: `whatsapp:${to}`,                      // Recipient number with country code
      body: message,
    });

    res.json({ success: true, sid: response.sid });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback port if not set in .env
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
