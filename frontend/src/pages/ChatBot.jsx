import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ChatBot.css";

function ChatBot() {

    const location = useLocation();

    // If no prediction is passed, use an empty object
    const prediction = location.state || {};

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!question.trim()) {
            return;
        }

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/chatbot/ask/",
                {
                    city: prediction.city || "",

                    weather: {
                        temperature: prediction.temperature || "",
                        humidity: prediction.humidity || "",
                        rainfall: prediction.rainfall || "",
                        wind_speed: prediction.wind_speed || "",
                        pressure: prediction.pressure || ""
                    },

                    recommended_crop: prediction.recommended_crop || "",

                    question: question
                }
            );

            const botMessage = {
                sender: "bot",
                text: response.data.answer
            };

            setMessages((prev) => [...prev, botMessage]);

            setQuestion("");

        } catch (error) {

            console.log(error);

            alert("Unable to connect to AI Chatbot.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="chat-container">

            <h1>🤖 Nammalvar AI Assistant</h1>

            {prediction.city ? (

                <div className="prediction-info">

                    <h3>Current Prediction</h3>

                    <p>
                        <b>City:</b> {prediction.city}
                    </p>

                    <p>
                        <b>Recommended Crop:</b> {prediction.recommended_crop}
                    </p>

                </div>

            ) : (

                <div className="prediction-info">

                    <h3>General Agriculture Assistant</h3>

                    <p>
                        Ask any farming, crop, fertilizer, irrigation,
                        pest or disease related question.
                    </p>

                </div>

            )}

            <div className="chat-box">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.sender === "user"
                                ? "user-message"
                                : "bot-message"
                        }
                    >
                        <pre>{msg.text}</pre>
                    </div>

                ))}

                {loading && (

                    <div className="bot-message">

                        🤖 Thinking...

                    </div>

                )}

            </div>

            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Ask your agriculture question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            askAI();
                        }
                    }}
                />

                <button onClick={askAI}>
                    Send
                </button>

            </div>

            <div className="quick-buttons">

                <button
                    onClick={() => setQuestion("Why is this crop recommended?")}
                >
                    Why this crop?
                </button>

                <button
                    onClick={() => setQuestion("Which fertilizer should I use?")}
                >
                    Fertilizer
                </button>

                <button
                    onClick={() => setQuestion("How often should I irrigate?")}
                >
                    Irrigation
                </button>

                <button
                    onClick={() => setQuestion("What diseases should I monitor?")}
                >
                    Disease Risk
                </button>

                <button
                    onClick={() => setQuestion("How to improve soil fertility?")}
                >
                    Soil Health
                </button>

                <button
                    onClick={() => setQuestion("Best crop for summer season")}
                >
                    Best Crop
                </button>

            </div>

        </div>

    );

}

export default ChatBot;