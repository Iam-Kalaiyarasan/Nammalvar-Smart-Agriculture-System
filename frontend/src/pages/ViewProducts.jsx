import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./ViewProducts.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const CATEGORIES = ["All", "Cereals", "Vegetables", "Fruits", "Pulses", "Oil Seeds"];

function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/marketplace/products/`);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const buyProduct = (product) => {
        navigate("/payment", {
            state: { product },
        });
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.crop_name?.toLowerCase().includes(search.toLowerCase()) ||
            product.location?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="marketplace-container fade-in">
            <div className="marketplace-header-box">
                <h1>🌽 Farm Direct Marketplace</h1>
                <p>Buy fresh crops, grains, and produce directly from verified local farmers</p>
            </div>

            <div className="marketplace-filter-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon-inside">🔍</span>
                    <input
                        type="text"
                        placeholder="Search crops, produce, or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="category-pills-row">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid-layout">
                {filteredProducts.length === 0 ? (
                    <div className="no-products-state">
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌾</div>
                        <h3>No Produce Found</h3>
                        <p style={{ color: "#64748b" }}>Try searching with a different keyword or category filter.</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onBuy={buyProduct}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ViewProducts;