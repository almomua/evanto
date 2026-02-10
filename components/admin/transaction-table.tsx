import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { adminApi, Transaction } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';
import { Pagination } from './pagination';

export function TransactionTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await adminApi.getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter(tx =>
        tx.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx._id.includes(searchQuery)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading) return <div className="p-12 text-center text-gray-400">Loading transactions...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters */}
            <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search customer or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm font-medium">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-[#807D7E] font-bold">
                            <th className="px-6 py-4 text-left">TX ID</th>
                            <th className="px-6 py-4 text-left">CUSTOMER</th>
                            <th className="px-6 py-4 text-left">DATE</th>
                            <th className="px-6 py-4 text-left">AMOUNT</th>
                            <th className="px-6 py-4 text-left">METHOD</th>
                            <th className="px-6 py-4 text-left">STATUS</th>
                            <th className="px-6 py-4 text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredTransactions.length === 0 ? (
                            <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400">No transactions found</td></tr>
                        ) : (
                            paginatedTransactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-[#3C4242] font-mono text-xs">#{tx._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-[#3C4242]">{tx.customer?.name || 'Guest'}</td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">
                                        {new Date(tx.transactionDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-[#3C4242] font-bold">{formatPrice(tx.amount)}</td>
                                    <td className="px-6 py-4 text-[#3C4242]">{tx.method}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${tx.status === 'Completed' ? 'text-green-500' :
                                            tx.status === 'Pending' ? 'text-orange-400' : 'text-red-400'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/transactions/${tx._id}`}
                                            className="text-[#8B5CF6] font-bold hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredTransactions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
        </div>
    );
}
