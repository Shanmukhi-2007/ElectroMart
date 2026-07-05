import { useState, useEffect } from "react";
import "./Products.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) return <div className="products-page"><p>Loading...</p></div>;

  return (
    <div className="products-page">
      <h1>All Products</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="filters">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        <button
          className={selectedCategory === "mobiles" ? "active" : ""}
          onClick={() => setSelectedCategory("mobiles")}
        >
          Mobiles
        </button>
        <button
          className={selectedCategory === "laptops" ? "active" : ""}
          onClick={() => setSelectedCategory("laptops")}
        >
          Laptops
        </button>
        <button
          className={selectedCategory === "headphones" ? "active" : ""}
          onClick={() => setSelectedCategory("headphones")}
        >
          Headphones
        </button>
        <button
          className={selectedCategory === "buds" ? "active" : ""}
          onClick={() => setSelectedCategory("buds")}
        >
          Buds
        </button>
        <button
          className={selectedCategory === "powerbanks" ? "active" : ""}
          onClick={() => setSelectedCategory("powerbanks")}
        >
          Power Banks
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price.toLocaleString()}</p>
              <p className="description">{product.description}</p>

              <div className="product-buttons">
                <button
                  className="cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <Link to={`/products/${product.id}`}>
                  <button className="details-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;