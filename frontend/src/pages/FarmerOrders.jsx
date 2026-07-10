import { useEffect, useState } from "react";
import { collection, getDocs,updateDoc,doc } from "firebase/firestore";
import { db } from "../firebase";

function FarmerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    const querySnapshot =
      await getDocs(collection(db, "orders"));

    setOrders(

      querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

    );

  };
  const updateStatus = async (id, status) => {

  try {

    const orderRef = doc(db, "orders", id);

    await updateDoc(orderRef, {
      status
    });

    alert("Order Updated");

    loadOrders();

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

};

  return (

    <div style={{padding:"20px"}}>

      <h1>Farmer Orders</h1>

      {

        orders.map(order => (

          <div
            key={order.id}
            style={{
              border:"1px solid gray",
              margin:"10px",
              padding:"10px"
            }}
          >

            <h3>{order.productName}</h3>

            <p>Customer : {order.customerName}</p>

            <p>Price : ₹{order.price}</p>

            <p>Status : {order.status}</p>

<select
  value={order.status}
  onChange={(e) =>
    updateStatus(order.id, e.target.value)
  }
>

  <option>Pending</option>

  <option>Processing</option>

  <option>Shipped</option>

  <option>Delivered</option>

</select>

          </div>

        ))

      }

    </div>

  );

}

export default FarmerOrders;