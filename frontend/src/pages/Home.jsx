import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            <div className="hero">

                <h1>🌾 NAMMALVAR</h1>

                <h2>Smart Agriculture Platform</h2>

                <p>

                    AI Powered Crop Prediction,
                    Disease Detection,
                    Farmer Marketplace,
                    Weather Forecast,
                    and AI Farming Assistant.

                </p>

                <div className="hero-buttons">

                    <button
                        onClick={() => navigate("/")}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>

                </div>

            </div>

            <div className="features">

                <div className="feature-card">
                    🌱
                    <h3>Crop Prediction</h3>
                </div>

                <div className="feature-card">
                    🦠
                    <h3>Disease Detection</h3>
                </div>

                <div className="feature-card">
                    🛒
                    <h3>Marketplace</h3>
                </div>

                <div className="feature-card">
                    🌦
                    <h3>Weather Forecast</h3>
                </div>

                <div className="feature-card">
                    🤖
                    <h3>AI Chatbot</h3>
                </div>

                <div className="feature-card">
                    📦
                    <h3>Order Tracking</h3>
                </div>

            </div>

        </div>

    );

}

export default Home;