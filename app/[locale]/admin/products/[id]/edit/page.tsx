'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/navigation';
import { adminApi } from '@/lib/api/admin';
import { categoriesApi, Product, Category } from '@/lib/api/products';
import { Loader2, ArrowLeft, Save, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface VariantOption {
    name: string;
    value: string;
}

interface ProductVariant {
    _id?: string;
    options: VariantOption[];
    price: number;
    inventory: number;
    images?: { secure_url: string; publicId?: string }[];
    isNew?: boolean;
}

interface Brand {
    _id: string;
    name: string;
}

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDesc: '',
        price: 0,
        discount: 0,
        category: '',
        brand: '',
        isFeatured: false,
        ingredients: '',
        howToUse: '',
        stock_quantity: 0,
    });

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [deletedVariants, setDeletedVariants] = useState<string[]>([]);

    useEffect(() => {
        loadData();
    }, [productId]);

    const loadData = async () => {
        try {
            const [productData, categoriesData, brandsData] = await Promise.all([
                adminApi.getProduct(productId),
                categoriesApi.getAll(),
                adminApi.getBrands()
            ]);
            setProduct(productData);
            setCategories(categoriesData);
            setBrands(brandsData);
            setFormData({
                name: productData.name || '',
                description: productData.description || '',
                shortDesc: productData.shortDesc || '',
                price: productData.price || 0,
                discount: productData.discount || 0,
                category: productData.category?._id || '',
                brand: (productData as any).brand?._id || '',
                isFeatured: productData.isFeatured || false,
                ingredients: productData.ingredients || '',
                howToUse: productData.howToUse || '',
                stock_quantity: (productData as any).stock_quantity || 0,
            });
            // Load existing variants
            if (productData.variants && productData.variants.length > 0) {
                setVariants(productData.variants.map((v: any) => ({
                    _id: v._id,
                    options: v.options || [{ name: 'Size', value: '' }],
                    price: v.price || 0,
                    inventory: v.inventory || 0,
                    images: v.images || [],
                    isNew: false
                })));
            }
        } catch (error) {
            console.error('Failed to load product:', error);
            alert('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);

            // Update main product
            await adminApi.updateProduct(productId, formData);

            // Handle variant updates
            for (const variant of variants) {
                if (variant.isNew) {
                    // Add new variant
                    await adminApi.addVariant(productId, {
                        options: variant.options,
                        price: variant.price,
                        inventory: variant.inventory,
                    });
                } else if (variant._id) {
                    // Update existing variant
                    await adminApi.updateVariant(productId, variant._id, {
                        options: variant.options,
                        price: variant.price,
                        inventory: variant.inventory,
                    });
                }
            }

            // Delete removed variants
            for (const variantId of deletedVariants) {
                await adminApi.deleteVariant(productId, variantId);
            }

            alert('Product and variants updated successfully!');
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product');
        } finally {
            setSaving(false);
        }
    };

    const addVariant = () => {
        setVariants([...variants, {
            options: [{ name: 'Size', value: '' }],
            price: formData.price,
            inventory: 0,
            images: [],
            isNew: true
        }]);
    };

    const removeVariant = (index: number) => {
        const variant = variants[index];
        if (variant._id && !variant.isNew) {
            setDeletedVariants([...deletedVariants, variant._id]);
        }
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariantOption = (variantIndex: number, optionIndex: number, field: 'name' | 'value', val: string) => {
        setVariants(prev => prev.map((v, i) => {
            if (i === variantIndex) {
                const newOptions = [...v.options];
                newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: val };
                return { ...v, options: newOptions };
            }
            return v;
        }));
    };

    const updateVariantField = (index: number, field: 'price' | 'inventory', value: number) => {
        setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="p-6">
                <p className="text-red-500">Product not found</p>
                <Link href="/admin/products" className="text-blue-500 underline">Go back</Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-gray-500">Update product information and variants</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name (EN)</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description (EN)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (EN)</label>
                            <input
                                type="text"
                                value={formData.shortDesc}
                                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (IQD)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Stock</label>
                            <input
                                type="number"
                                value={formData.stock_quantity}
                                onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                                readOnly={variants.length > 0}
                                title={variants.length > 0 ? "Calculated from variants" : ""}
                            />
                            {variants.length > 0 && <p className="text-[10px] text-gray-400 mt-1">Calculated automatically from variants</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <select
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Select Brand</option>
                                {brands.map((b) => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients (EN)</label>
                            <textarea
                                value={formData.ingredients}
                                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">How to Use (EN)</label>
                            <textarea
                                value={formData.howToUse}
                                onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300"
                            />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
                        </div>
                    </div>
                </div>

                {/* Current Images */}
                {product.images && product.images.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <h2 className="text-xl font-bold mb-4">Current Images</h2>
                        <div className="flex gap-4 flex-wrap">
                            {product.images.map((img, i) => (
                                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-50">
                                    <Image src={img.secure_url} alt={`Product ${i + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Note: To update images, please use the image upload in the add product form or contact the development team.</p>
                    </div>
                )}

                {/* Variants Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold">Product Variants</h2>
                            <p className="text-sm text-gray-500">Manage different sizes, colors, and options</p>
                        </div>
                        <Button type="button" onClick={addVariant} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Variant
                        </Button>
                    </div>

                    {variants.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p>No variants added yet.</p>
                            <p className="text-sm">Click "Add Variant" to create size/color options.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={variant._id || `new-${index}`} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                Variant #{index + 1}
                                                {variant.isNew && (
                                                    <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">New</span>
                                                )}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {variant.options.map((opt, optIdx) => (
                                            <div key={optIdx} className="md:col-span-2 grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Option Type</label>
                                                    <select
                                                        value={opt.name}
                                                        onChange={(e) => updateVariantOption(index, optIdx, 'name', e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                                                    >
                                                        <option value="Size">Size</option>
                                                        <option value="Color">Color</option>
                                                        <option value="Volume">Volume</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Value</label>
                                                    <input
                                                        type="text"
                                                        value={opt.value}
                                                        onChange={(e) => updateVariantOption(index, optIdx, 'value', e.target.value)}
                                                        placeholder="e.g. Large, Red"
                                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Price (IQD)</label>
                                            <input
                                                type="number"
                                                step="1"
                                                value={variant.price}
                                                onChange={(e) => updateVariantField(index, 'price', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Stock</label>
                                            <input
                                                type="number"
                                                value={variant.inventory}
                                                onChange={(e) => updateVariantField(index, 'inventory', parseInt(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Show variant images if they exist */}
                                    {variant.images && variant.images.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Variant Images</label>
                                            <div className="flex gap-2 flex-wrap">
                                                {variant.images.map((img, imgIdx) => (
                                                    <div key={imgIdx} className="relative w-12 h-12 rounded-lg overflow-hidden border bg-gray-100">
                                                        <Image src={img.secure_url} alt={`Variant ${imgIdx + 1}`} fill className="object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Link href="/admin/products">
                        <Button type="button" variant="ghost">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={saving} className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
