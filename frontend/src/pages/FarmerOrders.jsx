import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function FarmerOrders() {

  const [orders, setOrders] = useState([]);
  const farmerId = 1; // Default logged-in farmer ID

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/api/orders/farmer/${farmerId}/`
      );

      setOrders(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `${API_BASE_URL}/api/orders/update/${id}/`,
        { status }
      );

      alert("Order Updated");

      loadOrders();

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.error || error.message);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Farmer Orders</h1>

      {

        orders.length === 0 ?

          <h3>No Orders Found</h3>

          :

          orders.map(order => (

            <div
              key={order.id}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px"
              }}
            >

              <h3>{order.product_details?.crop_name || `Order #${order.id}`}</h3>

              <p>Customer ID: {order.customer}</p>

              <p>Price: ₹{order.total_price}</p>

              <p>Quantity: {order.quantity}</p>

              <p>Status: {order.status}</p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order.id, e.target.value)
                }
              >

                <option value="Pending">Pending</option>

                <option value="Accepted">Accepted</option>

                <option value="Packed">Packed</option>

                <option value="Shipped">Shipped</option>

                <option value="Delivered">Delivered</option>

                <option value="Cancelled">Cancelled</option>

              </select>

            </div>

          ))

      }

    </div>

  );

}

export default FarmerOrders;