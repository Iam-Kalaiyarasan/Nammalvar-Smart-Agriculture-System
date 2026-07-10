import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handlePayment = () => {

    alert("Payment Successful!");

    navigate("/track-orders");

  };

  return (

    <div className="container">

      <h1>Payment</h1>

      <div className="card">

        <h2>Order Summary</h2>

        <p><strong>Product:</strong> Rice</p>

        <p><strong>Price:</strong> ₹500</p>

        <p><strong>Quantity:</strong> 1</p>

        <hr />

        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <br /><br />

        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <br /><br />

        <label>
          <input
            type="radio"
            name="payment"
            value="Debit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit / Credit Card
        </label>

        <br /><br />

        <button onClick={handlePayment}>
          Confirm Payment
        </button>

      </div>

    </div>

  );

}

export default Payment;