document.addEventListener("DOMContentLoaded", function () {
  const carousel = [
    {
      id: "featuredCarousel",
      cards: products.filter(product =>
        ["product_cuminSeeds", "product_cardamonPods", "product_rasElHanout"].includes(product.id)
      ),
    },
    {
      id: "allCarousel",
      cards: products,
    },
    {
      id: "mediterraneanCarousel",
      cards: products.filter(p => p.cuisine.includes("Mediterranean")),
    },
    {
      id: "indianCarousel",
      cards: products.filter(p => p.cuisine.includes("Indian")),
    },
    {
      id: "asianCarousel",
      cards: products.filter(p => p.cuisine.includes("Asian")),
    },
  ];

  function getCardsPerSlide() {
    if (window.innerWidth >= 1200) return 5;
    if (window.innerWidth >= 768) return 4;
    return 3;
  }

  function getSlides(cards) {
    let slides = [];
    const cardsPerSlide = getCardsPerSlide();
    for (let i = 0; i < cards.length; i += cardsPerSlide) {
      slides.push(cards.slice(i, i + cardsPerSlide));
    }
    return slides;
  }

  function generateCarousel(carouselItem) {
    const carouselInner = document.querySelector(
      `#${carouselItem.id} .carousel-inner`
    );
    carouselInner.innerHTML = "";

    let slides = getSlides(carouselItem.cards);

    slides.forEach((group, index) => {
      const isActive = index === 0 ? "active" : "";
      const slide = document.createElement("div");
      slide.className = `carousel-item ${isActive}`;
      slide.innerHTML = `
          <div class="d-flex justify-content-center"> 
              ${group
                .map(
                  (card) => `
                  <a href="${card.link}" class="card" style="width: 18rem; margin-right: 15px; text-decoration: none; color: inherit;">
                      <img src="${card.image}" class="card-img-top">
                      <div class="card-body">
                          <h5>${card.name}</h5>
                          <p>${card.subheading}</p>
                      </div>
                  </a>
              `
                )
                .join("")}
          </div>
      `;
      carouselInner.appendChild(slide);
    });
  }

  function generateAllCarousels() {
    carousel.forEach(generateCarousel);
  }

  generateAllCarousels();
  window.addEventListener("resize", generateAllCarousels);
});
