'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api/admin';
import { categoriesApi, Category } from '@/lib/api/products';
import { Loader2, X } from 'lucide-react';
import { useModal } from '@/components/ui/modal';

interface VariantOption {
    name: string;
    value: string;
}

interface Variant {
    id: number;
    options: VariantOption[];
    price: string;
    stock: string;
    images: File[];
    previews: string[];
}

interface Brand {
    _id: string;
    name: string;
}

export function AddProductForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const modal = useModal();

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('0');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [howToUse, setHowToUse] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Product Details (key-value pairs)
    const [details, setDetails] = useState<{ key: string; value: string }[]>([]);

    const [variants, setVariants] = useState<Variant[]>([
        { id: 1, options: [{ name: 'Size', value: '' }], price: '', stock: '', images: [], previews: [] },
    ]);

    useEffect(() => {
        loadCategories();
        loadBrands();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoriesApi.getAll();
            setCategories(data);
            if (data.length > 0) setCategoryId(data[0]._id);
        } catch (error) {
            console.error('Failed to load categories', error);
        }
    };

    const loadBrands = async () => {
        try {
            const data = await adminApi.getBrands();
            setBrands(data);
            if (data.length > 0) setBrandId(data[0]._id);
        } catch (error) {
            console.error('Failed to load brands', error);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles]);

            // Create previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            // Revoke url to avoid memory leaks
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const addVariant = () => {
        setVariants([...variants, {
            id: Date.now(),
            options: [{ name: 'Color', value: '' }],
            price: '',
            stock: '',
            images: [],
            previews: []
        }]);
    };

    const removeVariant = (id: number) => {
        if (variants.length > 1) {
            setVariants(prev => prev.filter(v => v.id !== id));
        }
    };

    const handleVariantImageSelect = (variantId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));

            setVariants(prev => prev.map(v => {
                if (v.id === variantId) {
                    return {
                        ...v,
                        images: [...v.images, ...newFiles],
                        previews: [...v.previews, ...newPreviews]
                    };
                }
                return v;
            }));
        }
    };

    const removeVariantImage = (variantId: number, imageIndex: number) => {
        setVariants(prev => prev.map(v => {
            if (v.id === variantId) {
                const newImages = v.images.filter((_, i) => i !== imageIndex);
                const newPreviews = v.previews.filter((_, i) => i !== imageIndex);
                // Revoke URL
                URL.revokeObjectURL(v.previews[imageIndex]);
                return { ...v, images: newImages, previews: newPreviews };
            }
            return v;
        }));
    };

    const updateVariantOption = (variantId: number, optionIndex: number, field: 'name' | 'value', val: string) => {
        setVariants(prev => prev.map(v => {
            if (v.id === variantId) {
                const newOptions = [...v.options];
                newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: val };
                return { ...v, options: newOptions };
            }
            return v;
        }));
    };

    const updateVariantField = (id: number, field: 'price' | 'stock', value: string) => {
        setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const addDetail = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const removeDetail = (index: number) => {
        setDetails(prev => prev.filter((_, i) => i !== index));
    };

    const updateDetail = (index: number, field: 'key' | 'value', val: string) => {
        setDetails(prev => prev.map((d, i) => i === index ? { ...d, [field]: val } : d));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (shortDesc) formData.append('shortDesc', shortDesc);
            formData.append('price', price);
            formData.append('category', categoryId);
            formData.append('brand', brandId);
            if (videoUrl) formData.append('videoUrl', videoUrl);
            if (ingredients) formData.append('ingredients', ingredients);
            if (howToUse) formData.append('howToUse', howToUse);
            formData.append('stock_quantity', stock);

            // Append main files
            images.forEach((file) => {
                formData.append('images', file);
            });

            // Append variant files
            variants.forEach((variant, index) => {
                variant.images.forEach(file => {
                    formData.append(`variant_images_${index}`, file);
                });
            });

            // Handle variants
            const variantsData = variants.map(v => ({
                options: v.options.filter(o => o.value),
                price: Number(v.price) || Number(price),
                inventory: Number(v.stock) || 0,
                // images are handled by backend controller mapping
            }));
            formData.append('variants', JSON.stringify(variantsData));

            // Handle details (convert to object)
            const detailsObj: Record<string, string> = {};
            details.forEach(d => {
                if (d.key && d.value) {
                    detailsObj[d.key] = d.value;
                }
            });
            if (Object.keys(detailsObj).length > 0) {
                formData.append('details', JSON.stringify(detailsObj));
            }

            await adminApi.createProduct(formData);
            modal.success('Product created successfully!', 'Success');
            setTimeout(() => {
                router.push('/admin/products');
            }, 1000);
        } catch (error) {
            console.error('Failed to create product', error);
            modal.error('Failed to create product. See console.', 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 pb-10">
            {/* Left Column (Span 2) */}
            <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-[#3C4242] mb-6">Basic Information</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#3C4242]">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g Premium Perfume"
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#3C4242]">Product Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the product in detail..."
                                rows={8}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#3C4242]">Short Description (Optional)</label>
                            <textarea
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                                placeholder="Brief description for product listings..."
                                rows={3}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#3C4242]">Ingredients (Optional)</label>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                placeholder="List of ingredients..."
                                rows={4}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#3C4242]">How to Use (Optional)</label>
                            <textarea
                                value={howToUse}
                                onChange={(e) => setHowToUse(e.target.value)}
                                placeholder="Usage instructions..."
                                rows={4}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-xl font-bold text-[#3C4242]">Product Details</h3>
                        <span className="text-xs text-gray-400 font-medium pt-1">
                            Add product specifications (e.g., Skin Type, Formulation, etc.)
                        </span>
                    </div>
                    <div className="space-y-4">
                        {details.map((detail, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={detail.key}
                                    onChange={(e) => updateDetail(idx, 'key', e.target.value)}
                                    placeholder="e.g. Skin Type"
                                    className="px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={detail.value}
                                        onChange={(e) => updateDetail(idx, 'value', e.target.value)}
                                        placeholder="e.g. All Skin Types"
                                        className="flex-1 px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeDetail(idx)}
                                        className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addDetail}
                            className="px-6 py-2.5 bg-[#1E6BFF] text-white rounded-lg text-sm font-bold hover:bg-[#1656D6] transition-colors"
                        >
                            Add Detail
                        </button>
                    </div>
                </div>

                {/* Product Images */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-[#3C4242] mb-6">Product Images</h3>
                    <div className="space-y-6">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleImageSelect}
                            />
                            <p className="text-sm text-gray-500">
                                Drag & drop or <span className="text-[#1E6BFF] font-bold">click to upload</span>
                            </p>
                            <p className="text-xs text-gray-400 font-medium">PNG, JPG, GIF up to 10MB</p>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            {previewUrls.map((url, i) => (
                                <div key={i} className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group">
                                    <Image src={url} alt="Preview" fill className="object-cover" />
                                    <button
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Variants */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-xl font-bold text-[#3C4242]">Variants</h3>
                        <span className="text-xs text-gray-400 font-medium pt-1">
                            Add options if this product comes in multiple versions, like different sizes or colors.
                        </span>
                    </div>

                    <div className="space-y-4">
                        {variants.map((variant) => (
                            <div key={variant.id} className="p-4 border border-gray-100 rounded-xl space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-[#3C4242]">Variant Options</span>
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(variant.id)}
                                        className="text-red-400 hover:text-red-500 text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                                {variant.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Option Name</label>
                                            <select
                                                value={opt.name}
                                                onChange={(e) => updateVariantOption(variant.id, optIdx, 'name', e.target.value)}
                                                className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                            >
                                                <option value="Size">Size</option>
                                                <option value="Color">Color</option>
                                                <option value="Volume">Volume</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Value</label>
                                            <input
                                                type="text"
                                                value={opt.value}
                                                onChange={(e) => updateVariantOption(variant.id, optIdx, 'value', e.target.value)}
                                                placeholder="e.g. Red / Large"
                                                className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Variant Price (IQD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">IQD</span>
                                            <input
                                                type="text"
                                                value={variant.price}
                                                onChange={(e) => updateVariantField(variant.id, 'price', e.target.value)}
                                                placeholder="0.00"
                                                className="w-full pl-8 pr-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Stock</label>
                                        <input
                                            type="text"
                                            value={variant.stock}
                                            onChange={(e) => updateVariantField(variant.id, 'stock', e.target.value)}
                                            placeholder="100"
                                            className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-sm text-[#3C4242] outline-none"
                                        />
                                    </div>
                                </div>
                                {/* Variant Images */}
                                <div className="space-y-2 pt-2 border-t border-gray-50">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Variant Images</label>
                                    <div className="flex flex-wrap gap-2">
                                        {variant.previews.map((url, i) => (
                                            <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 group">
                                                <Image src={url} alt="Variant Preview" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeVariantImage(variant.id, i)}
                                                    className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="w-12 h-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                                            <span className="text-gray-400 text-xs">+</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => handleVariantImageSelect(variant.id, e)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addVariant}
                            className="px-6 py-2.5 bg-[#1E6BFF] text-white rounded-lg text-sm font-bold hover:bg-[#1656D6] transition-colors mt-2"
                        >
                            Add Variant
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                {/* Pricing & Inventory */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h3 className="text-xl font-bold text-[#3C4242]">Pricing & Inventory</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#3C4242]">Price (IQD)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium whitespace-nowrap">IQD</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#3C4242]">Stock Quantity</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Organization */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h3 className="text-xl font-bold text-[#3C4242]">Organization</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#3C4242]">Category</label>
                        <div className="relative">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all appearance-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#3C4242]">Brand</label>
                        <div className="relative">
                            <select
                                value={brandId}
                                onChange={(e) => setBrandId(e.target.value)}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all appearance-none"
                            >
                                <option value="">Select Brand</option>
                                {brands.map(b => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#3C4242]">Product Video URL (Optional)</label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-3.5 bg-[#1E6BFF] text-white rounded-xl font-bold hover:bg-[#1656D6] transition-colors disabled:opacity-50 flex justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Create Product'}
                    </button>
                    {/* Save button removed as it was redundant */}
                </div>
            </div>
        </div>
    );
}
