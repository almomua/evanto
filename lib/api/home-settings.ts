import api from '@/lib/axios';

// ============== Type Definitions ==============

export interface HomeBanner {
    image: string;
    category: string;
    title: string;
    subtitle: string;
    link: string;
}

export interface HomeSection {
    name: string;
    enabled: boolean;
    order: number;
}

export interface DealCard {
    image: string;
    title1: string;
    title2: string;
    subtitle: string;
}

export interface DealsSection {
    leftCard: DealCard;
    rightCard: DealCard;
}

export interface NewArrivalItem {
    image: string;
    name: string;
}

export interface NewArrivalsSection {
    title: string;
    items: NewArrivalItem[];
}

export interface SavingCard {
    image: string;
    title: string;
    subtitle: string;
    discount: string;
    size: 'small' | 'large';
    link: string;
}

export interface BigSavingZoneSection {
    title: string;
    cards: SavingCard[];
}

export interface EverydayBannerSection {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    leftImage: string;
    rightImage: string;
}

export interface CategoryItem {
    title: string;
    image: string;
    overlay: boolean;
    link: string;
}

export interface CategoryGridSection {
    title: string;
    items: CategoryItem[];
}

export interface BrandItem {
    name: string;
    logo: string;
}

export interface TopBrandsSection {
    title: string;
    subtitle: string;
    discountPercent: number;
    brands: BrandItem[];
}

export interface LimelightSection {
    title: string;
    source: 'featured' | 'category' | 'manual';
    categoryId?: string;
    productIds?: string[];
}

export interface HomeSettings {
    _id?: string;
    sections: HomeSection[];
    heroBanners: HomeBanner[];
    dealsSection: DealsSection;
    newArrivals: NewArrivalsSection;
    bigSavingZone: BigSavingZoneSection;
    everydayBanner: EverydayBannerSection;
    makeupCategories: CategoryGridSection;
    perfumeCategories: CategoryGridSection;
    topBrands: TopBrandsSection;
    limelightProducts: LimelightSection;
}

// ============== API Functions ==============

export const homeSettingsApi = {
    get: async (): Promise<HomeSettings> => {
        const response = await api.get('/home-settings');
        return response.data.data;
    },

    update: async (settings: Partial<HomeSettings>): Promise<HomeSettings> => {
        const response = await api.patch('/home-settings', settings);
        return response.data.data;
    },

    seed: async (): Promise<HomeSettings> => {
        const response = await api.post('/home-settings/seed');
        return response.data.data;
    },

    uploadImage: async (file: File): Promise<{ url: string; publicId: string }> => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/home-settings/upload-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
    },
};
