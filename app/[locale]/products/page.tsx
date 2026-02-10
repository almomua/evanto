import { Suspense } from 'react';
import { ProductsPageContent } from './products-content';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-[#807D7E]">Loading products...</div>
    </div>
  );
}
