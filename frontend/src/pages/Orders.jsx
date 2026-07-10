import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Orders() {

  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");

  const placeOrder = async () => {

    try {

      await addDoc(
        collection(db, "orders"),
        {
          customerName,
          productName,
          quantity,
          status: "Pending",
          createdAt: new Date()
        }
      );

      alert("Order Placed Successfully");

    } catch(error) {

      alert(error.message);

    }
  };

  return (

    <div>

      <h1>Place Order</h1>

      <input
        type="text"
        placeholder="Customer Name"
        onChange={(e)=>
        setCustomerName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Product Name"
        onChange={(e)=>
        setProductName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e)=>
        setQuantity(e.target.value)}
      />

      <br /><br />

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>

  );
}

export default Orders;