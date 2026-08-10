import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Orders() {

  const [customer, setCustomer] = useState(1);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const placeOrder = async () => {

    try {

      await axios.post(`${API_BASE_URL}/api/orders/create/`, {
        customer: Number(customer) || 1,
        product: Number(product),
        quantity: Number(quantity),
        total_price: Number(totalPrice) || 0
      });

      alert("Order Placed Successfully");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.error || error.message);

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Place Order</h1>

      <input
        type="number"
        placeholder="Customer ID"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Product ID"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Total Price (₹)"
        value={totalPrice}
        onChange={(e) => setTotalPrice(e.target.value)}
      />

      <br /><br />

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>

  );
}

export default Orders;