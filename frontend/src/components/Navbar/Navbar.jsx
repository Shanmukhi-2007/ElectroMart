import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCartCount();
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const cart = await response.json();
      setCartCount(cart.length || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Refresh cart count when needed (optional: can add event listener)
  useEffect(() => {
    const interval = setInterval(fetchCartCount, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>⚡ ElectroMart</h2>
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for mobiles, laptops, headphones..."
          className="search"
        />
        <button className="search-btn">🔍</button>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart <span className="cart-count">{cartCount}</span>
        </Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;