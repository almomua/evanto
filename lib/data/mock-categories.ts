export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export const mockMakeupCategories: Category[] = [
  { id: '1', name: 'Foundation', slug: 'foundation', image: '/images/categories/foundation.jpg', productCount: 45 },
  { id: '2', name: 'Concealer', slug: 'concealer', image: '/images/categories/concealer.jpg', productCount: 32 },
  { id: '3', name: 'Blush', slug: 'blush', image: '/images/categories/blush.jpg', productCount: 28 },
  { id: '4', name: 'Highlighter', slug: 'highlighter', image: '/images/categories/highlighter.jpg', productCount: 24 },
  { id: '5', name: 'Mascara', slug: 'mascara', image: '/images/categories/mascara.jpg', productCount: 38 },
  { id: '6', name: 'Lip Gloss', slug: 'lip-gloss', image: '/images/categories/lip-gloss.jpg', productCount: 52 },
  { id: '7', name: 'Eyeshadow', slug: 'eyeshadow', image: '/images/categories/eyeshadow.jpg', productCount: 67 },
  { id: '8', name: 'Setting Spray', slug: 'setting-spray', image: '/images/categories/setting-spray.jpg', productCount: 18 },
];

export const mockPerfumeCategories: Category[] = [
  { id: '9', name: 'Everyday Floral', slug: 'everyday-floral', image: '/images/categories/perfume-floral.jpg', productCount: 34 },
  { id: '10', name: 'Sensual Evening', slug: 'sensual-evening', image: '/images/categories/perfume-evening.jpg', productCount: 28 },
  { id: '11', name: 'Earthy Unisex', slug: 'earthy-unisex', image: '/images/categories/perfume-earthy.jpg', productCount: 22 },
  { id: '12', name: 'Abstract', slug: 'abstract', image: '/images/categories/perfume-abstract.jpg', productCount: 19 },
];

export const allCategories: Category[] = [...mockMakeupCategories, ...mockPerfumeCategories];

export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(allCategories), 300);
  });
};

export const getMakeupCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMakeupCategories), 300);
  });
};

export const getPerfumeCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPerfumeCategories), 300);
  });
};

export const getCategoryBySlug = (slug: string): Promise<Category | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(allCategories.find((c) => c.slug === slug)), 200);
  });
};

