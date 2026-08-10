import { useState } from "react";
import axios from "axios";
import "./DiseaseDetection.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function DiseaseDetection() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const detectDisease = async () => {
        if (!image) {
            alert("Please upload or select a leaf image to scan.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/disease/detect/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Disease detection scan failed. Please check server connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="disease-page-container fade-in">
            <div className="disease-hero-box">
                <h1>🦠 AI Crop Disease Diagnostic Scanner</h1>
                <p>Upload a photo of an infected leaf or plant for instant AI diagnosis & remedy guide</p>
            </div>

            <div className="dropzone-card">
                <div className="dropzone-icon">📷</div>
                <div className="dropzone-text">
                    <h3>Click or Drag & Drop Leaf Photo Here</h3>
                    <p>Supports JPG, PNG, WEBP (Max 10MB)</p>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="dropzone-input-hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
            </div>

            {preview && (
                <div className="disease-preview-wrapper fade-in">
                    <img src={preview} alt="Leaf Preview" className="disease-preview-img" />
                    {loading && <div className="scan-laser-line"></div>}
                </div>
            )}

            {preview && (
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <button className="btn-predict-action" onClick={detectDisease} disabled={loading}>
                        {loading ? "Scanning Leaf Features..." : "⚡ Run AI Disease Scan"}
                    </button>
                </div>
            )}

            {loading && (
                <div className="no-products-state fade-in">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }} className="pulse">🤖</div>
                    <h3>Gemini AI Analyzing Leaf Microstructures...</h3>
                    <p style={{ color: "#64748b" }}>Detecting visual pathogens, chlorosis patterns, and lesion margins...</p>
                </div>
            )}

            {result && (
                <div className="disease-result-card fade-in">
                    <div className="disease-res-header">
                        <div className="disease-res-title">
                            <h2>{result.disease || "Diagnosis Complete"}</h2>
                            <p style={{ color: "#64748b", marginTop: "4px" }}>Affected Crop: <b>{result.crop || "Detected Crop"}</b></p>
                        </div>
                        <div className="disease-confidence-pill">
                            🎯 Match Confidence: {result.confidence || "High"}
                        </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <h4 style={{ color: "#0f5132", marginBottom: "6px" }}>🔍 Identified Symptoms</h4>
                        <p style={{ color: "#475569", lineHeight: "1.6" }}>{result.symptoms}</p>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <h4 style={{ color: "#0f5132", marginBottom: "6px" }}>⚠️ Root Causes</h4>
                        <p style={{ color: "#475569", lineHeight: "1.6" }}>{result.causes}</p>
                    </div>

                    <div className="remedies-grid">
                        <div className="remedy-card organic">
                            <h4>🌿 Organic & Natural Treatment</h4>
                            <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: "1.6" }}>{result.organic_treatment}</p>
                        </div>

                        <div className="remedy-card chemical">
                            <h4>💊 Recommended Fungicide / Treatment</h4>
                            <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: "1.6" }}>{result.treatment}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "1.5rem", background: "#f0fdf4", padding: "1.2rem", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
                        <h4 style={{ color: "#166534", marginBottom: "4px" }}>🛡️ Future Prevention Guidelines</h4>
                        <p style={{ color: "#15803d", fontSize: "0.92rem" }}>{result.prevention}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DiseaseDetection;