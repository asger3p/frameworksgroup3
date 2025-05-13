import React, { useEffect, useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { Product } from "../../types/product";

// Define the props for the Carousel component
interface CarouselProps {
    id: string;
    products: Product[];
  }
  
  // Carousel component displays products in a responsive Bootstrap carousel
  const Carousel: React.FC<CarouselProps> = ({ id, products }) => {
    const [slides, setSlides] = useState<Product[][]>([]);
  
    useEffect(() => {
       // Determine number of product cards per slide based on window width
      const getCardsPerSlide = () => {
        if (window.innerWidth >= 1200) return 5;
        if (window.innerWidth >= 768) return 4;
        return 3;
      };

      // Group products into slides depending on cardsPerSlide
      const getSlides = (cards: Product[]) => {
        const cardsPerSlide = getCardsPerSlide();
        const result: Product[][] = [];
        for (let i = 0; i < cards.length; i += cardsPerSlide) {
          result.push(cards.slice(i, i + cardsPerSlide));
        }
        return result;
      };

      // Update slides whenever the window is resized or products change
      const updateSlides = () => {
        setSlides(getSlides(products));
      };
  
      updateSlides();
      window.addEventListener("resize", updateSlides);
      return () => window.removeEventListener("resize", updateSlides);
    }, [products]);
  
    return (
      <div id={id} className="carousel slide mb-4">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div className="d-flex justify-content-center gap-4">
                {slide.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {slides.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default Carousel;