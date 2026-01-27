// Local asset paths for Products Listing Page
// All assets are stored in public/images/

export const PRODUCT_LISTING_ASSETS = {
  // Product images from the listing page
  product1: "/images/products/product-1.png",
  product2: "/images/products/product-2.png",
  product3: "/images/products/product-3.png",
  product4: "/images/products/product-4.png",
  product5: "/images/products/product-1.png", // Reusing product1
  product6: "/images/products/product-2.png", // Reusing product2
  product7: "/images/products/product-3.png", // Reusing product3
};

// Extended mock products for the listing page
export const listingProducts = [
  {
    id: 'listing-1',
    name: 'Vitamin C Serum',
    brand: "Jhanvi's Brand",
    price: 123.00,
    image: PRODUCT_LISTING_ASSETS.product1,
    category: 'makeup',
  },
  {
    id: 'listing-2',
    name: 'Rose Water Toner',
    brand: "Helen's Brand",
    price: 11.00,
    image: PRODUCT_LISTING_ASSETS.product2,
    category: 'makeup',
  },
  {
    id: 'listing-3',
    name: 'Retinol Night Cream',
    brand: "Nike's Brand",
    price: 119.00,
    image: PRODUCT_LISTING_ASSETS.product3,
    category: 'makeup',
  },
  {
    id: 'listing-4',
    name: 'Hyaluronic Acid',
    brand: "paypal's Brand",
    price: 77.00,
    image: PRODUCT_LISTING_ASSETS.product2,
    category: 'makeup',
  },
  {
    id: 'listing-5',
    name: 'Collagen Boost',
    brand: "woden's Brand",
    price: 29.00,
    image: PRODUCT_LISTING_ASSETS.product3,
    category: 'makeup',
  },
  {
    id: 'listing-6',
    name: 'SPF 50 Sunscreen',
    brand: "MM's Brand",
    price: 37.00,
    image: PRODUCT_LISTING_ASSETS.product4,
    category: 'makeup',
  },
  {
    id: 'listing-7',
    name: 'Niacinamide Serum',
    brand: "Priya's Brand",
    price: 77.00,
    image: PRODUCT_LISTING_ASSETS.product3,
    category: 'makeup',
  },
  {
    id: 'listing-8',
    name: 'AHA BHA Exfoliant',
    brand: "woden's Brand",
    price: 29.00,
    image: PRODUCT_LISTING_ASSETS.product4,
    category: 'makeup',
  },
  {
    id: 'listing-9',
    name: 'Peptide Eye Cream',
    brand: "MM's Brand",
    price: 37.00,
    image: PRODUCT_LISTING_ASSETS.product1,
    category: 'makeup',
  },
  {
    id: 'listing-10',
    name: 'Luxury Face Oil',
    brand: "Nisargi's Brand",
    price: 77.00,
    image: PRODUCT_LISTING_ASSETS.product5,
    category: 'makeup',
  },
  {
    id: 'listing-11',
    name: 'Botanical Essence',
    brand: "Mellon's Brand",
    price: 29.00,
    image: PRODUCT_LISTING_ASSETS.product6,
    category: 'makeup',
  },
  {
    id: 'listing-12',
    name: 'Premium Perfume',
    brand: "AS's Brand",
    price: 37.00,
    image: PRODUCT_LISTING_ASSETS.product7,
    category: 'makeup',
  },
];



