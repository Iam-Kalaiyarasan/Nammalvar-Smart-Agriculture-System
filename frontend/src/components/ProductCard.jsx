import axios from "axios";
import "./ProductCard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function ProductCard({ product, onBuy }) {
    const customerId = localStorage.getItem("customerId") || 1;

    const addToCart = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/cart/add/`,
                {
                    customer: Number(customerId),
                    product: product.id,
                    quantity: 1,
                }
            );

            alert(`✅ ${product.crop_name} added to your Cart!`);
        } catch (error) {
            console.error(error);
            alert("Unable to add product to cart.");
        }
    };

    return (
        <div className="product-card fade-in">
            <div className="product-img-wrapper">
                <span className="category-tag-badge">{product.category || "Produce"}</span>
                <img
                    src={
                        product.image
                            ? (product.image.startsWith("http") ? product.image : `${API_BASE_URL}${product.image}`)
                            : "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={product.crop_name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80";
                    }}
                />
            </div>

            <div className="product-details-content">
                <div className="product-title-row">
                    <h2>{product.crop_name}</h2>
                    <div className="product-price-tag">
                        ₹{product.price} <span className="product-unit-text">/ {product.unit || "Kg"}</span>
                    </div>
                </div>

                <p className="product-desc-text">
                    {product.description || "Fresh organic farm produce directly harvested from local fields."}
                </p>

                <div className="product-meta-row">
                    <div className="meta-location">
                        📍 {product.location || "Local Farm"}
                    </div>
                    <div className="meta-stock">
                        Available: {product.quantity} {product.unit || "Kg"}
                    </div>
                </div>

                <div className="product-buttons-group">
                    <button className="cart-btn-primary" onClick={addToCart}>
                        🛒 Add to Cart
                    </button>
                    <button className="buy-btn-accent" onClick={() => onBuy(product)}>
                        ⚡ Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;