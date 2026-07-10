import { useState } from "react";
import axios from "axios";

function Marketplace() {

    const [cropName, setCropName] = useState("");
    const [category, setCategory] = useState("Cereals");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("Kg");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    // Replace with logged-in farmer id later
    const [farmer] = useState(1);

    const addProduct = async () => {

        if (!image) {
            alert("Please select a product image.");
            return;
        }

        const formData = new FormData();

        formData.append("farmer", farmer);
        formData.append("crop_name", cropName);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("unit", unit);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("available", true);
        formData.append("image", image);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/marketplace/add/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log(response.data);

            alert("Product Added Successfully");

            setCropName("");
            setCategory("Cereals");
            setDescription("");
            setQuantity("");
            setUnit("Kg");
            setPrice("");
            setLocation("");
            setImage(null);
            setPreview("");

        } catch (error) {

            console.log(error);

            alert("Unable to add product");

        }

    };

    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "20px"
            }}
        >

            <h2>Add Product</h2>

            <input
                type="text"
                placeholder="Crop Name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
            />

            <br /><br />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option>Cereals</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Pulses</option>
                <option>Oil Seeds</option>
            </select>

            <br /><br />

            <textarea
                placeholder="Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <br /><br />

            <label><b>Product Image</b></label>

            <br /><br />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    const file = e.target.files[0];

                    setImage(file);

                    if (file) {
                        setPreview(URL.createObjectURL(file));
                    }

                }}
            />

            <br /><br />

            {preview && (

                <img
                    src={preview}
                    alt="Preview"
                    style={{
                        width: "250px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                />

            )}

            <br /><br />

            <button
                onClick={addProduct}
            >
                Add Product
            </button>

        </div>

    );
}

export default Marketplace;