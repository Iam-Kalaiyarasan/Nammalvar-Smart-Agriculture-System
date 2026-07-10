import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function TrackOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "orders")
      );

      const orderList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(orderList);

    } catch (error) {

      console.log(error);
      alert(error.message);

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

            <h2>{order.productName}</h2>

            <p>Customer : {order.customerName}</p>

            <p>Price : ₹{order.price}</p>

            <p>Quantity : {order.quantity}</p>

            <h3>Status : {order.status}</h3>

          </div>

        ))

      }

    </div>

  );

}

export default TrackOrders;