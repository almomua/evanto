'use client';

const categories = [
  { name: 'Fashion', value: '4.567', color: '#22C55E', size: 'large' },
  { name: 'Perfumes', value: '3.167', color: '#8B5CF6', size: 'medium' },
  { name: 'Make-up', value: '1.845', color: '#3B82F6', size: 'small' },
];

export function CategoryChart() {
  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#3C4242]">Top Selling Category</h3>
            <p className="text-sm text-[#807D7E]">Total 10.4k Visitors</p>
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

      {/* Circular Chart */}
      <div className="p-6">
        <div className="relative h-80 flex items-center justify-center">
          {/* Fashion Circle (largest) */}
          <div className="absolute w-52 h-52 rounded-full bg-[#22C55E]/20 flex items-center justify-center"
               style={{ left: '10%', top: '15%' }}>
            <div className="text-center">
              <p className="text-sm text-[#3C4242]">Fashion</p>
              <p className="text-xl font-bold text-[#3C4242]">4.567</p>
              <p className="text-sm text-[#807D7E]">Per Day</p>
            </div>
          </div>
          
          {/* Perfumes Circle (medium) */}
          <div className="absolute w-40 h-40 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center"
               style={{ right: '10%', top: '35%' }}>
            <div className="text-center">
              <p className="text-sm text-[#3C4242]">Perfumes</p>
              <p className="text-xl font-bold text-[#3C4242]">3.167</p>
              <p className="text-sm text-[#807D7E]">Per Day</p>
            </div>
          </div>
          
          {/* Make-up Circle (smallest) */}
          <div className="absolute w-32 h-32 rounded-full bg-[#3B82F6]/20 flex items-center justify-center"
               style={{ left: '20%', bottom: '5%' }}>
            <div className="text-center">
              <p className="text-sm text-[#3C4242]">Make-up</p>
              <p className="text-xl font-bold text-[#3C4242]">1.845</p>
              <p className="text-sm text-[#807D7E]">Per Day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
