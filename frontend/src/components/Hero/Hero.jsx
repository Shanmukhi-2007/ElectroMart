import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="offer">🔥 Mega Sale 2026</span>

        <h1>
          Upgrade Your <span>Tech Life</span>
        </h1>

        <p>
          Discover the latest smartphones, laptops, smartwatches,
          headphones and gaming accessories at unbeatable prices.
        </p>

        <div className="hero-buttons">
          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>

          <button className="learn-btn">
            Learn More
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
          alt="Electronics"
        />
      </div>
    </section>
  );
}

export default Hero;