'use client';

import { useParams } from 'next/navigation';
import { TransactionDetailsForm } from '@/components/admin/transaction-details-form';

export default function TransactionDetailPage() {
    const params = useParams();
    const transactionId = params.id as string;

    return (
        <div className="space-y-6">
            <TransactionDetailsForm transactionId={transactionId} />
        </div>
    );
}
