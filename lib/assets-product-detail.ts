// Local asset paths for Product Detail Page
// All assets are stored in public/images/

export const PRODUCT_DETAIL_ASSETS = {
  // Main product image
  mainProduct: "/images/products/product-1.png",
  
  // Similar products
  similar1: "/images/products/product-1.png",
  similar2: "/images/products/product-2.png",
  similar3: "/images/products/product-3.png",
  similar4: "/images/products/product-4.png",
  similar5: "/images/products/product-1.png", // Reusing product1
  similar6: "/images/products/product-2.png", // Reusing product2
  similar7: "/images/products/product-3.png", // Reusing product3
  
  // Feature icons (downloaded from product detail page design - SVG format)
  securePayment: "/images/icons/features/secure-payment.svg",
  sizeFit: "/images/icons/features/size-fit.svg",
  freeShipping: "/images/icons/features/free-shipping.svg",
  freeReturns: "/images/icons/features/free-returns.svg",
  
  // Play button (downloaded from product detail page design - SVG format)
  playButton: "/images/icons/features/play-button.svg",
};

// Mock similar products
export const similarProducts = [
  { id: 'sim-1', name: 'Item', brand: "Priya's Brand", price: 13.00, image: PRODUCT_DETAIL_ASSETS.similar1 },
  { id: 'sim-2', name: 'Item', brand: "Roboto's Brand", price: 127.00, image: PRODUCT_DETAIL_ASSETS.similar2 },
  { id: 'sim-3', name: 'Item', brand: "Jhanvi's Brand", price: 133.00, image: PRODUCT_DETAIL_ASSETS.similar3 },
  { id: 'sim-4', name: 'Item', brand: "Sagar's Brand", price: 79.00, image: PRODUCT_DETAIL_ASSETS.similar4 },
  { id: 'sim-5', name: 'Item', brand: "Jhanvi's Brand", price: 123.00, image: PRODUCT_DETAIL_ASSETS.similar5 },
  { id: 'sim-6', name: 'Item', brand: "H.M's Brand", price: 123.00, image: PRODUCT_DETAIL_ASSETS.similar6 },
  { id: 'sim-7', name: 'Item', brand: "Nike's Brand", price: 123.00, image: PRODUCT_DETAIL_ASSETS.similar7 },
  { id: 'sim-8', name: 'Item', brand: "MOMO's Brand", price: 38.00, image: PRODUCT_DETAIL_ASSETS.similar1 },
];



