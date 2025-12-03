'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { SectionHeader } from '@/components/ui/section-header';

interface ProductDescriptionProps {
  description: string;
  details?: { [key: string]: string };
}

const tabs = ['Description', 'User comments', 'Question & Answer'];

export function ProductDescription({ description, details }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState('Description');

  // Mock details if not provided
  const productDetails = details || {
    'Fabric': 'Bio-washed Cotton',
    'Pattern': 'Printed',
    'Fit': 'Regular-fit',
    'Neck': 'Round Neck',
    'Sleeve': 'Half-sleeves',
    'Style': 'Casual Wear',
  };

  return (
    <div className="max-w-[612px]">
      <SectionHeader title="Product Description" className="mb-6" />

      {/* Tabs */}
      <div className="flex gap-8 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'text-lg pb-2 transition-all relative',
              activeTab === tab
                ? 'text-[#3C4242]'
                : 'text-[#807D7E] hover:text-[#3C4242]'
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3C4242]" />
            )}
          </button>
        ))}
      </div>

      {/* Description */}
      {activeTab === 'Description' && (
        <>
          <p className="text-[#3C4242] text-lg leading-relaxed mb-8">
            {description || 'Description here'}
          </p>

          {/* Details Table */}
          <div className="bg-[#F6F6F6]/60 rounded-xl p-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(productDetails).map(([key, value], index) => (
                <div key={index} className="space-y-1">
                  <p className="text-[#807D7E] text-base">{key}</p>
                  <p className="text-[#807D7E] text-base">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'User comments' && (
        <p className="text-[#807D7E] text-lg">No comments yet.</p>
      )}

      {activeTab === 'Question & Answer' && (
        <p className="text-[#807D7E] text-lg">No questions yet.</p>
      )}
    </div>
  );
}

