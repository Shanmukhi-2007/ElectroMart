import React, { useState, useEffect } from "react";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProduct({
        id: 1,
        name: "Sample Product",
        price: 999,
        category: "Electronics",
        description: "This is a sample product description.",
        image: "https://via.placeholder.com/400"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const increaseQty = () => setQuantity(quantity + 1);

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="product-details">
      <button className="back-btn">← Back</button>

      <div className="details-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <p className="category">
            Category: <span>{product.category}</span>
          </p>

          <p className="description">{product.description}</p>

          <div className="price-section">
            <h2 className="price">₹{product.price}</h2>
          </div>

          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button onClick={decreaseQty}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">Wishlist</button>
          </div>

          <div className="product-details-info">
            <h3>Product Details</h3>
            <ul>
              <li>Free delivery available</li>
              <li>7 days return policy</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;