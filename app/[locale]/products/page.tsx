import { Suspense } from 'react';
import { ProductsPageContent } from './products-content';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageLoading() {
  const t = useTranslations('products');
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-[#807D7E]">{t('loadingProducts')}</div>
    </div>
  );
}
