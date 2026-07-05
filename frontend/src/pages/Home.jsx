import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

function Home() {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </Layout>
  );
}

export default Home;