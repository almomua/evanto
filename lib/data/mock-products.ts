export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export const mockProducts: Product[] = [
  // Limelight Products
  {
    id: '1',
    name: 'Classic Lipstick',
    brand: 'Chanel Brand',
    price: 12.00,
    image: '/images/products/lipstick.jpg',
    category: 'makeup',
    description: 'A timeless classic lipstick with rich, long-lasting color.',
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Night Repair Serum',
    brand: 'Estée Lauder Brand',
    price: 37.00,
    image: '/images/products/serum.jpg',
    category: 'skincare',
    description: 'Advanced night repair serum for youthful, radiant skin.',
    inStock: true,
    rating: 4.9,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Moisturizing Cream',
    brand: 'CeraVe Brand',
    price: 37.00,
    image: '/images/products/cream.jpg',
    category: 'skincare',
    description: 'Daily moisturizing cream with essential ceramides.',
    inStock: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: '4',
    name: 'Hair Perfector',
    brand: 'Olaplex Brand',
    price: 19.00,
    image: '/images/products/hair-perfector.jpg',
    category: 'haircare',
    description: 'Bond-building treatment for stronger, healthier hair.',
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
  // Additional products
  {
    id: '5',
    name: 'Foundation SPF 30',
    brand: 'MAC Cosmetics',
    price: 45.00,
    originalPrice: 55.00,
    image: '/images/products/foundation.jpg',
    category: 'makeup',
    description: 'Full coverage foundation with sun protection.',
    inStock: true,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: '6',
    name: 'Vitamin C Serum',
    brand: 'The Ordinary',
    price: 15.00,
    image: '/images/products/vitamin-c.jpg',
    category: 'skincare',
    description: 'Brightening serum with pure Vitamin C.',
    inStock: true,
    rating: 4.5,
    reviews: 445,
  },
  {
    id: '7',
    name: 'Floral Perfume',
    brand: 'Dior',
    price: 89.00,
    image: '/images/products/perfume-floral.jpg',
    category: 'perfume',
    description: 'Elegant floral fragrance for everyday wear.',
    inStock: true,
    rating: 4.8,
    reviews: 167,
  },
  {
    id: '8',
    name: 'Mascara Volume',
    brand: 'Maybelline',
    price: 12.00,
    image: '/images/products/mascara.jpg',
    category: 'makeup',
    description: 'Volumizing mascara for dramatic lashes.',
    inStock: true,
    rating: 4.4,
    reviews: 523,
  },
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts.find((p) => p.id === id)), 300);
  });
};

export const getProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockProducts.filter((p) => p.category === category)),
      400
    );
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts.slice(0, 4)), 300);
  });
};



