'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { homeSettingsApi } from '@/lib/api/home-settings';

interface ImageUploadFieldProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    className?: string;
    compact?: boolean;
}

export function ImageUploadField({ label, value, onChange, className = '', compact = false }: ImageUploadFieldProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB');
            return;
        }

        setError('');
        setIsUploading(true);

        try {
            const result = await homeSettingsApi.uploadImage(file);
            onChange(result.url);
        } catch (err) {
            setError('Upload failed. Try again.');
            console.error('Image upload failed:', err);
        } finally {
            setIsUploading(false);
            // Reset input so same file can be re-selected
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleClear = () => {
        onChange('');
        setError('');
    };

    if (compact) {
        return (
            <div className={className}>
                <label className="text-xs font-medium text-gray-700">{label}</label>
                <div className="mt-1 flex items-center gap-2">
                    {value && (
                        <div className="relative w-10 h-10 rounded border overflow-hidden shrink-0">
                            <img src={value} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex-1 h-8 text-xs border border-dashed rounded-md flex items-center justify-center gap-1 hover:bg-gray-50 disabled:opacity-50"
                    >
                        {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                        {isUploading ? 'Uploading...' : value ? 'Change' : 'Upload'}
                    </button>
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </div>
        );
    }

    return (
        <div className={className}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1.5">
                {value ? (
                    <div className="relative group">
                        <div className="w-full h-32 rounded-lg border overflow-hidden bg-gray-50">
                            <img src={value} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="bg-white text-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                            >
                                {isUploading ? 'Uploading...' : 'Replace'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="bg-red-500 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                <span className="text-sm text-gray-500">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-6 h-6 text-gray-400" />
                                <span className="text-sm text-gray-500">Click to upload image</span>
                                <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
                            </>
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>
    );
}
