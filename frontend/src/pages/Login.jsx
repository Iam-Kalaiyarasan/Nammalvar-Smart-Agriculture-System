import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("farmer");

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const url =
                userType === "farmer"
                    ? "http://127.0.0.1:8000/api/accounts/farmer/login/"
                    : "http://127.0.0.1:8000/api/accounts/customer/login/";

            const response = await axios.post(url, {
                email,
                password,
            });

            alert(response.data.message);

            if (userType === "farmer") {

                localStorage.setItem("farmerId", response.data.id);
                localStorage.setItem("farmerName", response.data.name);

                navigate("/farmer-dashboard");

            } else {

                localStorage.setItem("customerId", response.data.id);
                localStorage.setItem("customerName", response.data.name);

                navigate("/customer-dashboard");

            }

        } catch (error) {

            console.log(error);

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="login-container">

            <div className="left-panel">

                <h1>🌾 NAMMALVAR</h1>

                <h2>Smart Agriculture Platform</h2>

                <p>

                    AI Powered Crop Prediction,
                    Disease Detection,
                    Marketplace,
                    AI Chatbot and Farmer Support.

                </p>

            </div>

            <div className="right-panel">

                <form
                    className="login-form"
                    onSubmit={loginUser}
                >

                    <h2>Login</h2>

                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >

                        <option value="farmer">Farmer</option>

                        <option value="customer">Customer</option>

                    </select>

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                    <button type="submit">

                        Login

                    </button>

                    <p>

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Login;