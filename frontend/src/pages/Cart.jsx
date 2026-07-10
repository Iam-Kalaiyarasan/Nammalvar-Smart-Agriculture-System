import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const customerId = 1; // Replace with logged-in customer later

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/cart/list/?customer=${customerId}`
            );

            console.log(response.data); // Check API response

            setCartItems(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load cart");

        }

    };

    const removeItem = async (id) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/cart/delete/${id}/`
            );

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const total = cartItems.reduce((sum, item) => {

        return sum + Number(item.product_details.price) * item.quantity;

    }, 0);

    return (

        <div className="cart-container">

            <h1>🛒 My Cart</h1>

            {

                cartItems.length === 0 ?

                    <h2>Your cart is empty.</h2>

                    :

                    <>

                        {

                            cartItems.map(item => (

                                <div
                                    key={item.id}
                                    className="cart-card"
                                >

                                    <img
                                        src={
                                            item.product_details.image
                                                ? `http://127.0.0.1:8000${item.product_details.image}`
                                                : "https://placehold.co/200x150?text=No+Image"
                                        }
                                        alt={item.product_details.crop_name}
                                    />

                                    <div>

                                        <h2>
                                            {item.product_details.crop_name}
                                        </h2>

                                        <p>
                                            <b>Category:</b>{" "}
                                            {item.product_details.category}
                                        </p>

                                        <p>
                                            ₹ {item.product_details.price}
                                        </p>

                                        <p>
                                            Quantity : {item.quantity}
                                        </p>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                        <h2>

                            Total : ₹ {total.toFixed(2)}

                        </h2>

                        <button

                            className="checkout-btn"

                            onClick={() =>
                                navigate("/payment", {
                                    state: cartItems
                                })
                            }

                        >

                            Proceed to Checkout

                        </button>

                    </>

            }

        </div>

    );

}

export default Cart;