'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/navigation';
import { adminApi, Brand } from '@/lib/api/admin';
import { Loader2, ArrowLeft, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useModal } from '@/components/ui/modal';

export default function EditBrandPage() {
    const params = useParams();
    const router = useRouter();
    const modal = useModal();
    const brandId = params.id as string;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [brand, setBrand] = useState<Brand | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        nameAr: '',
        slug: '',
        description: '',
        descriptionAr: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        loadBrand();
    }, [brandId]);

    const loadBrand = async () => {
        try {
            const data = await adminApi.getBrand(brandId);
            setBrand(data);
            setFormData({
                name: data.name || '',
                nameAr: (data as any).nameAr || '',
                slug: data.slug || '',
                description: data.description || '',
                descriptionAr: (data as any).descriptionAr || '',
            });
            if (data.image?.secure_url) {
                setPreviewUrl(data.image.secure_url);
            }
        } catch (error) {
            console.error('Failed to load brand:', error);
            modal.error('Failed to load brand');
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        if (image && previewUrl) URL.revokeObjectURL(previewUrl);
        setImage(null);
        setPreviewUrl(brand?.image?.secure_url || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            const data = new FormData();
            data.append('name', formData.name);
            data.append('nameAr', formData.nameAr);
            data.append('slug', formData.slug);
            data.append('description', formData.description);
            data.append('descriptionAr', formData.descriptionAr);
            if (image) {
                data.append('image', image);
            }

            await adminApi.updateBrand(brandId, data);
            modal.success('Brand updated successfully!');
            router.push('/admin/brands');
        } catch (error) {
            console.error('Failed to update brand:', error);
            modal.error('Failed to update brand');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!brand) {
        return (
            <div className="p-6">
                <p className="text-red-500">Brand not found</p>
                <Link href="/admin/brands" className="text-blue-500 underline">Go back</Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/brands" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Brands
                </Link>
                <h1 className="text-3xl font-bold">Edit Brand</h1>
                <p className="text-gray-500">Update brand information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">اسم العلامة التجارية (Arabic Name)</label>
                            <input
                                type="text"
                                dir="rtl"
                                value={formData.nameAr}
                                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                placeholder="مثال: نايكي"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-arabic"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-500 mt-1">URL-friendly version of the name</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">الوصف بالعربية (Arabic Description)</label>
                            <textarea
                                dir="rtl"
                                value={formData.descriptionAr}
                                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                rows={3}
                                placeholder="أدخل وصف العلامة التجارية بالعربية"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-arabic"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                            <div
                                onClick={() => !image && !previewUrl && fileInputRef.current?.click()}
                                className={`border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-colors relative h-40 ${!image && !previewUrl ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                />
                                {previewUrl ? (
                                    <div className="relative w-full h-full group">
                                        <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100"
                                            >
                                                <Upload size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm text-gray-500">Click to upload logo</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/brands">
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
