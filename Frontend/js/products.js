const products = [
    {
        id: "product_cuminSeeds",
        name: "Cumin Seeds",
        subheading: "Earthy, Bold, Essential",
        description: "A cornerstone of countless cuisines, these aromatic seeds bring a nutty warmth to curries, stews, and roasted veggies. Toast them lightly to unlock their smoky magic.<br><br>"+
            "<strong>Dishes:</strong> Indian dal, Mexican chili, roasted carrots.<br>" +
            "<strong>Usage Tip:</strong> Bloom cumin seeds in hot oil before adding other ingredients — it intensifies their flavor!<br>" +
            "<strong>Pairs well with:</strong> Coriander seeds, turmeric, paprika.",
        image: "/Frontend/images/1-cumin_seeds.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_cuminSeeds",
        cuisine: ["Indian", "Mediteranean", "Latin American"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 35 },
            { size: "100 g", price: 65 },
            { size: "1 kg", price: 300 }
        ]
    },
    {
        id: "product_corianderSeeds",
        name: "Coriander Seeds",
        subheading: "Citrusy and Subtle",
        description: "With delicate lemony notes, coriander seeds add a bright, floral touch to spice blends, pickles, and slow-cooked dishes. Crush them fresh for a fragrant burst of flavor.<br><br>"+
            "<strong>Dishes:</strong> Pickled vegetables, Moroccan tagine, spiced rubs for meat.<br>"+
            "<strong>Usage Tip:</strong> Lightly crush coriander seeds to release their oils and boost their aroma.<br>"+
            "<strong>Pairs well with:</strong> Cumin seeds, cinnamon, bay leaves.",
        image: "/Frontend/images/2-coriander_seeds.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_corianderSeeds",
        cuisine: ["Indian", "Mediterranean", "Latin American"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 35 },
            { size: "100 g", price: 65 },
            { size: "1 kg", price: 300 }
        ]
    },
    {
        id: "product_cardamonPods",
        name: "Cardamom Pods",
        subheading: "The Jewel of Spices",
        description: "Sweet, citrusy, with a hint of mint — these vibrant green pods elevate both sweet and savory dishes. Add them to rice, tea, or even desserts for a bold, exotic flair.<br><br>"+
            "<strong>Dishes:</strong> Basmati rice, masala chai, cardamom buns.<br>"+
            "<strong>Usage Tip:</strong> Gently crack open the pods to release the tiny black seeds — that’s where the magic lives!<br>"+
            "<strong>Pairs well with:</strong> Cinnamon, cloves, star anise.",
        image: "/Frontend/images/3-cardamom_pods.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_cardamonPods",
        cuisine: ["Indian"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 100 },
            { size: "100 g", price: 200 },
            { size: "1 kg", price: 1000 }
        ]
    },
    {
        id: "product_starAnis",
        name: "Star Anise",
        subheading: "A Star of Bold Flavors",
        description: "Intensely aromatic and slightly sweet, star anise adds depth to broths, braises, and spice blends. Perfect for crafting rich curries or Asian-inspired dishes.<br><br>"+
            "<strong>Dishes:</strong> Pho broth, Chinese braised pork, spiced mulled wine.<br>"+
            "<strong>Usage Tip:</strong> Add whole star anise to slow-cooked dishes and remove before serving — a little goes a long way!<br>"+
            "<strong>Pairs well with:</strong> Cardamom pods, cloves, cinnamon.",
        image: "/Frontend/images/4-star_anise.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_starAnis",
        cuisine: ["Asian"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 90 },
            { size: "100 g", price: 180 },
            { size: "1 kg", price: 900 }
        ]
    },
    {
        id: "product_cloves",
        name: "Cloves",
        subheading: "Sweet Heat in a Bud",
        description: "Pungent and warm, these handpicked cloves bring bold spice to marinades, baked goods, and mulled drinks. Add a pinch to unlock their powerful aroma.<br><br>"+
            "<strong>Dishes:</strong> Biryani, baked ham, Arroz con Leche<br>"+
            "<strong>Usage Tip:</strong> Stud an onion with cloves and simmer in broths or sauces for subtle, spicy undertones.<br>"+
            "<strong>Pairs well with:</strong> Cinnamon, star anise, cardamom pods.",
        image: "/Frontend/images/5-cloves.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_cloves",
        cuisine: ["Indian", "Mediterranean", "Latin American"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 60 },
            { size: "100 g", price: 120 },
            { size: "1 kg", price: 450 }
        ]
    },
    {
        id: "product_bayLeaves",
        name: "Bay Leaves",
        subheading: "The Quiet Hero",
        description: "Subtle but essential, bay leaves add a herbal, slightly floral undertone to soups, stews, and sauces. Simmer gently and let their fragrance shine.<br><br>"+
            "<strong>Dishes:</strong> Beef stew, tomato sauce, lentil soup.<br>"+
            "<strong>Usage Tip:</strong> Add bay leaves early in cooking and remove before serving — they flavor the dish without overpowering it.<br>"+
            "<strong>Pairs well with:</strong> Thyme, coriander seeds, cloves.",
        image: "/Frontend/images/6-bay_leaves.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_bayLeaves",
        cuisine: ["Indian", "Mediteranean", "Latin American"],
        type: "Whole",
        sizes: [
            { size: "50 g", price: 45 },
            { size: "100 g", price: 90 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_turmeric",
        name: "Turmeric Powder",
        subheading: "Golden and Glorious",
        description: "Earthy, peppery, and bold — turmeric brings a vibrant yellow hue and warm flavor to curries, soups, and golden lattes. A must-have for every spice rack.<br><br>"+
            "<strong>Dishes:</strong> Golden milk, Indian curries, roasted cauliflower.<br>"+
            "<strong>Usage Tip:</strong> Pair turmeric with black pepper — it boosts curcumin absorption, unlocking its health benefits!<br>"+
            "<strong>Pairs well with:</strong> Cumin seeds, ginger, curry powder.",
        image: "/Frontend/images/7-turmeric.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_turmeric",
        cuisine: ["Indian"],
        type: "Ground",
        sizes: [
            { size: "50 g", price: 40 },
            { size: "100 g", price: 75 },
            { size: "1 kg", price: 320 }
        ]
    },
    {
        id: "product_paprika",
        name: "Paprika",
        subheading: "Smoky or Sweet, Always Bold",
        description: "A splash of rich color and a touch of heat — this paprika adds smoky depth to roasted veggies, stews, or even popcorn. A sprinkle goes a long way!<br><br>"+
            "<strong>Dishes:</strong> Spanish paella, Hungarian goulash, BBQ rubs.<br>"+
            "<strong>Usage Tip:</strong> Mix paprika with olive oil to create a smoky marinade for grilled meats.<br>"+
            "<strong>Pairs well with:</strong> Cumin seeds, oregano, chili powder.",
        image: "/Frontend/images/8-paprika.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_paprika",
        cuisine: ["Mediterranean", "Indian", "Latin American"],
        type: "Ground",
        sizes: [
            { size: "50 g", price: 40 },
            { size: "100 g", price: 80 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_cinnamon",
        name: "Cinnamon Powder",
        subheading: "Warm and Comforting",
        description: "Sweet yet spicy, our cinnamon powder brings cozy flavor to oatmeal, desserts, and even savory dishes. It is like a hug for your taste buds.<br><br>"+
            "<strong>Dishes:</strong> Moroccan tagine, cinnamon rolls, pumpkin soup.<br>"+
            "<strong>Usage Tip:</strong> Sprinkle cinnamon into coffee or hot chocolate for a subtle, spiced kick.<br>"+
            "<strong>Pairs well with:</strong> Cardamom, cloves, ginger powder.",
        image: "/Frontend/images/9-cinnamon.jpg" ,
        cuisine: ["Mediterranean", "Indian", "Latin American"],
        link: "/Frontend/pages/product_description_generel.html?productId=product_cinnamon",
        type: "Ground",
        sizes: [
            { size: "50 g", price: 50 },
            { size: "100 g", price: 95 },
            { size: "1 kg", price: 375 }
        ]
    },
    {
        id: "product_ginger",
        name: "Ginger Powder",
        subheading: "Zesty and Bright",
        description: "Spicy, sharp, and slightly sweet — this powder adds a fiery kick to curries, baked goods, and marinades. Perfect for both warmth and bite.<br><br>"+
            "<strong>Dishes:</strong> Ginger cookies, carrot soup, spiced marinades.<br>"+
            "<strong>Usage Tip:</strong> Combine with garlic and soy sauce for an easy, flavor-packed stir-fry sauce.<br>"+
            "<strong>Pairs well with:</strong> Turmeric, cinnamon, chili powder.",
        image: "/Frontend/images/10-ginger.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_ginger",
        cuisine: ["Indian", "Asian"],
        type: "Ground",
        sizes: [
            { size: "50 g", price: 40 },
            { size: "100 g", price: 80 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_chili",
        name: "Chili Powder",
        subheading: "A Fiery Essential",
        description: "Bold, smoky, and hot — this blend of dried chilies adds spice to tacos, curries, and rubs. Adjust the heat to your taste and turn up the flavor.<br><br>"+
            "<strong>Dishes:</strong> Tacos, chili con carne, spicy pasta sauce.<br>"+
            "<strong>Usage Tip:</strong> Add chili powder early in cooking for a subtle heat or sprinkle it at the end for a spicy punch.<br>"+
            "<strong>Pairs well with:</strong> Paprika, cumin seeds, oregano.",
        image: "/Frontend/images/11-chili.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_chili",
        cuisine: ["Latin American"],
        type: "Ground",
        sizes: [
            { size: "50 g", price: 45 },
            { size: "100 g", price: 85 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_oregano",
        name: "Oregano",
        subheading: "Herbal and Bold",
        description: "Fragrant and earthy, oregano adds a Mediterranean punch to sauces, roasted meats, and pizza. Sprinkle liberally and savor the boldness.<br><br>"+
            "<strong>Dishes:</strong> Greek salad, tomato sauce, roast lamb.<br>"+
            "<strong>Usage Tip:</strong> Crush dried oregano between your fingers before using — it releases the essential oils for more aroma!<br>"+
            "<strong>Pairs well with:</strong> Paprika, garlic powder, bay leaves.",
        image: "/Frontend/images/12-oregano.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_oregano", 
        cuisine: ["Mediterranean"],
        type: "Ground",
        sizes: [
            { size: "50 g", price: 40 },
            { size: "100 g", price: 80 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_garamMasala",
        name: "Garam Masala",
        subheading: "Warmth and Complexity",
        description: "A classic Indian blend of roasted spices — cumin, cinnamon, and cardamom — adding bold, layered flavor to curries, soups, and roasted dishes.<br><br>"+
            "<strong>Dishes:</strong> Butter chicken, lentil curry, roasted vegetables.<br>"+
            "<strong>Usage Tip:</strong> Add garam masala at the end of cooking for a fragrant finish — it’s all about capturing those bold aromas!<br>"+
            "<strong>Pairs well with:</strong> Turmeric, ginger powder, bay leaves.",
        image: "/Frontend/images/13-garammasala.jpg",
        link: "/Frontend/pages/product_description_generel.html?productId=product_garamMasala",
        cuisine: "Indian",
        type: "Blend",
        sizes: [
            { size: "50 g", price: 60 },
            { size: "100 g", price: 120 },
            { size: "1 kg", price: 400 }
        ]
    },
    {
        id: "product_curry",
        name: "Curry",
        subheading: "Sunshine in a Jar",
        description: "A perfect balance of turmeric, coriander, and spices, this vibrant blend adds warmth and depth to curries, stews, and marinades.<br><br>"+
            "<strong>Dishes:</strong> Chicken curry, curried cauliflower, spiced soups.<br>"+
            "<strong>Usage Tip:</strong> Sauté curry powder in oil or butter to unlock its full flavor before adding other ingredients.<br>"+
            "<strong>Pairs well with:</strong> Bay leaves, cinnamon, ginger powder.",
        image: "/Frontend/images/14-curry.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_curry",
        cuisine: ["Indian", "Asian"],
        type: "Blend",
        sizes: [
            { size: "50 g", price: 45 },
            { size: "100 g", price: 85 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_taco",
        name: "Taco Seasoning",
        subheading: "Fiesta in Every Bite",
        description: "Smoky paprika, garlic, cumin, and chili powder — this bold blend turns any dish into a Tex-Mex celebration. Tacos tonight? Yes, please!<br><br>"+
            "<strong>Dishes:</strong> Beef tacos, fajitas, Mexican rice.<br>"+
            "<strong>Usage Tip:</strong> Mix taco seasoning with a splash of lime juice for a quick and flavorful marinade.<br>"+
            "<strong>Pairs well with:</strong> Coriander seeds, paprika, oregano.",
        image: "/Frontend/images/15-taco.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_taco",
        cuisine: ["Latin American"],
        type: "Blend",
        sizes: [
            { size: "50 g", price: 45 },
            { size: "100 g", price: 85 },
            { size: "1 kg", price: 350 }
        ]
    },
    {
        id: "product_zaatar",
        name: "Za’atar",
        subheading: "Herbaceous and Tangy",
        description: "A Middle Eastern classic — thyme, sumac, and sesame seeds — adding a nutty, lemony twist to roasted veggies, flatbreads, and dips.<br><br>"+
            "<strong>Dishes:</strong> Manakish (za’atar flatbread), roasted eggplant, hummus drizzle.<br>"+
            "<strong>Usage Tip:</strong> Mix za’atar with olive oil and brush it over pita bread for an easy, delicious snack.<br>"+
            "<strong>Pairs well with:</strong> Oregano, paprika, coriander seeds.",
        image: "/Frontend/images/16-zaatar.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_zaatar",
        cuisine: ["Mediteranean"],
        type: "Blend",
        sizes: [
            { size: "50 g", price: 60 },
            { size: "100 g", price: 110 },
            { size: "1 kg", price: 500 }
        ]
    },
    {
        id: "product_chineseFiveSpice",
        name: "Chinese Five-Spice",
        subheading: "Bold and Balanced",
        description: "A punchy mix of star anise, cloves, and cinnamon — the perfect balance of sweet, savory, and spicy for your stir-fries, braises, and roasted meats.<br><br>"+
            "<strong>Dishes:</strong> Peking duck, spiced pork ribs, vegetable stir-fry.<br>"+
            "<strong>Usage Tip:</strong> Rub five-spice powder onto meat before roasting for a sweet-savory crust.<br>"+
            "<strong>Pairs well with:</strong> Ginger powder, bay leaves, chili powder.",
        image: "/Frontend/images/17-chinese_five_spice.jpg",
        link: "/Frontend/pages/product_description_generel.html?productId=product_chineseFiveSpice",
        cuisine: ["Asian"],
        type: "Blend",
        sizes: [
            { size: "50 g", price: 60 },
            { size: "100 g", price: 110 },
            { size: "1 kg", price: 500 }
        ]
    },
    {
        id: "product_rasElHanout",
        name: "Ras el Hanout",
        subheading: "The King of Spice Blends",
        description: "A Moroccan masterpiece — a complex mix of warm spices like cumin, cinnamon, and paprika — adding rich depth to tagines, couscous, and grilled dishes.<br><br>"+
            "<strong>Dishes:</strong> Moroccan lamb tagine, roasted carrots, spiced couscous.<br>"+
            "<strong>Usage Tip:</strong> Stir Ras el Hanout into olive oil for a flavorful marinade or dressing.<br>"+
            "<strong>Pairs well with:</strong> Turmeric, cinnamon, bay leaves.",
        image: "/Frontend/images/18-ras_el_hanout.jpg" ,
        link: "/Frontend/pages/product_description_generel.html?productId=product_rasElHanout",
        cuisine: ["Mediteranean"],
        type: "Blend",
        sizes: [
            { size: "50 g", price: 70 },
            { size: "100 g", price: 120 },
            { size: "1 kg", price: 650 }
        ]
    }
];