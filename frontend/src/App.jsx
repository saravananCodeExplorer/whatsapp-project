import { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-message", {
        to,
        message,
      });
      setStatus("✅ Message sent! SID: " + res.data.sid);
    } catch (err) {
  if (err.response) {
    // Server responded with error
    setStatus("❌ Error: " + err.response.data.error);
  } else if (err.request) {
    // Request made but no response
    setStatus("⚠️ No response from server. Check if backend is running.");
  } else {
    // Something else happened
    setStatus("❌ Error: " + err.message);
  }
}

  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📲 WhatsApp Message Sender</h1>
      <input
        type="text"
        placeholder="Recipient Number (e.g. +919876543210)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: "300px", padding: "8px", margin: "5px" }}
      />
      <br />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "300px", height: "100px", padding: "8px", margin: "5px" }}
      />
      <br />
      <button
        onClick={sendMessage}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Send
      </button>
      <p>{status}</p>
    </div>
  );
}

export default App;
