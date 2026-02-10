'use client';

import { CustomerDetailCard } from '@/components/admin/customer-detail-card';
import { CustomerOrdersTable } from '@/components/admin/customer-orders-table';

export default function CustomerViewerPage() {
    return (
        <div className="space-y-6">
            <CustomerDetailCard />
            <CustomerOrdersTable />
        </div>
    );
}
