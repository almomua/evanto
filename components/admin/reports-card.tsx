'use client';

import { useState } from 'react';

const reportTabs = [
  { key: 'customers', label: 'Customers', value: '24k' },
  { key: 'products', label: 'Total Products', value: '3.5k' },
  { key: 'stock', label: 'Stock Products', value: '2.5k' },
  { key: 'outOfStock', label: 'Out of Stock', value: '0.5k' },
  { key: 'revenue', label: 'Revenue', value: '250k' },
];

export function ReportsCard() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-[#3C4242]">Reports</h3>
            <p className="text-sm text-[#807D7E]">Last 7 days</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {reportTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-4 rounded-lg border transition-all ${
                activeTab === tab.key
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`text-lg font-semibold ${
                activeTab === tab.key ? 'text-[#8B5CF6]' : 'text-[#3C4242]'
              }`}>
                {tab.value}
              </p>
              <p className="text-sm text-[#807D7E] whitespace-nowrap">{tab.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 pb-6">
        <div className="h-48">
          <svg className="w-full h-full" viewBox="0 0 580 200" fill="none">
            {/* Y-axis labels */}
            <text x="0" y="20" className="text-xs fill-[#807D7E]">50k</text>
            <text x="0" y="55" className="text-xs fill-[#807D7E]">40k</text>
            <text x="0" y="90" className="text-xs fill-[#807D7E]">30k</text>
            <text x="0" y="125" className="text-xs fill-[#807D7E]">20k</text>
            <text x="0" y="160" className="text-xs fill-[#807D7E]">10k</text>
            <text x="0" y="195" className="text-xs fill-[#807D7E]">0</text>
            
            {/* Grid lines */}
            <line x1="40" y1="15" x2="580" y2="15" stroke="#E5E7EB" strokeDasharray="4 4" />
            <line x1="40" y1="50" x2="580" y2="50" stroke="#E5E7EB" strokeDasharray="4 4" />
            <line x1="40" y1="85" x2="580" y2="85" stroke="#E5E7EB" strokeDasharray="4 4" />
            <line x1="40" y1="120" x2="580" y2="120" stroke="#E5E7EB" strokeDasharray="4 4" />
            <line x1="40" y1="155" x2="580" y2="155" stroke="#E5E7EB" strokeDasharray="4 4" />
            <line x1="40" y1="190" x2="580" y2="190" stroke="#E5E7EB" strokeDasharray="4 4" />
            
            {/* Wave chart */}
            <path
              d="M50 140 Q120 100, 180 90 T300 70 T420 85 T550 50"
              stroke="#8B5CF6"
              strokeWidth="3"
              fill="none"
            />
            
            {/* X-axis labels */}
            <text x="50" y="210" className="text-xs fill-[#807D7E]">Mon</text>
            <text x="140" y="210" className="text-xs fill-[#807D7E]">Tue</text>
            <text x="230" y="210" className="text-xs fill-[#807D7E]">Wed</text>
            <text x="320" y="210" className="text-xs fill-[#807D7E]">Thu</text>
            <text x="410" y="210" className="text-xs fill-[#807D7E]">Fri</text>
            <text x="470" y="210" className="text-xs fill-[#807D7E]">Sat</text>
            <text x="540" y="210" className="text-xs fill-[#807D7E]">Sun</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
