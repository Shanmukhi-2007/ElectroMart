import { useState, useEffect } from "react";
import "./Cart.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/cart`);
      const data = await response.json();
      setCartItems(data);
      setError("");
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cart/${itemId}?quantity=${quantity}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (loading) return <div className="cart-page"><p>Loading...</p></div>;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString()}</p>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <p>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </p>

          <p>
            <span>Tax (10%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </p>

          <p>
            <span>Shipping</span>
            <span>FREE</span>
          </p>

          <hr />

          <h3>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </h3>

          <button className="checkout-btn" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;