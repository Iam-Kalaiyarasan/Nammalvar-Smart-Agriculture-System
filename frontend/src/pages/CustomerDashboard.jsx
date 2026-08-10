import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function CustomerDashboard() {
    const navigate = useNavigate();
    const customerId = localStorage.getItem("customerId") || 1;
    const customerName = localStorage.getItem("customerName") || "Customer";

    const [stats, setStats] = useState({
        cartItems: 0,
        totalOrders: 0,
    });

    useEffect(() => {
        loadCustomerStats();
    }, []);

    const loadCustomerStats = async () => {
        try {
            const [cartRes, ordersRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/cart/list/?customer=${customerId}`).catch(() => ({ data: [] })),
                axios.get(`${API_BASE_URL}/api/orders/customer/${customerId}/`).catch(() => ({ data: [] })),
            ]);

            setStats({
                cartItems: Array.isArray(cartRes.data) ? cartRes.data.length : 0,
                totalOrders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
            });
        } catch (error) {
            console.error("Failed to load customer dashboard stats", error);
        }
    };

    return (
        <div className="customer-dashboard-container">
            <div className="customer-dashboard-header">
                <h1>🛒 Welcome, {customerName}!</h1>
                <p>Nammalvar Smart Agriculture Marketplace & Support Services</p>
            </div>

            <div className="customer-dashboard-cards">
                <div className="customer-dashboard-card" onClick={() => navigate("/cart")}>
                    <h3>🛒 My Cart Items</h3>
                    <h1>{stats.cartItems}</h1>
                </div>

                <div className="customer-dashboard-card" onClick={() => navigate("/track-orders")}>
                    <h3>📦 Orders Placed</h3>
                    <h1>{stats.totalOrders}</h1>
                </div>
            </div>

            <h2 className="customer-section-title">Quick Actions & Services</h2>

            <div className="customer-action-grid">
                <div className="customer-action-card" onClick={() => navigate("/products")}>
                    <div className="customer-action-icon">🌽</div>
                    <h3>Browse Marketplace</h3>
                    <p>Explore fresh organic farm produce directly from farmers</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/cart")}>
                    <div className="customer-action-icon">🛒</div>
                    <h3>My Cart</h3>
                    <p>View items in your cart and proceed to secure checkout</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/track-orders")}>
                    <div className="customer-action-icon">🚚</div>
                    <h3>Track My Orders</h3>
                    <p>Check live status and details of your placed orders</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/crop-prediction")}>
                    <div className="customer-action-icon">🌱</div>
                    <h3>Crop Prediction</h3>
                    <p>Predict suitable crops based on soil & weather data</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/disease")}>
                    <div className="customer-action-icon">🦠</div>
                    <h3>Disease Detection</h3>
                    <p>Identify plant diseases instantly using AI image analysis</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/chatbot")}>
                    <div className="customer-action-icon">🤖</div>
                    <h3>AI Farming Assistant</h3>
                    <p>Ask farming questions & get expert agricultural advice</p>
                </div>

                <div className="customer-action-card" onClick={() => navigate("/customer-profile")}>
                    <div className="customer-action-icon">👤</div>
                    <h3>My Profile</h3>
                    <p>Manage your delivery address & profile details</p>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;