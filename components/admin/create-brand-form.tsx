'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';

export function CreateBrandForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Brand name is required');
            return;
        }
        setLoading(true);
        try {
            await adminApi.createBrand({ name, description });
            alert('Brand created successfully!');
            router.push('/admin/brands');
        } catch (error) {
            console.error('Failed to create brand', error);
            alert('Failed to create brand');
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
                    <label className="text-sm font-semibold text-[#807D7E]">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the brand..."
                        rows={4}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium resize-none"
                    />
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
