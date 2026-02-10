'use client';

import { TransactionTable } from '@/components/admin/transaction-table';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <TransactionTable />
        </div>
    );
}
