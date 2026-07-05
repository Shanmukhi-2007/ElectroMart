import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>ElectroMart</h2>
          <p>
            Your One-Stop Electronics Store for smartphones,
            laptops, accessories and more.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Cart</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 support@electromart.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Andhra Pradesh, India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 ElectroMart. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;