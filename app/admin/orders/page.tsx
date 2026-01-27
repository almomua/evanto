'use client';

import { OrderManagementTable } from '@/components/admin/order-management-table';

export default function OrderManagementPage() {
    return (
        <div className="space-y-6">
            <OrderManagementTable />
        </div>
    );
}
