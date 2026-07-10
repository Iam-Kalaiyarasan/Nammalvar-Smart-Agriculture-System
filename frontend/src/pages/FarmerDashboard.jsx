import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

function FarmerDashboard() {

    const navigate = useNavigate();

    const farmerId = localStorage.getItem("farmerId");

    const [dashboard, setDashboard] = useState({
        farmer_name: "",
        total_products: 0,
        total_orders: 0,
        pending_orders: 0,
        delivered_orders: 0,
        total_sales: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/dashboard/farmer/${farmerId}/`
            );

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load dashboard");

        }

    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>🌾 Welcome, {dashboard.farmer_name}</h1>

                <p>Smart Agriculture Platform</p>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h2>📦 Products</h2>
                    <h1>{dashboard.total_products}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🛒 Orders</h2>
                    <h1>{dashboard.total_orders}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🚚 Pending</h2>
                    <h1>{dashboard.pending_orders}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>✅ Delivered</h2>
                    <h1>{dashboard.delivered_orders}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>💰 Sales</h2>
                    <h1>₹ {dashboard.total_sales}</h1>
                </div>

            </div>

            <h2 className="section-title">
                Quick Actions
            </h2>

            <div className="action-grid">

                <button onClick={() => navigate("/marketplace")}>
                    Add Product
                </button>

                <button onClick={() => navigate("/products")}>
                    View Products
                </button>

                <button onClick={() => navigate("/farmer-orders")}>
                    Orders
                </button>

                <button onClick={() => navigate("/crop-prediction")}>
                    Crop Prediction
                </button>

                <button onClick={() => navigate("/disease")}>
                    Disease Detection
                </button>

                <button onClick={() => navigate("/chatbot")}>
                    AI Chatbot
                </button>

                <button onClick={() => navigate("/analytics")}>
                    Analytics
                </button>

                <button onClick={() => navigate("/farmer-profile")}>
                    Profile
                </button>

            </div>

        </div>

    );
}

export default FarmerDashboard;