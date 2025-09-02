import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Update this path if your public folder structure is different.
const CHATBOT_ICON = "/chatbot_icon2.png";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { role: "user", content: trimmedInput }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/chat",
        { message: trimmedInput },
        { headers: { "Content-Type": "application/json" } }
      );

      const botReply = res.data?.reply || "Sorry, no response received.";
      setMessages([...newMessages, { role: "bot", content: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "bot", content: "Error: Could not get response." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // When chatbot is closed, show just the icon
  if (!open) {
    return (
      <div 
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 1000,
          cursor: "pointer",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          background: "#fff",
          padding: "10px"
        }}
        onClick={() => setOpen(true)}
        title="Open Chatbot"
      >
        <img 
          src={CHATBOT_ICON} 
          alt="Chatbot Icon" 
          style={{ width: "56px", height: "56px" }} 
        />
      </div>
    );
  }

  // When chatbot is open, show the chat window
  return (
    <div 
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "360px",
        fontFamily: "Arial, sans-serif",
        zIndex: 1000,
        boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
        borderRadius: "20px",
        background: "#fff"
      }}
    >
      {/* Header */}
      <div style={{
        background: "#4f46e5",
        color: "white",
        padding: "16px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={CHATBOT_ICON} alt="Chatbot" style={{ width: "34px", height: "34px", marginRight: "12px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.05rem" }}>Smart Email Assistant</span>
        </div>
        <button 
          onClick={() => setOpen(false)} 
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1.25rem",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          title="Close"
        >×</button>
      </div>

      {/* Chat messages */}
      <div
        style={{
          minHeight: "330px",
          maxHeight: "330px",
          borderBottom: "1px solid #eee",
          padding: "10px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#aaa", textAlign: "center", marginTop: "80px" }}>
            <img src={CHATBOT_ICON} alt="Chatbot" style={{ width: "44px", opacity: 0.4, marginBottom: "10px" }} />
            <div>Hi, how can I help you today?</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "10px 0" }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "16px",
                backgroundColor: msg.role === "user" ? "#4f46e5" : "#e5e7eb",
                color: msg.role === "user" ? "white" : "black",
                maxWidth: "80%",
                wordBreak: "break-word",
                fontSize: "0.99rem"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{ display: "flex", padding: "10px 12px", background: "#fff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={{ 
            flex: 1, 
            padding: "11px", 
            borderRadius: "18px", 
            border: "1px solid #ccc", 
            outline: "none",
            fontSize: "1rem"
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          style={{
            marginLeft: "8px",
            padding: "10px 20px",
            borderRadius: "18px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: input.trim() ? "pointer" : "not-allowed",
            fontSize: "1rem"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}