import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CropPrediction.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const PRESET_CITIES = ["Coimbatore", "Chennai", "Thanjavur", "Madurai", "Salem", "Trichy"];

function CropPrediction() {
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const predictCrop = async (targetCity = city) => {
        const queryCity = targetCity || city;
        if (!queryCity.trim()) {
            alert("Please enter a city name.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/prediction/crop/`,
                { city: queryCity }
            );
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to generate AI prediction. Please verify connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prediction-page-container fade-in">
            <div className="prediction-hero-box">
                <h1>🌱 AI Crop Suitability Prediction</h1>
                <p>Real-time microclimate analysis, soil estimation, & AI crop recommendation engine</p>
            </div>

            <div className="city-search-card">
                <div className="city-input-group">
                    <input
                        type="text"
                        placeholder="Enter City / District (e.g. Coimbatore, Thanjavur)..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && predictCrop()}
                    />
                    <button className="btn-predict-action" onClick={() => predictCrop()} disabled={loading}>
                        {loading ? "Analyzing..." : "⚡ Run AI Prediction"}
                    </button>
                </div>

                <div className="quick-city-chips">
                    <span>Popular Agricultural Hubs:</span>
                    {PRESET_CITIES.map((c) => (
                        <span key={c} className="city-chip" onClick={() => { setCity(c); predictCrop(c); }}>
                            📍 {c}
                        </span>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="no-products-state fade-in">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }} className="pulse">🌤️</div>
                    <h3>Fetching Live Weather & Soil Parameters...</h3>
                    <p style={{ color: "#64748b" }}>Analyzing temperature, humidity, rainfall, and nutrient ratios via Gemini AI...</p>
                </div>
            )}

            {result && (
                <div className="fade-in">
                    <div className="ai-recommendation-hero-card">
                        <div>
                            <span className="rec-title-tag">✨ Recommended Primary Crop</span>
                            <div className="rec-crop-name">{result.recommended_crop}</div>
                            <p style={{ color: "#a7f3d0", fontSize: "0.95rem" }}>
                                Alternative Crops: {Array.isArray(result.alternative_crops) ? result.alternative_crops.join(", ") : "N/A"}
                            </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div className="rec-confidence-badge">🎯 Match: {result.confidence}</div>
                            <button
                                className="cart-btn-primary"
                                style={{ marginTop: "1rem", background: "white", color: "#0f5132" }}
                                onClick={() => navigate("/chatbot", { state: result })}
                            >
                                💬 Ask AI Assistant
                            </button>
                        </div>
                    </div>

                    <div className="prediction-results-grid">
                        <div className="res-data-card">
                            <h3 className="res-card-title">🌤 Live Weather ({result.city})</h3>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Temperature:</span>
                                <span className="data-metric-val">{result.temperature} °C</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Humidity:</span>
                                <span className="data-metric-val">{result.humidity}%</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Rainfall:</span>
                                <span className="data-metric-val">{result.rainfall} mm</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Wind Speed:</span>
                                <span className="data-metric-val">{result.wind_speed} km/h</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Weather Condition:</span>
                                <span className="data-metric-val">{result.weather}</span>
                            </div>
                        </div>

                        <div className="res-data-card">
                            <h3 className="res-card-title">🧪 Soil & Nutrient Profile</h3>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Soil Type:</span>
                                <span className="data-metric-val">{result.soil_type}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">pH Value:</span>
                                <span className="data-metric-val">{result.soil_ph}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Nitrogen (N):</span>
                                <span className="data-metric-val">{result.nitrogen}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Phosphorus (P):</span>
                                <span className="data-metric-val">{result.phosphorus}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Potassium (K):</span>
                                <span className="data-metric-val">{result.potassium}</span>
                            </div>
                        </div>

                        <div className="res-data-card">
                            <h3 className="res-card-title">📊 Yield & Risk Analysis</h3>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Recommended Fertilizer:</span>
                                <span className="data-metric-val">{result.fertilizer}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Irrigation Requirement:</span>
                                <span className="data-metric-val">{result.irrigation}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Expected Yield:</span>
                                <span className="data-metric-val">{result.expected_yield}</span>
                            </div>
                            <div className="data-metric-row">
                                <span className="data-metric-label">Pest & Disease Risk:</span>
                                <span className="data-metric-val" style={{ color: "#ef4444" }}>{result.disease_risk}</span>
                            </div>
                        </div>
                    </div>

                    <div className="res-data-card" style={{ marginBottom: "2rem" }}>
                        <h3 className="res-card-title">💡 AI Rationale & Advisory</h3>
                        <p style={{ color: "#475569", lineHeight: "1.7", fontSize: "0.95rem" }}>
                            {result.reason}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CropPrediction;