import axios from "axios";
import "./ProductCard.css";

function ProductCard({ product, onBuy }) {

    const addToCart = async () => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/api/cart/add/",
            {
                customer: 1,
                product: product.id,
                quantity: 1
            }
        );

        console.log(response.data);

        alert("Product added to cart");

    } catch (error) {

        console.log(error);

        if (error.response) {

            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);

            alert(JSON.stringify(error.response.data));

        } else {

            alert(error.message);

        }

    }

};

    return (

        <div className="product-card">

            <img
                src={
                    product.image
                        ? `http://127.0.0.1:8000${product.image}`
                        : "https://placehold.co/300x220?text=No+Image"
                }
                alt={product.crop_name}
            />

            <div className="product-details">

                <h2>{product.crop_name}</h2>

                <p>
                    <b>Category:</b> {product.category}
                </p>

                <p>
                    <b>Description:</b> {product.description}
                </p>

                <p>
                    <b>Available:</b> {product.quantity} {product.unit}
                </p>

                <p>
                    <b>Location:</b> {product.location}
                </p>

                <p className="price">
                    ₹ {product.price} / {product.unit}
                </p>

                <div className="product-buttons">

                    <button
                        className="cart-btn"
                        onClick={addToCart}
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        className="buy-btn"
                        onClick={() => onBuy(product)}
                    >
                        ⚡ Buy Now
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;