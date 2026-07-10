import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/marketplace/products/"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load products.");

        }

    };

    const buyProduct = (product) => {

        navigate("/payment", {
            state: {
                product
            }
        });

    };

    const filteredProducts = products.filter(product =>
        product.crop_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="container">

            <h1>🌾 Available Products</h1>

            <input
                type="text"
                placeholder="Search Crop..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br /><br />

            <div className="product-grid">

                {

                    filteredProducts.length === 0 ?

                        <h2>No Products Available</h2>

                        :

                        filteredProducts.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                                onBuy={buyProduct}

                            />

                        ))

                }

            </div>

        </div>

    );

}

export default ViewProducts;