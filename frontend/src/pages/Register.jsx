import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [loading, setLoading] = useState(false);

    const registerUser = async (e) => {

        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const url =
                role === "farmer"
                    ? "http://127.0.0.1:8000/api/accounts/farmer/register/"
                    : "http://127.0.0.1:8000/api/accounts/customer/register/";

            const response = await axios.post(url, {
                name,
                email,
                password,
            });

            alert(response.data.message || "Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(JSON.stringify(error.response.data));
            } else {
                alert("Registration Failed");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-container">

            <div className="register-left">

                <h1>🌾 NAMMALVAR</h1>

                <h2>Smart Agriculture Platform</h2>

                <p>

                    Register as a Farmer or Customer and access
                    Crop Prediction,
                    Disease Detection,
                    Marketplace,
                    AI Chatbot,
                    Weather Forecast and Smart Agriculture Services.

                </p>

            </div>

            <div className="register-right">

                <form
                    className="register-form"
                    onSubmit={registerUser}
                >

                    <h2>Create Account</h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
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

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="farmer">
                            Farmer
                        </option>

                        <option value="customer">
                            Customer
                        </option>

                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p>

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Register;