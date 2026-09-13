import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

const WEBHOOK_URL ="https://bc07-156-197-35-122.ngrok-free.app/webhook/ec4d4d46-b55c-4791-bca5-778612e8f75b";
// const WEBHOOK_URL ="https://bc07-156-197-35-122.ngrok-free.app/webhook-test/ec4d4d46-b55c-4791-bca5-778612e8f75b";

function getSessionId() {
  const key = "travalo_support_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content:
        "Hi! I'm Travalo's support assistant — ask me about your bookings, account, or how the app works.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const sessionId = useRef(getSessionId());
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

const handleSend = async () => {
  const text = input.trim();
  if (!text || isSending) return;
  setMessages((prev) => [...prev, { role: "user", content: text }]);
  setInput("");
  setIsSending(true);
  setError(null);
  try {
    const { data } = await axios.post(
      WEBHOOK_URL,
      {
        message: text,
        sessionId: sessionId.current,
        session_id: sessionId.current,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    let responseData = Array.isArray(data) ? data[0] : data;
    let cleanReply = "";
    if (typeof responseData === "object" && responseData !== null) {
      cleanReply = responseData.reply || responseData.output || "";
    } else {
      cleanReply = String(responseData);
    }
    if (typeof cleanReply === "string" && cleanReply.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(cleanReply);
        cleanReply = parsed.reply || parsed.output || cleanReply;
      } catch (e) {}
    }
    setMessages((prev) => [
      ...prev,
      { role: "agent", content: cleanReply },
    ]);
  } catch (err) {
    setError("Something went wrong — try sending that again.");
  } finally {
    setIsSending(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="page-wrapper">
      <div className="chat-card">
                <header className="chat-header">
          <h1>Chat  with  us</h1>
          <p>Usually replies in a few seconds</p>
        </header>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message-row ${m.role === "user" ? "user-row" : "agent-row"}`}
            >
              <div className={`message-bubble ${m.role === "user" ? "user-bubble" : "agent-bubble"}`}>
                {m.content}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="message-row agent-row">
              <div className="message-bubble agent-bubble typing">
                Typing...
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            rows={4}
            className="chat-textarea"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="chat-send-btn"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}