'use client';

import React, { useState, useRef } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { adminApi } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '@/components/ui/modal';

export function CreateCategoryForm() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modal = useModal();

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name || !image) {
            modal.error('Name and Image are required', 'Validation Error');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('nameAr', nameAr);
            formData.append('description', description);
            formData.append('descriptionAr', descriptionAr);
            formData.append('isActive', String(isVisible));
            formData.append('image', image);

            await adminApi.createCategory(formData);
            modal.success('Category created successfully', 'Success');
            setTimeout(() => {
                router.push('/admin/categories');
            }, 1000);
        } catch (error) {
            console.error('Failed to create category', error);
            modal.error('Failed to create category.', 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <h3 className="text-xl font-bold text-[#3C4242]">Category Details</h3>

            <div className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g Perfume, Makeup"
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                    />
                </div>

                {/* Category Name (Arabic) */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Category Name (Arabic)</label>
                    <input
                        type="text"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        placeholder="اسم الفئة بالعربية"
                        dir="rtl"
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                    />
                </div>

                {/* Category Description */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Category Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a brief description for this category"
                        rows={4}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium resize-none"
                    />
                </div>

                {/* Category Description (Arabic) */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Category Description (Arabic)</label>
                    <textarea
                        value={descriptionAr}
                        onChange={(e) => setDescriptionAr(e.target.value)}
                        placeholder="وصف الفئة بالعربية"
                        dir="rtl"
                        rows={4}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium resize-none"
                    />
                </div>

                {/* Category Image / Icon */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#807D7E]">Category Image / Icon</label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview" fill className="object-contain p-2" />
                        ) : (
                            <>
                                <p className="text-sm text-gray-500 font-medium">
                                    Drag & drop or <span className="text-[#1E6BFF] font-bold">click to upload</span>
                                </p>
                                <p className="text-xs text-gray-400 font-medium">PNG, JPG, GF up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#3C4242]">Visibility</h4>
                        <p className="text-xs text-gray-400 font-medium tracking-tight">Set the category to active or inactive</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => setIsVisible(true)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${isVisible ? 'bg-[#1E6BFF]' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isVisible ? 'right-1' : 'left-1'}`} />
                            </div>
                            <span className={`text-sm font-bold transition-colors ${isVisible ? 'text-[#3C4242]' : 'text-gray-400'}`}>Active</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => setIsVisible(false)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${!isVisible ? 'bg-[#1E6BFF]' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${!isVisible ? 'right-1' : 'left-1'}`} />
                            </div>
                            <span className={`text-sm font-bold transition-colors ${!isVisible ? 'text-[#3C4242]' : 'text-gray-400'}`}>Unactive</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
                <Link
                    href="/admin/categories"
                    className="px-8 py-2.5 bg-[#F8F9FA] text-[#807D7E] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-10 py-2.5 bg-[#1E6BFF] text-white rounded-lg text-sm font-bold hover:bg-[#1656D6] transition-colors shadow-sm shadow-[#1E6BFF]/20 disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    Save
                </button>
            </div>
        </div>
    );
}
