import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import { Product } from "../types/product";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const Deals = products.filter((p) =>
    ["product_cuminSeeds", "product_cardamonPods", "product_rasElHanout"].includes(p.product_id)
  );

  return (
    <div className="container mt-4">
      <h2>Deals</h2>
      <Carousel id="featuredCarousel" products={Deals} />
    </div>
  );
};

export default HomePage;
