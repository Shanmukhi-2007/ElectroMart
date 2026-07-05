import "./ProductCard.css";

function ProductCard() {
  const products = [
    {
      name: "iPhone 16",
      price: "₹79,999",
      image: "https://via.placeholder.com/220x180?text=iPhone+16",
    },
    {
      name: "MacBook Air",
      price: "₹99,999",
      image: "https://via.placeholder.com/220x180?text=MacBook+Air",
    },
    {
      name: "Sony Headphones",
      price: "₹12,999",
      image: "https://via.placeholder.com/220x180?text=Headphones",
    },
    {
      name: "Samsung Smart TV",
      price: "₹54,999",
      image: "https://via.placeholder.com/220x180?text=Smart+TV",
    },
  ];

  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCard;