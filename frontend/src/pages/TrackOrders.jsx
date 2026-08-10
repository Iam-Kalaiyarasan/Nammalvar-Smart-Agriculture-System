import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function TrackOrders() {

  const [orders, setOrders] = useState([]);
  const customerId = 1; // Default logged-in customer ID

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/api/orders/customer/${customerId}/`
      );

      setOrders(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Track My Orders</h1>

      {

        orders.length === 0 ?

          <h3>No Orders Found</h3>

          :

          orders.map(order => (

            <div
              key={order.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px",
                width: "400px"
              }}
            >

              <h2>{order.product_details?.crop_name || `Order #${order.id}`}</h2>

              <p>Customer ID: {order.customer}</p>

              <p>Price: ₹{order.total_price}</p>

              <p>Quantity: {order.quantity}</p>

              <h3>Status: {order.status}</h3>

            </div>

          ))

      }

    </div>

  );

}

export default TrackOrders;