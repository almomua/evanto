'use client';

import { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { SectionHeader } from '@/components/ui/section-header';
import { ReviewList } from '@/components/reviews/review-list';
import { AddReviewForm } from '@/components/reviews/add-review-form';
import { reviewsApi, Review } from '@/lib/api/reviews';
import { Loader2 } from 'lucide-react';

interface ProductDescriptionProps {
  productId: string;
  description: string;
  details?: { [key: string]: string };
  ingredients?: string;
  howToUse?: string;
}

export function ProductDescription({ productId, description, details, ingredients, howToUse }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState('Description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tabs, setTabs] = useState(['Description', 'Reviews', 'Question & Answer']);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Mock details if not provided
  const productDetails = details || {
    'Fabric': 'Bio-washed Cotton',
    'Pattern': 'Printed',
    'Fit': 'Regular-fit',
    'Neck': 'Round Neck',
    'Sleeve': 'Half-sleeves',
    'Style': 'Casual Wear',
  };

  const loadReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const data = await reviewsApi.getByProductId(productId);
      setReviews(data);
    } catch (error) {
      console.error("Failed to load reviews", error);
    } finally {
      setLoadingReviews(false);
    }
  }, [productId]);

  useEffect(() => {
    const newTabs = ['Description'];
    if (ingredients) newTabs.push('Ingredients');
    if (howToUse) newTabs.push('How to Use');
    newTabs.push('Reviews');
    newTabs.push('Question & Answer');
    setTabs(newTabs);
  }, [ingredients, howToUse]);

  useEffect(() => {
    if (activeTab === 'Reviews') {
      loadReviews();
    }
  }, [activeTab, loadReviews]);

  return (
    <div className="max-w-[612px]">
      <SectionHeader title="Product Description" className="mb-6" />

      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-gray-100 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'text-lg pb-4 transition-all relative px-2',
              activeTab === tab
                ? 'text-[#3C4242] font-semibold'
                : 'text-[#807D7E] hover:text-[#3C4242]'
            )}
          >
            {tab}
            {tab === 'Reviews' && reviews.length > 0 && (
              <span className="ml-2 text-xs bg-[#8A33FD] text-white px-2 py-0.5 rounded-full">
                {reviews.length}
              </span>
            )}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3C4242]" />
            )}
          </button>
        ))}
      </div>

      {/* Description */}
      {activeTab === 'Description' && (
        <div className="animate-in fade-in duration-300">
          <p className="text-[#3C4242] text-lg leading-relaxed mb-8">
            {description || 'Description here'}
          </p>

          {/* Details Table */}
          <div className="bg-[#F6F6F6]/60 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {Object.entries(productDetails).map(([key, value], index) => (
                <div key={index} className="flex justify-between border-b border-gray-100/50 pb-2 last:border-0 hover:bg-white/50 px-2 rounded transition-colors">
                  <p className="text-[#807D7E] text-base font-medium">{key}</p>
                  <p className="text-[#3C4242] text-base font-semibold text-right">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Ingredients' && ingredients && (
        <div className="animate-in fade-in duration-300">
          <p className="text-[#3C4242] text-lg leading-relaxed whitespace-pre-line mb-8">
            {ingredients}
          </p>
        </div>
      )}

      {activeTab === 'How to Use' && howToUse && (
        <div className="animate-in fade-in duration-300">
          <p className="text-[#3C4242] text-lg leading-relaxed whitespace-pre-line mb-8">
            {howToUse}
          </p>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#3C4242]">Customer Reviews</h3>
            <span className="text-sm text-[#807D7E]">{reviews.length} reviews</span>
          </div>

          {/* Add Review Form */}
          <AddReviewForm productId={productId} onReviewAdded={loadReviews} />

          {/* Review List */}
          {loadingReviews ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-[#8A33FD]" />
            </div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </div>
      )}

      {activeTab === 'Question & Answer' && (
        <p className="text-[#807D7E] text-lg">No questions yet.</p>
      )}
    </div>
  );
}



