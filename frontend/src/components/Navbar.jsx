import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="logo">
        🌾 Nammalvar
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/farmer-dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/marketplace">Marketplace</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        {/* New Cart Menu */}
        <li>
          <Link to="/cart">🛒 Cart</Link>
        </li>

        <li>
          <Link to="/crop-prediction">Crop Prediction</Link>
        </li>

        <li>
          <Link to="/disease">Disease Detection</Link>
        </li>

        <li>
          <Link to="/chatbot">AI Chatbot</Link>
        </li>

        <li>
          <Link to="/track-orders">Orders</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>

      </ul>

    </nav>

  );
}

export default Navbar;