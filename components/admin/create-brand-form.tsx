'use client';

import React, { useState, useRef } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { adminApi } from '@/lib/api/admin';
import { Loader2, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '@/components/ui/modal';

export function CreateBrandForm() {
    const router = useRouter();
    const modal = useModal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setImage(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            modal.error('Brand name is required');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('nameAr', nameAr);
            formData.append('description', description);
            formData.append('descriptionAr', descriptionAr);
            if (image) {
                formData.append('image', image);
            }

            await adminApi.createBrand(formData);
            modal.success('Brand created successfully!');
            router.push('/admin/brands');
        } catch (error) {
            console.error('Failed to create brand', error);
            modal.error('Failed to create brand');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <h3 className="text-xl font-bold text-[#3C4242]">Create New Brand</h3>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Brand Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Nike"
                        required
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">اسم العلامة التجارية (Arabic)</label>
                    <input
                        type="text"
                        dir="rtl"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        placeholder="مثال: نايكي"
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-arabic"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the brand..."
                        rows={3}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">وصف العلامة التجارية (Optional Arabic)</label>
                    <textarea
                        value={descriptionAr}
                        dir="rtl"
                        onChange={(e) => setDescriptionAr(e.target.value)}
                        placeholder="وصف مختصر للعلامة التجارية..."
                        rows={3}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-arabic resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Brand Logo</label>
                    <div
                        onClick={() => !image && fileInputRef.current?.click()}
                        className={`border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 transition-colors relative h-48 ${!image ? 'cursor-pointer hover:bg-gray-50' : ''}`}
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
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                    Click to upload brand logo
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Link
                    href="/admin/brands"
                    className="px-8 py-3 bg-[#F8F9FA] text-[#807D7E] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3 bg-[#1E6BFF] text-white rounded-xl text-sm font-bold hover:bg-[#1656D6] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    {loading ? 'Creating...' : 'Create Brand'}
                </button>
            </div>
        </form>
    );
}
