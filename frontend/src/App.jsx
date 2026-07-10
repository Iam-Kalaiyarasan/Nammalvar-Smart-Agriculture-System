import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import FarmerDashboard from "./pages/FarmerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// Profiles
import FarmerProfile from "./pages/FarmerProfile";
import CustomerProfile from "./pages/CustomerProfile";

// Marketplace
import Marketplace from "./pages/Marketplace";
import ViewProducts from "./pages/ViewProducts";

// Orders
import FarmerOrders from "./pages/FarmerOrders";
import TrackOrders from "./pages/TrackOrders";
import Payment from "./pages/Payment";

// AI Modules
import CropPrediction from "./pages/CropPrediction";
import DiseaseDetection from "./pages/DiseaseDetection";
import ChatBot from "./pages/ChatBot";

// Other Pages
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function Layout() {

    const location = useLocation();

    const hideLayout =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (

        <>

            {!hideLayout && <Navbar />}

            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/home" element={<Home />} />

                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

                <Route path="/customer-dashboard" element={<CustomerDashboard />} />

                <Route path="/farmer-profile" element={<FarmerProfile />} />

                <Route path="/customer-profile" element={<CustomerProfile />} />

                <Route path="/marketplace" element={<Marketplace />} />

                <Route path="/products" element={<ViewProducts />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/payment" element={<Payment />} />

                <Route path="/farmer-orders" element={<FarmerOrders />} />

                <Route path="/track-orders" element={<TrackOrders />} />

                <Route path="/crop-prediction" element={<CropPrediction />} />

                <Route path="/disease" element={<DiseaseDetection />} />

                <Route path="/chatbot" element={<ChatBot />} />

                <Route path="/analytics" element={<Analytics />} />

            </Routes>

            {!hideLayout && <Footer />}

        </>

    );

}

function App() {

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>

    );

}

export default App;