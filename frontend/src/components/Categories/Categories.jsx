import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
  },
  {
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300",
  },
  {
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
  },
  {
    name: "Smart Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
  },
  {
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
  },
];

function Categories() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((item) => (
          <Link
            to="/products"
            className="category-card"
            key={item.name}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;