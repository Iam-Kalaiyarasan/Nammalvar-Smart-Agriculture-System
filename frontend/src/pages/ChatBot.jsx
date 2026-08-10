import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ChatBot.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function ChatBot() {
    const location = useLocation();
    const prediction = location.state || {};

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: prediction.recommended_crop
                ? `👋 Hello! I see you generated a prediction for ${prediction.city} recommending ${prediction.recommended_crop}. How can I assist with your farming plans today?`
                : "👋 Hello! I am your Nammalvar AI Agriculture Assistant. Ask me anything about crop planning, fertilizers, pest control, or weather management!",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const askAI = async (queryText = question) => {
        const textToSend = queryText || question;
        if (!textToSend.trim()) return;

        const userMessage = { sender: "user", text: textToSend };
        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/chatbot/ask/`, {
                city: prediction.city || "",
                weather: {
                    temperature: prediction.temperature || "",
                    humidity: prediction.humidity || "",
                    rainfall: prediction.rainfall || "",
                    wind_speed: prediction.wind_speed || "",
                    pressure: prediction.pressure || "",
                },
                recommended_crop: prediction.recommended_crop || "",
                question: textToSend,
            });

            const botMessage = { sender: "bot", text: response.data.answer };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Unable to connect to AI Assistant. Please check backend API server." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-page-container fade-in">
            <div className="chatbot-header-card">
                <div className="chatbot-header-info">
                    <h2>🤖 Nammalvar AI Agricultural Assistant</h2>
                    <p>Powered by Google Gemini AI for Smart Farming Advisory</p>
                </div>
                <div className="ai-engine-badge">⚡ Gemini 2.0 Engine Online</div>
            </div>

            <div className="chat-messages-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`msg-row ${msg.sender} fade-in`}>
                        <div className={`msg-avatar ${msg.sender}`}>
                            {msg.sender === "user" ? "👨‍🌾" : "🤖"}
                        </div>
                        <div className="msg-bubble">{msg.text}</div>
                    </div>
                ))}

                {loading && (
                    <div className="msg-row bot fade-in">
                        <div className="msg-avatar bot">🤖</div>
                        <div className="msg-bubble" style={{ color: "#64748b" }}>
                            Thinking & calculating agronomic advice...
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-bar">
                <input
                    type="text"
                    placeholder="Ask any farming, crop, or fertilizer question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAI()}
                />
                <button className="btn-send-chat" onClick={() => askAI()} disabled={loading}>
                    Send 🚀
                </button>
            </div>

            <div className="quick-prompts-row">
                <button className="prompt-chip-btn" onClick={() => askAI("Which fertilizer should I use for paddy?")}>
                    🧪 Paddy Fertilizer Guide
                </button>
                <button className="prompt-chip-btn" onClick={() => askAI("How often should I irrigate tomato crops in summer?")}>
                    💧 Irrigation Frequency
                </button>
                <button className="prompt-chip-btn" onClick={() => askAI("How to prevent leaf curl in chilli plants?")}>
                    🦠 Leaf Curl Prevention
                </button>
                <button className="prompt-chip-btn" onClick={() => askAI("Best organic pesticides for vegetables?")}>
                    🌿 Organic Pest Control
                </button>
                <button className="prompt-chip-btn" onClick={() => askAI("How to test and improve soil pH?")}>
                    🧪 Soil pH Improvement
                </button>
            </div>
        </div>
    );
}

export default ChatBot;