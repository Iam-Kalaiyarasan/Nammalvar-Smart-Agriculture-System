import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function FarmerDashboard() {
    const navigate = useNavigate();
    const farmerId = localStorage.getItem("farmerId") || 1;
    const farmerName = localStorage.getItem("farmerName") || "Farmer";

    const [dashboard, setDashboard] = useState({
        farmer_name: farmerName,
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
                `${API_BASE_URL}/api/dashboard/farmer/${farmerId}/`
            );
            setDashboard(response.data);
        } catch (error) {
            console.error("Unable to load live farmer dashboard", error);
        }
    };

    return (
        <div className="farmer-dashboard-container fade-in">
            <div className="farmer-welcome-banner">
                <div className="welcome-text-box">
                    <h1>👨‍🌾 Welcome back, {dashboard.farmer_name || farmerName}!</h1>
                    <p>Nammalvar Smart Agriculture Portal & Yield Intelligence</p>
                </div>
            </div>

            <div className="quick-stats-grid">
                <div className="stat-kpi-card" onClick={() => navigate("/products")}>
                    <div className="kpi-icon-wrapper kpi-icon-green">📦</div>
                    <div className="kpi-info">
                        <h3>Listed Products</h3>
                        <h1>{dashboard.total_products}</h1>
                    </div>
                </div>

                <div className="stat-kpi-card" onClick={() => navigate("/farmer-orders")}>
                    <div className="kpi-icon-wrapper kpi-icon-blue">🛒</div>
                    <div className="kpi-info">
                        <h3>Total Orders</h3>
                        <h1>{dashboard.total_orders}</h1>
                    </div>
                </div>

                <div className="stat-kpi-card" onClick={() => navigate("/farmer-orders")}>
                    <div className="kpi-icon-wrapper kpi-icon-amber">⏳</div>
                    <div className="kpi-info">
                        <h3>Pending Orders</h3>
                        <h1>{dashboard.pending_orders}</h1>
                    </div>
                </div>

                <div className="stat-kpi-card" onClick={() => navigate("/farmer-orders")}>
                    <div className="kpi-icon-wrapper kpi-icon-purple">✅</div>
                    <div className="kpi-info">
                        <h3>Delivered</h3>
                        <h1>{dashboard.delivered_orders}</h1>
                    </div>
                </div>

                <div className="stat-kpi-card">
                    <div className="kpi-icon-wrapper kpi-icon-emerald">💰</div>
                    <div className="kpi-info">
                        <h3>Total Revenue</h3>
                        <h1>₹ {dashboard.total_sales}</h1>
                    </div>
                </div>
            </div>

            <h2 className="action-section-header">
                ⚡ Quick Farmer Services
            </h2>

            <div className="farmer-action-cards-grid">
                <div className="farmer-action-item" onClick={() => navigate("/marketplace")}>
                    <div className="farmer-action-icon-large">➕</div>
                    <h3>Add New Produce</h3>
                    <p>List your crop harvest directly on the market for customers</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/products")}>
                    <div className="farmer-action-icon-large">📦</div>
                    <h3>My Listed Products</h3>
                    <p>View, update pricing, or edit quantity of your produce</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/farmer-orders")}>
                    <div className="farmer-action-icon-large">📋</div>
                    <h3>Manage Orders</h3>
                    <p>Update order status (Pending, Shipped, Delivered)</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/crop-prediction")}>
                    <div className="farmer-action-icon-large">🌱</div>
                    <h3>AI Crop Predictor</h3>
                    <p>Predict optimal crops based on soil nutrients & weather</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/disease")}>
                    <div className="farmer-action-icon-large">🦠</div>
                    <h3>Plant Disease Scanner</h3>
                    <p>Diagnose crop diseases instantly with AI photo analysis</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/chatbot")}>
                    <div className="farmer-action-icon-large">🤖</div>
                    <h3>AI Farm Assistant</h3>
                    <p>Ask questions on fertilizers, pest control & market rates</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/analytics")}>
                    <div className="farmer-action-icon-large">📈</div>
                    <h3>Sales Analytics</h3>
                    <p>Track sales growth, top-selling crops, & monthly trends</p>
                </div>

                <div className="farmer-action-item" onClick={() => navigate("/farmer-profile")}>
                    <div className="farmer-action-icon-large">👤</div>
                    <h3>Farmer Profile</h3>
                    <p>Update farm location, contact details & account settings</p>
                </div>
            </div>
        </div>
    );
}

export default FarmerDashboard;