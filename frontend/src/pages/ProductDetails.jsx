import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails.css";

const API_URL = "http://localhost:8000/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/products/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Product not found");
        } else {
          setError("Failed to load product details");
        }
        setProduct(null);
        return;
      }

      const data = await response.json();
      
      if (data.error) {
        setError("Product not found");
        setProduct(null);
      } else {
        setProduct(data);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details. Please try again.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
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
          quantity: quantity,
          image: product.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      if (data.success) {
        alert(`${product.name} added to cart!`);
        navigate("/cart");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="product-details">
        <div className="loading-container">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details">
        <div className="error-container">
          <p className="error-message">{error || "Product not found"}</p>
          <button className="back-btn" onClick={() => navigate("/products")}>
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <button className="back-btn" onClick={() => navigate("/products")}>
        ← Back to Products
      </button>

      <div className="details-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">Category: <span>{product.category}</span></p>
          <p className="description">{product.description}</p>

          <div className="price-section">
            <h2 className="price">₹{product.price?.toLocaleString() || "N/A"}</h2>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, Math.min(100, val)));
                }}
                readOnly
              />
              <button 
                onClick={() => setQuantity(Math.min(100, quantity + 1))}
                disabled={quantity >= 100}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button className="wishlist-btn" title="Add to wishlist">
              ❤ Wishlist
            </button>
          </div>

          <div className="product-details-info">
            <h3>Product Details</h3>
            <ul>
              <li>✓ High quality product</li>
              <li>✓ Warranty available</li>
              <li>✓ Free shipping</li>
              <li>✓ 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;