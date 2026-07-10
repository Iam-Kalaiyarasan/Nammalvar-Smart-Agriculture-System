import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CropPrediction.css";

function CropPrediction() {

    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const predictCrop = async () => {

        if (!city.trim()) {
            alert("Please enter a city.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/prediction/crop/",
                {
                    city: city
                }
            );

            setResult(response.data);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.error || "Prediction Failed");
            } else {
                alert("Unable to connect to server.");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="prediction-container">

            <h1>🌾 AI Crop Prediction</h1>

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button onClick={predictCrop}>
                    Predict Crop
                </button>

            </div>

            {loading && (

                <div className="loading">
                    Analyzing weather and generating AI recommendation...
                </div>

            )}

            {result && (

                <>

                    <div className="grid">

                        <div className="card">

                            <h2>🌤 Live Weather</h2>

                            <p><b>City:</b> {result.city}</p>
                            <p><b>Temperature:</b> {result.temperature} °C</p>
                            <p><b>Humidity:</b> {result.humidity}%</p>
                            <p><b>Rainfall:</b> {result.rainfall} mm</p>
                            <p><b>Wind Speed:</b> {result.wind_speed} km/h</p>
                            <p><b>Pressure:</b> {result.pressure} hPa</p>
                            <p><b>Weather:</b> {result.weather}</p>

                        </div>

                        <div className="card">

                            <h2>🌱 Estimated Soil</h2>

                            <p><b>Type:</b> {result.soil_type}</p>
                            <p><b>pH:</b> {result.soil_ph}</p>
                            <p><b>Nitrogen:</b> {result.nitrogen}</p>
                            <p><b>Phosphorus:</b> {result.phosphorus}</p>
                            <p><b>Potassium:</b> {result.potassium}</p>

                        </div>

                    </div>

                    <div className="card">

                        <h2>🌾 AI Recommendation</h2>

                        <p>
                            <b>Recommended Crop:</b>{" "}
                            {result.recommended_crop}
                        </p>

                        <p><b>Alternative Crops:</b></p>

                        <ul>

                            {result.alternative_crops &&
                                result.alternative_crops.map((crop, index) => (

                                    <li key={index}>
                                        {crop}
                                    </li>

                                ))}

                        </ul>

                        <button
                            className="chat-btn"
                            onClick={() =>
                                navigate("/chatbot", {
                                    state: result
                                })
                            }
                        >
                            💬 Ask AI Assistant
                        </button>

                    </div>

                    <div className="grid">

                        <div className="card">

                            <h2>🧪 Fertilizer</h2>

                            <p>{result.fertilizer}</p>

                        </div>

                        <div className="card">

                            <h2>💧 Irrigation</h2>

                            <p>{result.irrigation}</p>

                        </div>

                    </div>

                    <div className="grid">

                        <div className="card">

                            <h2>📈 Expected Yield</h2>

                            <p>{result.expected_yield}</p>

                        </div>

                        <div className="card">

                            <h2>⚠ Disease Risk</h2>

                            <p>{result.disease_risk}</p>

                        </div>

                    </div>

                    <div className="card">

                        <h2>🎯 Confidence</h2>

                        <h3>{result.confidence}</h3>

                    </div>

                    <div className="card">

                        <h2>💡 AI Explanation</h2>

                        <p>{result.reason}</p>

                    </div>

                </>

            )}

        </div>

    );

}

export default CropPrediction;