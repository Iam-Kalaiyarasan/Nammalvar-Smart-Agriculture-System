import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("farmer");
    const [loading, setLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const url =
                userType === "farmer"
                    ? `${API_BASE_URL}/api/accounts/farmer/login/`
                    : `${API_BASE_URL}/api/accounts/customer/login/`;

            const response = await axios.post(url, {
                email,
                password,
            });

            alert(response.data.message || "Login Successful!");

            if (userType === "farmer") {
                localStorage.setItem("farmerId", response.data.id);
                localStorage.setItem("farmerName", response.data.name);
                navigate("/farmer-dashboard");
            } else {
                localStorage.setItem("customerId", response.data.id);
                localStorage.setItem("customerName", response.data.name);
                navigate("/customer-dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Email or Password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container fade-in">
            <div className="left-panel">
                <div className="left-hero-content">
                    <div className="hero-badge-pill">
                        ⚡ AI-Powered Agriculture Ecosystem
                    </div>
                    <h1>NAMMALVAR</h1>
                    <h2>Smart Agriculture System</h2>
                    <p>
                        Empowering farmers with AI Crop Prediction, Leaf Disease Diagnostics, Direct Produce Marketplace, and Weather Intelligence.
                    </p>

                    <div className="hero-features-list">
                        <div className="hero-feature-item">
                            🌱 <span>AI Crop Predictor</span>
                        </div>
                        <div className="hero-feature-item">
                            🦠 <span>Disease Diagnostic</span>
                        </div>
                        <div className="hero-feature-item">
                            🛒 <span>Direct Marketplace</span>
                        </div>
                        <div className="hero-feature-item">
                            🤖 <span>Agri Gemini Bot</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <div className="login-card-box">
                    <div className="login-header-box">
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your dashboard & agricultural services</p>
                    </div>

                    <div className="role-tabs">
                        <button
                            type="button"
                            className={`role-tab-btn ${userType === "farmer" ? "active" : ""}`}
                            onClick={() => setUserType("farmer")}
                        >
                            👨‍🌾 Farmer Portal
                        </button>
                        <button
                            type="button"
                            className={`role-tab-btn ${userType === "customer" ? "active" : ""}`}
                            onClick={() => setUserType("customer")}
                        >
                            🛒 Customer Portal
                        </button>
                    </div>

                    <form onSubmit={loginUser}>
                        <div className="input-field-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-submit-auth" disabled={loading}>
                            {loading ? "Signing In..." : `Sign In as ${userType === "farmer" ? "Farmer" : "Customer"}`}
                        </button>

                        <div className="auth-footer-text">
                            Don't have an account?
                            <Link to="/register">Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;