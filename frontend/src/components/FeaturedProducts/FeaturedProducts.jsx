import { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data.slice(0, 6)); // Get first 6 products
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

  if (loading) return <section className="featured-products"><p>Loading...</p></section>;

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2>Featured Products</h2>
        <Link to="/products" className="view-all">
          View All →
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>

            <div className="price">
              <span className="new-price">₹{product.price.toLocaleString()}</span>
            </div>

            <div className="buttons">
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
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;