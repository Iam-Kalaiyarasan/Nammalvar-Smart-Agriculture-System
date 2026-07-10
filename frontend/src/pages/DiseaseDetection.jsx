import { useState } from "react";
import axios from "axios";
import "./DiseaseDetection.css";

function DiseaseDetection() {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const detectDisease = async () => {

        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        setLoading(true);
        setResult(null);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/disease/detect/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.log(error);

            alert("Disease detection failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="disease-container">

            <h1>🌿 AI Crop Disease Detection</h1>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    const file = e.target.files[0];

                    setImage(file);

                    if (file) {
                        setPreview(URL.createObjectURL(file));
                    }

                }}
            />

            <br /><br />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="preview-image"
                />
            )}

            <br />

            <button onClick={detectDisease}>
                Detect Disease
            </button>

            {loading && (
                <h3>🤖 AI is analyzing the leaf image...</h3>
            )}

            {result && (

                <div className="result-card">

                    <h2>Detection Result</h2>

                    <p><b>Crop:</b> {result.crop}</p>

                    <p><b>Disease:</b> {result.disease}</p>

                    <p><b>Confidence:</b> {result.confidence}</p>

                    <p><b>Symptoms:</b> {result.symptoms}</p>

                    <p><b>Causes:</b> {result.causes}</p>

                    <p><b>Treatment:</b> {result.treatment}</p>

                    <p><b>Organic Treatment:</b> {result.organic_treatment}</p>

                    <p><b>Prevention:</b> {result.prevention}</p>

                </div>

            )}

        </div>

    );
}

export default DiseaseDetection;