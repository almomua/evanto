'use client';

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { reviewsApi } from '@/lib/api/reviews';
import { useAuth } from '@/lib/context/auth-context';
import { useModal } from '@/components/ui/modal';

interface AddReviewFormProps {
    productId: string;
    onReviewAdded: () => void;
}

interface ReviewFormData {
    title: string;
    comment: string;
}

export function AddReviewForm({ productId, onReviewAdded }: AddReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, isLoading } = useAuth();
    const modal = useModal();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>();

    const onSubmit = async (data: ReviewFormData) => {
        if (rating === 0) {
            modal.error('Please select a star rating', 'Rating Required');
            return;
        }

        try {
            setIsSubmitting(true);
            await reviewsApi.create(productId, {
                ...data,
                rating,
            });

            modal.success('Your review has been verified and posted!', 'Thank you!');
            reset();
            setRating(0);
            onReviewAdded();
        } catch (error: any) {
            console.error("Failed to post review", error);
            modal.error(error.response?.data?.message || 'Failed to post review', 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
                <h4 className="text-[#3C4242] font-bold mb-2">Have you used this product?</h4>
                <p className="text-[#807D7E] text-sm mb-4">Log in to share your experience with the community.</p>
                <a href="/auth/login" className="text-[#8A33FD] font-bold text-sm hover:underline">Log in to write a review</a>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#3C4242] mb-6">Write a Review</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Rating */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#3C4242]">Your Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    className={`w-6 h-6 transition-colors ${star <= (hoverRating || rating)
                                        ? 'fill-[#EDD146] text-[#EDD146]'
                                        : 'fill-none text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#3C4242]">Review Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        placeholder="Summarize your experience"
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-[#8A33FD] transition-colors"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>

                {/* Comment */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#3C4242]">Review Details</label>
                    <textarea
                        {...register('comment', { required: 'Review details are required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
                        placeholder="What did you like or dislike? How was the quality?"
                        rows={4}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-[#8A33FD] transition-colors resize-none"
                    />
                    {errors.comment && <p className="text-red-500 text-xs">{errors.comment.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#3C4242] text-white rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
