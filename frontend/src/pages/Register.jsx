import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import "./Login.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("farmer");
    const [loading, setLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all required fields (Name, Email, Password)");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const url =
                role === "farmer"
                    ? `${API_BASE_URL}/api/accounts/farmer/register/`
                    : `${API_BASE_URL}/api/accounts/customer/register/`;

            const response = await axios.post(url, {
                full_name: name,
                name: name,
                email: email,
                phone: phone || "N/A",
                address: address || "N/A",
                password: password,
            });

            alert(response.data.message || "Registration Successful!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const errData = error.response.data;
                if (typeof errData === "object") {
                    const messages = Object.entries(errData)
                        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
                        .join("\n");
                    alert(`Registration failed:\n${messages}`);
                } else {
                    alert(errData);
                }
            } else {
                alert("Registration Failed. Please check server connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page-container fade-in">
            <div className="register-left-panel">
                <div className="left-hero-content">
                    <div className="hero-badge-pill">🌾 Join the Agricultural Revolution</div>
                    <h1 className="register-hero-title">Create Your Account</h1>
                    <h2 className="register-hero-subtitle">Smart Agriculture Platform</h2>
                    <p className="register-hero-desc">
                        Register as a Farmer to sell produce directly & predict crop health, or register as a Customer to buy fresh farm products directly from verified local growers.
                    </p>

                    <div className="hero-features-list">
                        <div className="hero-feature-item">
                            👨‍🌾 <span>Direct Farmer Sales</span>
                        </div>
                        <div className="hero-feature-item">
                            ⚡ <span>AI Plant Diagnosis</span>
                        </div>
                        <div className="hero-feature-item">
                            🛒 <span>Organic Marketplace</span>
                        </div>
                        <div className="hero-feature-item">
                            📊 <span>Yield Analytics</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="register-right-panel">
                <div className="register-card-box">
                    <div className="login-header-box">
                        <h2>Get Started</h2>
                        <p>Fill in your profile details to register</p>
                    </div>

                    <div className="role-tabs">
                        <button
                            type="button"
                            className={`role-tab-btn ${role === "farmer" ? "active" : ""}`}
                            onClick={() => setRole("farmer")}
                        >
                            👨‍🌾 Register as Farmer
                        </button>
                        <button
                            type="button"
                            className={`role-tab-btn ${role === "customer" ? "active" : ""}`}
                            onClick={() => setRole("customer")}
                        >
                            🛒 Register as Customer
                        </button>
                    </div>

                    <form onSubmit={registerUser} className="register-form-grid">
                        <div className="input-field-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                placeholder="e.g. Kalaiyarasan S"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Address / Location</label>
                            <input
                                type="text"
                                placeholder="District, State"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="input-field-group">
                            <label>Password *</label>
                            <input
                                type="password"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-submit-auth" disabled={loading}>
                            {loading ? "Creating Account..." : `Register as ${role === "farmer" ? "Farmer" : "Customer"}`}
                        </button>

                        <div className="auth-footer-text">
                            Already have an account?
                            <Link to="/login">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;