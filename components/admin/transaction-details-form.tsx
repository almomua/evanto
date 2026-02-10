'use client';

import React, { useState, useEffect } from 'react';
import { adminApi, Transaction } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface TransactionDetailsFormProps {
    transactionId: string;
}

export function TransactionDetailsForm({ transactionId }: TransactionDetailsFormProps) {
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true);
                const data = await adminApi.getTransaction(transactionId);
                setTransaction(data);
            } catch (err) {
                console.error('Failed to fetch transaction', err);
                setError('Failed to load transaction details');
            } finally {
                setLoading(false);
            }
        };

        if (transactionId) {
            fetchTransaction();
        }
    }, [transactionId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
            </div>
        );
    }

    if (error || !transaction) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-red-500 font-medium">{error || 'Transaction not found'}</p>
                <Link href="/admin/transactions" className="text-[#8B5CF6] hover:underline mt-4 inline-block">
                    Back to Transactions
                </Link>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        'Pending': 'text-orange-500 bg-orange-50',
        'Completed': 'text-green-500 bg-green-50',
        'Canceled': 'text-red-500 bg-red-50',
    };

    const methodLabels: Record<string, string> = {
        'CC': 'Credit Card',
        'COD': 'Cash on Delivery',
        'Bank': 'Bank Transfer',
    };

    const customerInitials = transaction.customer?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase() || '??';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#3C4242]">Transaction Details</h2>
                    <p className="text-sm text-gray-500">Transaction #{transaction._id.slice(-6).toUpperCase()}</p>
                </div>
                <Link
                    href="/admin/transactions"
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                    ← Back to List
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Transaction Info Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-[#3C4242]">Transaction Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Transaction ID</label>
                            <p className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] font-mono">
                                #{transaction._id.slice(-6).toUpperCase()}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Order ID</label>
                            <Link
                                href={`/admin/orders?search=${transaction.order?._id || ''}`}
                                className="block w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#8B5CF6] font-mono hover:underline"
                            >
                                #{transaction.order?._id?.slice(-6).toUpperCase() || 'N/A'}
                            </Link>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Amount (IQD)</label>
                            <p className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] font-bold">
                                {formatPrice(transaction.amount)}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Payment Method</label>
                            <p className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242]">
                                {methodLabels[transaction.method] || transaction.method}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Date</label>
                            <p className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242]">
                                {new Date(transaction.transactionDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                            <p className={`w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold ${statusColors[transaction.status] || 'text-gray-500 bg-gray-50'}`}>
                                {transaction.status}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Customer Info Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 text-[#3C4242]">
                    <h3 className="text-lg font-bold">Customer Details</h3>
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                        <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] font-bold text-xl">
                            {customerInitials}
                        </div>
                        <div>
                            <h4 className="font-bold text-xl">{transaction.customer?.name || 'Unknown Customer'}</h4>
                            <p className="text-sm text-gray-400">Customer ID: #{transaction.customer?._id?.slice(-6).toUpperCase() || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Email Address</span>
                            <span className="font-medium">{transaction.customer?.email || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Transaction Amount</span>
                            <span className="font-bold text-[#8B5CF6]">{formatPrice(transaction.amount)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Payment Status</span>
                            <span className={`font-bold ${statusColors[transaction.status]?.split(' ')[0] || 'text-gray-500'}`}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
