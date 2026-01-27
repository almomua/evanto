/**
 * Local asset references for the Euphoria design
 * All assets are stored in public/images/ and can be referenced directly
 */

// Product images
export const products = {
  product1: '/images/products/product-1.png',
  product2: '/images/products/product-2.png',
  product3: '/images/products/product-3.png',
  product4: '/images/products/product-4.png',
} as const;

// Category images - Makeup Products
export const makeupCategories = {
  rectangle20: '/images/categories/makeup/rectangle-20.png',
  rectangle21: '/images/categories/makeup/rectangle-21.png',
  rectangle22: '/images/categories/makeup/rectangle-22.png',
  rectangle23: '/images/categories/makeup/rectangle-23.png',
  rectangle24: '/images/categories/makeup/rectangle-24.png',
  rectangle25: '/images/categories/makeup/rectangle-25.png',
  rectangle26: '/images/categories/makeup/rectangle-26.png',
  rectangle27: '/images/categories/makeup/rectangle-27.png',
  rectangle28: '/images/categories/makeup/rectangle-28.png',
  rectangle29: '/images/categories/makeup/rectangle-29.png',
  rectangle30: '/images/categories/makeup/rectangle-30.png',
  rectangle31: '/images/categories/makeup/rectangle-31.png',
  rectangle32: '/images/categories/makeup/rectangle-32.png',
  rectangle33: '/images/categories/makeup/rectangle-33.png',
  rectangle34: '/images/categories/makeup/rectangle-34.png',
  rectangle35: '/images/categories/makeup/rectangle-35.png',
  rectangle36: '/images/categories/makeup/rectangle-36.png',
} as const;

// Category images - Perfume Products
export const perfumeCategories = {
  rectangle37: '/images/categories/perfume/rectangle-37.png',
  rectangle38: '/images/categories/perfume/rectangle-38.png',
  rectangle39: '/images/categories/perfume/rectangle-39.png',
} as const;

// Hero/Banner images
export const heroImages = {
  rectangle13: '/images/hero/rectangle-13.png',
  unsplashBbiuSdck8tu: '/images/hero/unsplash-bbiu-sdck8tu.png',
  shopHero1ProductSlide1: '/images/hero/shop-hero-1-product-slide-1.png',
} as const;

// Big Saving Zone images
export const savingZoneImages = {
  rectangle74: '/images/saving-zone/rectangle-74.png',
  rectangle75: '/images/saving-zone/rectangle-75.png',
  rectangle76: '/images/saving-zone/rectangle-76.png',
  rectangle77: '/images/saving-zone/rectangle-77.png',
  rectangle78: '/images/saving-zone/rectangle-78.png',
  rectangle79: '/images/saving-zone/rectangle-79.png',
} as const;

// New Arrival images
export const newArrivalImages = {
  photographerWhiteBackground: '/images/new-arrival/photographer-white-background.png',
  unsplashQyc13qbgam4: '/images/new-arrival/unsplash-qyc13qbgam4.png',
  unsplashQyc13qbgam5: '/images/new-arrival/unsplash-qyc13qbgam5.png',
  image1: '/images/new-arrival/image-1.png',
  image2: '/images/new-arrival/image-2.png',
} as const;

// Icons
export const icons = {
  icon: '/images/icons/icon.png',
  group10: '/images/icons/group-10.png',
  group11: '/images/icons/group-11.png',
  group12: '/images/icons/group-12.png',
  line5: '/images/icons/line-5.png',
  heart: '/images/icons/heart-icon.png',
  search: '/images/icons/search-icon.png',
  user: '/images/icons/user-icon.png',
  cart: '/images/icons/cart-icon.png',
  vector: '/images/icons/vector-icon.png',
  logoGroup1: '/images/icons/logo-group-1.png',
  logoGroup2: '/images/icons/logo-group-2.png',
  chatbot: '/images/icons/chatbot-icon.png',
} as const;

// Arrows and navigation
export const arrows = {
  arrow1: '/images/arrows/arrow-1.png',
  arrow: '/images/arrows/arrow.png',
  arrow2: '/images/arrows/arrow-2.png',
  arrow3: '/images/arrows/arrow-3.png',
  chevronRight: '/images/arrows/chevron-right.png',
  chevronLeft: '/images/arrows/chevron-left.png',
  arrowLeftFilled: '/images/arrows/arrow-left-filled.png',
} as const;

// Export all assets as a single object for convenience
export const euphoriaAssets = {
  products,
  makeupCategories,
  perfumeCategories,
  heroImages,
  savingZoneImages,
  newArrivalImages,
  icons,
  arrows,
} as const;
