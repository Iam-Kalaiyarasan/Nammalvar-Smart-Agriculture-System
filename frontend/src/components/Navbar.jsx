import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const farmerId = localStorage.getItem("farmerId");
    const customerId = localStorage.getItem("customerId");
    const farmerName = localStorage.getItem("farmerName");
    const customerName = localStorage.getItem("customerName");

    const isFarmer = Boolean(farmerId);
    const isCustomer = Boolean(customerId);
    const isLoggedIn = isFarmer || isCustomer;

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (isCustomer) {
            fetchCartCount();
        }
    }, [location.pathname, isCustomer]);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/cart/list/?customer=${customerId}`
            );
            if (Array.isArray(response.data)) {
                setCartCount(response.data.length);
            }
        } catch {
            setCartCount(0);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="app-navbar">
            <Link to={isFarmer ? "/farmer-dashboard" : isCustomer ? "/customer-dashboard" : "/login"} className="nav-brand">
                <div className="brand-badge">🌾</div>
                <div className="brand-text">
                    <span className="brand-title">NAMMALVAR</span>
                    <span className="brand-tag">Smart Agriculture AI</span>
                </div>
            </Link>

            <ul className="nav-menu">
                {isFarmer && (
                    <li>
                        <Link to="/farmer-dashboard" className={`nav-link-item ${isActive("/farmer-dashboard") ? "active" : ""}`}>
                            📊 <span>Dashboard</span>
                        </Link>
                    </li>
                )}

                {isCustomer && (
                    <li>
                        <Link to="/customer-dashboard" className={`nav-link-item ${isActive("/customer-dashboard") ? "active" : ""}`}>
                            🏠 <span>Dashboard</span>
                        </Link>
                    </li>
                )}

                <li>
                    <Link to="/products" className={`nav-link-item ${isActive("/products") ? "active" : ""}`}>
                        🌽 <span>Marketplace</span>
                    </Link>
                </li>

                {isCustomer && (
                    <li>
                        <Link to="/cart" className={`nav-link-item cart-link ${isActive("/cart") ? "active" : ""}`}>
                            🛒 <span>Cart</span>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </li>
                )}

                <li>
                    <Link to="/crop-prediction" className={`nav-link-item ${isActive("/crop-prediction") ? "active" : ""}`}>
                        🌱 <span>Crop Prediction</span>
                    </Link>
                </li>

                <li>
                    <Link to="/disease" className={`nav-link-item ${isActive("/disease") ? "active" : ""}`}>
                        🦠 <span>Disease AI</span>
                    </Link>
                </li>

                <li>
                    <Link to="/chatbot" className={`nav-link-item ${isActive("/chatbot") ? "active" : ""}`}>
                        🤖 <span>AI Assistant</span>
                    </Link>
                </li>

                {isFarmer ? (
                    <li>
                        <Link to="/farmer-orders" className={`nav-link-item ${isActive("/farmer-orders") ? "active" : ""}`}>
                            📦 <span>Orders</span>
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/track-orders" className={`nav-link-item ${isActive("/track-orders") ? "active" : ""}`}>
                            🚚 <span>My Orders</span>
                        </Link>
                    </li>
                )}

                <li>
                    <Link to="/analytics" className={`nav-link-item ${isActive("/analytics") ? "active" : ""}`}>
                        📈 <span>Analytics</span>
                    </Link>
                </li>
            </ul>

            <div className="nav-actions">
                {isLoggedIn ? (
                    <>
                        <div className="role-badge">
                            👤 {isFarmer ? `Farmer (${farmerName || "Logged In"})` : `Customer (${customerName || "Logged In"})`}
                        </div>
                        <button onClick={handleLogout} className="btn-logout">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn-login-nav">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar;