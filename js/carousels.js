document.addEventListener("DOMContentLoaded", function () {
  const carousel = [
    {
      id: "featuredCarousel",
      cards: [
        {
          title: "Cumin",
          text: "This is the content for card 1",
          image: "/images/1-cumin_seeds.jpg",
        },
        {
          title: "Coriander",
          text: "This is the content for card 2",
          image: "/images/2-coriander_seeds.jpg",
        },
        {
          title: "Cardamom",
          text: "This is the content for card 3",
          image: "/images/3-cardamom_pods.jpg",
        },
        {
          title: "Star Anise",
          text: "This is the content for card 4",
          image: "/images/4-star_anise.jpg",
        },
        {
          title: "Cloves",
          text: "This is the content for card 5",
          image: "/images/5-cloves.jpg",
        },
      ],
    },
    {
      id: "allCarousel",
      cards: [
        {
          title: "Cumin",
          text: "This is the content for card 1",
          image: "/images/1-cumin_seeds.jpg",
        },
        {
          title: "Coriander",
          text: "This is the content for card 2",
          image: "/images/2-coriander_seeds.jpg",
        },
        {
          title: "Cardamom",
          text: "This is the content for card 3",
          image: "/images/3-cardamom_pods.jpg",
        },
        {
          title: "Star Anise",
          text: "This is the content for card 4",
          image: "/images/4-star_anise.jpg",
        },
        {
          title: "Cloves",
          text: "This is the content for card 5",
          image: "/images/5-cloves.jpg",
        },
        {
          title: "Bay Leaves",
          text: "This is the content for card 1",
          image: "/images/6-bay_leaves.jpg",
        },
        {
          title: "Turmeric",
          text: "This is the content for card 2",
          image: "/images/7-turmeric.jpg",
        },
        {
          title: "Paprika",
          text: "This is the content for card 3",
          image: "/images/8-paprika.jpg",
        },
        {
          title: "Cinanmon",
          text: "This is the content for card 4",
          image: "/images/9-cinnamon.jpg",
        },
        {
          title: "Cloves",
          text: "This is the content for card 5",
          image: "/images/10-ginger.jpg",
        },
        {
          title: "Chili",
          text: "This is the content for card 1",
          image: "/images/11-chili.jpg",
        },
        {
          title: "Oregano",
          text: "This is the content for card 2",
          image: "/images/12-oregano.jpg",
        },
        {
          title: "Garam Masala",
          text: "This is the content for card 3",
          image: "/images/13-garammasala.jpg",
        },
        {
          title: "Curry",
          text: "This is the content for card 4",
          image: "/images/14-curry.jpg",
        },
        {
          title: "Taco",
          text: "This is the content for card 5",
          image: "/images/15-taco.jpg",
        },
      ],
    },
    {
      id: "mediterraneanCarousel",
      cards: [
        {
          title: "Card 1",
          text: "This is the content for card 1",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 2",
          text: "This is the content for card 2",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 3",
          text: "This is the content for card 3",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 4",
          text: "This is the content for card 4",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 5",
          text: "This is the content for card 5",
          image: "/images/no_image.jpg",
        },
      ],
    },
    {
      id: "indianCarousel",
      cards: [
        {
          title: "Card 1",
          text: "This is the content for card 1",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 2",
          text: "This is the content for card 2",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 3",
          text: "This is the content for card 3",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 4",
          text: "This is the content for card 4",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 5",
          text: "This is the content for card 5",
          image: "/images/no_image.jpg",
        },
      ],
    },
    {
      id: "asianCarousel",
      cards: [
        {
          title: "Card 1",
          text: "This is the content for card 1",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 2",
          text: "This is the content for card 2",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 3",
          text: "This is the content for card 3",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 4",
          text: "This is the content for card 4",
          image: "/images/no_image.jpg",
        },
        {
          title: "Card 5",
          text: "This is the content for card 5",
          image: "/images/no_image.jpg",
        },
      ],
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
                    ${group.map((card) => `
                        <div class="card" style="width: 18rem; margin-right: 15px;">
                            <img src="${card.image}" class="card-img-top" alt="${card.title}">
                            <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                                <p class="card-text">${card.text}</p>
                            </div>
                        </div>
                        `).join("")}
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
