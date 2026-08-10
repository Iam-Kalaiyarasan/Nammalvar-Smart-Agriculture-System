import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer-brand-header">
                        <span style={{ fontSize: "1.8rem" }}>🌾</span>
                        <span className="footer-brand-title">NAMMALVAR</span>
                    </div>
                    <p className="footer-desc">
                        Empowering farmers and consumers with Next-Gen AI Crop Prediction, Disease Diagnosis, Direct Marketplace, and Smart Agriculture Intelligence.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Platform Services</h4>
                    <ul className="footer-links">
                        <li><Link to="/crop-prediction">🌱 Crop Prediction Engine</Link></li>
                        <li><Link to="/disease">🦠 Plant Disease Detection</Link></li>
                        <li><Link to="/chatbot">🤖 AI Farming Assistant</Link></li>
                        <li><Link to="/products">🌽 Direct Farm Marketplace</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/login">Farmer & Customer Login</Link></li>
                        <li><Link to="/register">Create Account</Link></li>
                        <li><Link to="/cart">Cart & Checkout</Link></li>
                        <li><Link to="/analytics">Analytics Dashboard</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Powered By Tech</h4>
                    <div className="tech-badges">
                        <span className="tech-badge">React.js 19</span>
                        <span className="tech-badge">Django REST</span>
                        <span className="tech-badge">PostgreSQL</span>
                        <span className="tech-badge">Google Gemini AI</span>
                        <span className="tech-badge">TensorFlow Lite</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-copy">
                    © 2026 Nammalvar Smart Agriculture System. Developed by Kalaiyarasan S.
                </div>
                <div style={{ color: "#64748b" }}>
                    Sustainable Farming • Smart Technology • Direct Trade
                </div>
            </div>
        </footer>
    );
}

export default Footer;