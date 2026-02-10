'use client';

import { Review } from '@/lib/api/reviews';
import { Star, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    const t = useTranslations('products');

    if (reviews.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-[#807D7E] text-lg">{t('noReviewsYet')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 pb-8 last:border-0">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            {/* User Avatar */}
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                <Image
                                    src={review.user.image || `https://ui-avatars.com/api/?name=${review.user.name}&background=random`}
                                    alt={review.user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="font-bold text-[#3C4242] text-base">{review.user.name}</h4>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#EDD146]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-gray-300 fill-none'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {review.isVerifiedPurchase && (
                            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <CheckCircle2 size={12} />
                                <span className="text-[10px] font-medium">{t('verifiedPurchase')}</span>
                            </div>
                        )}
                    </div>

                    <h5 className="font-bold text-[#3C4242] text-sm mb-2">{review.title}</h5>
                    <p className="text-[#807D7E] text-sm leading-relaxed">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
