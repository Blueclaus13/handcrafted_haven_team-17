// This file contains placeholder data that we'll replace with real data when database is fully set up and integrated.

import { v4 as uuid4 } from 'uuid';

export const products = [
    {
        id: uuid4(),
        name: "Patchwork Cotton Mother's Quilt",
        price: "$139.90",
        description: "Handmade Mother's Quilt for Sale using a variety of colors, fabrics, and made from 100% cotton.",
        imageUrl: "/images/products/mothers-quilt-small.jpg",
        reviews: [
            {
                score: 4.6,
                summary: "I love this quilt. It is so soft and perfect for when it gets cold outside"
            },
            {
                score: 4.9,
                summary: "This quilt is just like the one my mom knitted when I was younger. The quality and comfort of this quilt is unmatched by any of the other blankets I have at home"
            }
        ],
        sellerId: "3a3ec7bc-5c17-43e9-adbc-0af12cc025ef"
    },
    {
        id: uuid4(),
        name: "Brown Leather Handbag",
        price: "$89.00",
        description: "Authentic 100% Brown Leather handbag with gold chain handle.",
        imageUrl: "/images/products/leather-handbag.jpg",
        reviews: [
            {
                score: 4.4,
                summary: "Great quality handbag with lots of space. Feels a little overpriced compared to other leather handbags I've owned."
            }
        ],
        sellerId: "3a3ec7bc-5c17-43e9-adbc-0af12cc025ef"
    },
    {
        id: uuid4(),
        name: "Waves by Simon Painter",
        price: "$249.50",
        description: "Beautiful painting of ocean waves by talented artist Simon Painter.",
        imageUrl: "/images/products/water-art.jpg",
        reviews: [
            {
                score: 4.1,
                summary: "Art is beautiful but a little overpriced."
            },
            {
                score: 5.0,
                summary: "I feel so at peace having this art up on my wall. I would highly recommend adding it to your home decor."
            },
            {
                score: 3.9,
                summary: "I would rate higher, but it took a really long time to deliver. Good painting, though."
            }
        ],
        sellerId: "75588e6f-aaf0-4942-bce6-d8fc885b6109"
    },
    {
        id: uuid4(),
        name: "Country Mountains by Simon Painter",
        price: "$229.60",
        description: "Breathtaking and nostalgic mountain range perfect for any room in your home by artist, Simon Painter.",
        imageUrl: "/images/products/mountain-range-art.jpg",
        reviews: [
            {
                score: 4.5,
                summary: "This painting looks perfect over my fireplace mantle. Wish they offered a slightly bigger size."
            }
        ],
        sellerId: "75588e6f-aaf0-4942-bce6-d8fc885b6109"
    },
    {
        id: uuid4(),
        name: "Sapphire Crescent Moon Necklace",
        price: "$129.90",
        description: "Handcrafted gold crescent moon necklace with sapphire.",
        imageUrl: "/images/products/crescent-necklace.jpg",
        reviews: [
            {
                score: 3.2,
                summary: "I really loved this necklace when I first got it, but the chain broke really easily after only a few months of wearing it"
            },
            {
                score: 4.0,
                summary: "Bought this for my girlfriend and she really liked it, but it took longer to ship than estimated on the website."
            }
        ],
        sellerId: "a9f1c18a-34b6-4e9e-84cb-1d3a30fd6f2e"
    },
    {
        id: uuid4(),
        name: "Mens 5K Rosegold Wedding Band",
        price: "$400.00",
        description: "Authentic gold wedding band with comfortable fit for men.",
        imageUrl: "/images/products/gold-ring.jpg",
        reviews: [
            {
                score: 4.6,
                summary: "Fits really well and matches my wife's rose gold band.",
            }
        ],
        sellerId: "b0f5bd9e-6392-4f3f-9a49-54b1a8ed8c03"
    },
    {
        id: uuid4(),
        name: "Ivory Stone Vase",
        price: "$74.00",
        description: "Vintage Artisan crafted Ivory stone vase, ",
        imageUrl: "/images/products/vase.jpg",
        reviews: [
            {
                score: 5.0,
                summary: "This vase looks beautiful in my living room, and the price for the quality is just fantastic.",
            }
        ],
        sellerId: "c6a596d5-c9a7-424e-a384-d57ae319a4e8"
    },
    {
        id: uuid4(),
        name: "9 Piece Wooden Dish Set",
        price: "$213.75",
        description: "Artisan crafted natural wood 9 piece dish set comes with 3 bowls, 5 plates, and 1 shallow plate.",
        imageUrl: "/images/products/wood-dish-set.jpg",
        reviews: [
            {
                score: 4.3,
                summary: "I like the look of this set, but they are all small, so I don't have many opportunities to use them. They are just a decoration at this point.",
            }
        ],
        sellerId: "c6a596d5-c9a7-424e-a384-d57ae319a4e8"
    }
]