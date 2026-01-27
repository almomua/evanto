'use client';

import { useState, useEffect } from 'react';
import {
    homeSettingsApi,
    HomeSettings,
    HomeBanner,
    DealCard,
    NewArrivalItem,
    SavingCard,
    CategoryItem,
    BrandItem
} from '@/lib/api/home-settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Plus, Trash2, GripVertical, Save, RefreshCcw, ChevronDown, ChevronUp,
    Image as ImageIcon, Type, Layout, Sparkles, ShoppingBag, Star
} from 'lucide-react';

// ============== Accordion Component ==============
function Accordion({
    title,
    icon: Icon,
    children,
    defaultOpen = false
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Card>
            <CardHeader
                className="cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#8A33FD]" />
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </CardHeader>
            {isOpen && <CardContent>{children}</CardContent>}
        </Card>
    );
}

// ============== Main Component ==============
export default function HomeLayoutPage() {
    const [settings, setSettings] = useState<HomeSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setIsLoading(true);
            const data = await homeSettingsApi.get();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            alert('Failed to load home page settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;
        try {
            setIsSaving(true);
            await homeSettingsApi.update(settings);
            alert('Home page settings updated successfully!');
        } catch (error) {
            console.error('Failed to update settings:', error);
            alert('Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    // ============== Section Visibility ==============
    const toggleSection = (index: number) => {
        if (!settings) return;
        const newSections = [...settings.sections];
        newSections[index] = { ...newSections[index], enabled: !newSections[index].enabled };
        setSettings({ ...settings, sections: newSections });
    };

    // ============== Hero Banners ==============
    const updateBanner = (index: number, field: keyof HomeBanner, value: string) => {
        if (!settings) return;
        const newBanners = [...settings.heroBanners];
        newBanners[index] = { ...newBanners[index], [field]: value };
        setSettings({ ...settings, heroBanners: newBanners });
    };

    const addBanner = () => {
        if (!settings) return;
        const newBanner: HomeBanner = {
            image: '',
            category: 'New Category',
            title: 'BANNER TITLE',
            subtitle: 'Subtitle text here',
            link: '/products'
        };
        setSettings({ ...settings, heroBanners: [...settings.heroBanners, newBanner] });
    };

    const removeBanner = (index: number) => {
        if (!settings) return;
        setSettings({ ...settings, heroBanners: settings.heroBanners.filter((_, i) => i !== index) });
    };

    // ============== Deals Section ==============
    const updateDealCard = (side: 'leftCard' | 'rightCard', field: keyof DealCard, value: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            dealsSection: {
                ...settings.dealsSection,
                [side]: { ...settings.dealsSection[side], [field]: value }
            }
        });
    };

    // ============== New Arrivals ==============
    const updateNewArrival = (index: number, field: keyof NewArrivalItem, value: string) => {
        if (!settings) return;
        const items = [...settings.newArrivals.items];
        items[index] = { ...items[index], [field]: value };
        setSettings({ ...settings, newArrivals: { ...settings.newArrivals, items } });
    };

    const addNewArrival = () => {
        if (!settings) return;
        setSettings({
            ...settings,
            newArrivals: {
                ...settings.newArrivals,
                items: [...settings.newArrivals.items, { image: '', name: '' }]
            }
        });
    };

    const removeNewArrival = (index: number) => {
        if (!settings) return;
        setSettings({
            ...settings,
            newArrivals: {
                ...settings.newArrivals,
                items: settings.newArrivals.items.filter((_, i) => i !== index)
            }
        });
    };

    // ============== Big Saving Zone ==============
    const updateSavingCard = (index: number, field: keyof SavingCard, value: string) => {
        if (!settings) return;
        const cards = [...settings.bigSavingZone.cards];
        cards[index] = { ...cards[index], [field]: value };
        setSettings({ ...settings, bigSavingZone: { ...settings.bigSavingZone, cards } });
    };

    const addSavingCard = () => {
        if (!settings) return;
        const newCard: SavingCard = {
            image: '', title: 'New Title', subtitle: 'Subtitle',
            discount: 'UPTO 50% OFF', size: 'small', link: '/products'
        };
        setSettings({
            ...settings,
            bigSavingZone: { ...settings.bigSavingZone, cards: [...settings.bigSavingZone.cards, newCard] }
        });
    };

    const removeSavingCard = (index: number) => {
        if (!settings) return;
        setSettings({
            ...settings,
            bigSavingZone: {
                ...settings.bigSavingZone,
                cards: settings.bigSavingZone.cards.filter((_, i) => i !== index)
            }
        });
    };

    // ============== Category Items (Makeup/Perfume) ==============
    const updateCategoryItem = (
        section: 'makeupCategories' | 'perfumeCategories',
        index: number,
        field: keyof CategoryItem,
        value: string | boolean
    ) => {
        if (!settings) return;
        const items = [...settings[section].items];
        items[index] = { ...items[index], [field]: value };
        setSettings({ ...settings, [section]: { ...settings[section], items } });
    };

    const addCategoryItem = (section: 'makeupCategories' | 'perfumeCategories') => {
        if (!settings) return;
        const newItem: CategoryItem = { title: 'New Category', image: '', overlay: false, link: '/products' };
        setSettings({
            ...settings,
            [section]: { ...settings[section], items: [...settings[section].items, newItem] }
        });
    };

    const removeCategoryItem = (section: 'makeupCategories' | 'perfumeCategories', index: number) => {
        if (!settings) return;
        setSettings({
            ...settings,
            [section]: { ...settings[section], items: settings[section].items.filter((_, i) => i !== index) }
        });
    };

    // ============== Top Brands ==============
    const updateBrand = (index: number, field: keyof BrandItem, value: string) => {
        if (!settings) return;
        const brands = [...settings.topBrands.brands];
        brands[index] = { ...brands[index], [field]: value };
        setSettings({ ...settings, topBrands: { ...settings.topBrands, brands } });
    };

    const addBrand = () => {
        if (!settings) return;
        setSettings({
            ...settings,
            topBrands: { ...settings.topBrands, brands: [...settings.topBrands.brands, { name: '', logo: '' }] }
        });
    };

    const removeBrand = (index: number) => {
        if (!settings) return;
        setSettings({
            ...settings,
            topBrands: { ...settings.topBrands, brands: settings.topBrands.brands.filter((_, i) => i !== index) }
        });
    };

    // ============== Loading State ==============
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCcw className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!settings) return null;

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-4 border-b">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
                    <p className="text-gray-500">Manage all sections, banners, and content.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    {isSaving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save All Changes
                </Button>
            </div>

            {/* 1. Section Visibility */}
            <Accordion title="Section Visibility & Order" icon={Layout} defaultOpen>
                <div className="divide-y">
                    {(settings.sections || []).map((section, index) => (
                        <div key={section.name} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <GripVertical className="text-gray-400 w-5 h-5 cursor-grab" />
                                <span className="font-medium">{section.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            <Switch checked={section.enabled} onCheckedChange={() => toggleSection(index)} />
                        </div>
                    ))}
                </div>
            </Accordion>

            {/* 2. Hero Banners */}
            <Accordion title="Hero Banners (Slider)" icon={ImageIcon}>
                <div className="space-y-4">
                    {settings.heroBanners.map((banner, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3 relative bg-gray-50/50">
                            <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500" onClick={() => removeBanner(index)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><Label>Title</Label><Input value={banner.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBanner(index, 'title', e.target.value)} /></div>
                                <div><Label>Category Tag</Label><Input value={banner.category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBanner(index, 'category', e.target.value)} /></div>
                                <div><Label>Subtitle</Label><Input value={banner.subtitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBanner(index, 'subtitle', e.target.value)} /></div>
                                <div><Label>Link</Label><Input value={banner.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBanner(index, 'link', e.target.value)} /></div>
                                <div className="col-span-2"><Label>Image URL</Label><Input value={banner.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBanner(index, 'image', e.target.value)} placeholder="https://..." /></div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={addBanner} className="w-full gap-2 border-dashed">
                        <Plus className="w-4 h-4" /> Add Banner Slide
                    </Button>
                </div>
            </Accordion>

            {/* 3. Deals Section */}
            <Accordion title="Deals Section (Two Cards)" icon={Sparkles}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(['leftCard', 'rightCard'] as const).map((side) => (
                        <div key={side} className="p-4 border rounded-lg space-y-3">
                            <h4 className="font-semibold">{side === 'leftCard' ? 'Left Card' : 'Right Card'}</h4>
                            <div><Label>Title Line 1</Label><Input value={settings.dealsSection?.[side]?.title1 || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDealCard(side, 'title1', e.target.value)} /></div>
                            <div><Label>Title Line 2</Label><Input value={settings.dealsSection?.[side]?.title2 || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDealCard(side, 'title2', e.target.value)} /></div>
                            <div><Label>Subtitle</Label><Input value={settings.dealsSection?.[side]?.subtitle || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDealCard(side, 'subtitle', e.target.value)} /></div>
                            <div><Label>Image URL</Label><Input value={settings.dealsSection?.[side]?.image || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDealCard(side, 'image', e.target.value)} /></div>
                        </div>
                    ))}
                </div>
            </Accordion>

            {/* 4. New Arrivals */}
            <Accordion title="New Arrivals" icon={ShoppingBag}>
                <div className="space-y-4">
                    <div><Label>Section Title</Label><Input value={settings.newArrivals?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, newArrivals: { ...settings.newArrivals, title: e.target.value } })} /></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(settings.newArrivals?.items || []).map((item, index) => (
                            <div key={index} className="p-3 border rounded-lg space-y-2 relative">
                                <Button variant="ghost" size="sm" className="absolute -top-2 -right-2 text-red-500 h-6 w-6 p-0" onClick={() => removeNewArrival(index)}><Trash2 className="w-3 h-3" /></Button>
                                <div><Label className="text-xs">Name</Label><Input value={item.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewArrival(index, 'name', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Image URL</Label><Input value={item.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewArrival(index, 'image', e.target.value)} className="h-8 text-sm" /></div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={addNewArrival} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Item</Button>
                </div>
            </Accordion>

            {/* 5. Big Saving Zone */}
            <Accordion title="Big Saving Zone" icon={Sparkles}>
                <div className="space-y-4">
                    <div><Label>Section Title</Label><Input value={settings.bigSavingZone?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, bigSavingZone: { ...settings.bigSavingZone, title: e.target.value } })} /></div>
                    {(settings.bigSavingZone?.cards || []).map((card, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3 relative bg-gray-50/50">
                            <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500" onClick={() => removeSavingCard(index)}><Trash2 className="w-4 h-4" /></Button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><Label>Title</Label><Input value={card.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSavingCard(index, 'title', e.target.value)} /></div>
                                <div><Label>Subtitle</Label><Input value={card.subtitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSavingCard(index, 'subtitle', e.target.value)} /></div>
                                <div><Label>Discount Text</Label><Input value={card.discount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSavingCard(index, 'discount', e.target.value)} /></div>
                                <div>
                                    <Label>Size</Label>
                                    <select
                                        value={card.size}
                                        onChange={(e) => updateSavingCard(index, 'size', e.target.value)}
                                        className="w-full h-10 rounded-md border px-3"
                                    >
                                        <option value="small">Small (Top Row)</option>
                                        <option value="large">Large (Bottom Row)</option>
                                    </select>
                                </div>
                                <div className="col-span-2"><Label>Image URL</Label><Input value={card.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSavingCard(index, 'image', e.target.value)} /></div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={addSavingCard} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Card</Button>
                </div>
            </Accordion>

            {/* 6. Everyday Banner */}
            <Accordion title="Everyday Banner" icon={Type}>
                <div className="space-y-4">
                    <div><Label>Title</Label><Input value={settings.everydayBanner?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, title: e.target.value } })} /></div>
                    <div><Label>Description</Label><textarea className="w-full border rounded-md p-3 min-h-[80px]" value={settings.everydayBanner?.description || ''} onChange={(e) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, description: e.target.value } })} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label>Button Text</Label><Input value={settings.everydayBanner?.buttonText || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, buttonText: e.target.value } })} /></div>
                        <div><Label>Button Link</Label><Input value={settings.everydayBanner?.buttonLink || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, buttonLink: e.target.value } })} /></div>
                        <div><Label>Left Image URL</Label><Input value={settings.everydayBanner?.leftImage || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, leftImage: e.target.value } })} /></div>
                        <div><Label>Right Image URL</Label><Input value={settings.everydayBanner?.rightImage || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, everydayBanner: { ...settings.everydayBanner, rightImage: e.target.value } })} /></div>
                    </div>
                </div>
            </Accordion>

            {/* 7. Makeup Categories */}
            <Accordion title="Makeup Products (Categories)" icon={ShoppingBag}>
                <div className="space-y-4">
                    <div><Label>Section Title</Label><Input value={settings.makeupCategories?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, makeupCategories: { ...settings.makeupCategories, title: e.target.value } })} /></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(settings.makeupCategories?.items || []).map((item, index) => (
                            <div key={index} className="p-3 border rounded-lg space-y-2 relative">
                                <Button variant="ghost" size="sm" className="absolute -top-2 -right-2 text-red-500 h-6 w-6 p-0" onClick={() => removeCategoryItem('makeupCategories', index)}><Trash2 className="w-3 h-3" /></Button>
                                <div><Label className="text-xs">Title</Label><Input value={item.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('makeupCategories', index, 'title', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Image URL</Label><Input value={item.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('makeupCategories', index, 'image', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Link</Label><Input value={item.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('makeupCategories', index, 'link', e.target.value)} className="h-8 text-sm" /></div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={() => addCategoryItem('makeupCategories')} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Category</Button>
                </div>
            </Accordion>

            {/* 8. Perfume Categories */}
            <Accordion title="Perfume Products (Categories)" icon={ShoppingBag}>
                <div className="space-y-4">
                    <div><Label>Section Title</Label><Input value={settings.perfumeCategories?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, perfumeCategories: { ...settings.perfumeCategories, title: e.target.value } })} /></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(settings.perfumeCategories?.items || []).map((item, index) => (
                            <div key={index} className="p-3 border rounded-lg space-y-2 relative">
                                <Button variant="ghost" size="sm" className="absolute -top-2 -right-2 text-red-500 h-6 w-6 p-0" onClick={() => removeCategoryItem('perfumeCategories', index)}><Trash2 className="w-3 h-3" /></Button>
                                <div><Label className="text-xs">Title</Label><Input value={item.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('perfumeCategories', index, 'title', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Image URL</Label><Input value={item.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('perfumeCategories', index, 'image', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Link</Label><Input value={item.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCategoryItem('perfumeCategories', index, 'link', e.target.value)} className="h-8 text-sm" /></div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={() => addCategoryItem('perfumeCategories')} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Category</Button>
                </div>
            </Accordion>

            {/* 9. Top Brands */}
            <Accordion title="Top Brands Deal" icon={Star}>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div><Label>Title</Label><Input value={settings.topBrands?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, topBrands: { ...settings.topBrands, title: e.target.value } })} /></div>
                        <div><Label>Subtitle</Label><Input value={settings.topBrands?.subtitle || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, topBrands: { ...settings.topBrands, subtitle: e.target.value } })} /></div>
                        <div><Label>Discount %</Label><Input type="number" value={settings.topBrands?.discountPercent || 60} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, topBrands: { ...settings.topBrands, discountPercent: parseInt(e.target.value) } })} /></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {(settings.topBrands?.brands || []).map((brand, index) => (
                            <div key={index} className="p-3 border rounded-lg space-y-2 relative">
                                <Button variant="ghost" size="sm" className="absolute -top-2 -right-2 text-red-500 h-6 w-6 p-0" onClick={() => removeBrand(index)}><Trash2 className="w-3 h-3" /></Button>
                                <div><Label className="text-xs">Name</Label><Input value={brand.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBrand(index, 'name', e.target.value)} className="h-8 text-sm" /></div>
                                <div><Label className="text-xs">Logo URL</Label><Input value={brand.logo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBrand(index, 'logo', e.target.value)} className="h-8 text-sm" /></div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={addBrand} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Brand</Button>
                </div>
            </Accordion>

            {/* 10. Limelight Products */}
            <Accordion title="In The Limelight (Featured Products)" icon={Sparkles}>
                <div className="space-y-4">
                    <div><Label>Section Title</Label><Input value={settings.limelightProducts?.title || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, limelightProducts: { ...settings.limelightProducts, title: e.target.value } })} /></div>
                    <div>
                        <Label>Product Source</Label>
                        <select
                            value={settings.limelightProducts?.source || 'featured'}
                            onChange={(e) => setSettings({ ...settings, limelightProducts: { ...settings.limelightProducts, source: e.target.value as 'featured' | 'category' | 'manual' } })}
                            className="w-full h-10 rounded-md border px-3 mt-1"
                        >
                            <option value="featured">Featured Products</option>
                            <option value="category">By Category</option>
                            <option value="manual">Manual Selection</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-1">Choose how products are selected for this section.</p>
                    </div>
                </div>
            </Accordion>
        </div>
    );
}
