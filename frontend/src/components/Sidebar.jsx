import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>🌾 Nammalvar</h2>

      <ul>

        <li>
          <Link to="/farmer-dashboard">🏠 Dashboard</Link>
        </li>

        <li>
          <Link to="/farmer-profile">👨‍🌾 Farmer Profile</Link>
        </li>

        <li>
          <Link to="/marketplace">🛒 Marketplace</Link>
        </li>

        <li>
          <Link to="/products">📦 Products</Link>
        </li>

        <li>
          <Link to="/farmer-orders">📋 Orders</Link>
        </li>

        <li>
          <Link to="/crop-prediction">🌱 Crop Prediction</Link>
        </li>

        <li>
          <Link to="/disease">🦠 Disease Detection</Link>
        </li>

        <li>
          <Link to="/chatbot">🤖 AI Chatbot</Link>
        </li>

        <li>
          <Link to="/analytics">📊 Analytics</Link>
        </li>

        <li>
          <Link to="/">🚪 Logout</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;