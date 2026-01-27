'use client';

import {
  TotalSalesCard,
  SmallStatsCard,
  ReportsCard,
  UsersCard,
  CategoryChart,
  TransactionsTable,
  BestSellingProducts,
  TrendingProducts,
  TodayOrdersCard,
  RecentOrdersTable,
} from '@/components/admin';
import { useEffect, useState } from 'react';
import { adminApi, AdminStats } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {/* Row 1: Total Sales & Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TotalSalesCard
            salesValue={`$${stats?.totalSales.toFixed(2) || '0.00'}`}
            costValue="--"
            change={{
              value: '8.56K',
              isPositive: true,
              label: 'vs last 7 days',
            }}
          />
        </div>
        <div className="lg:col-span-5">
          <SmallStatsCard
            title="Total Users"
            subtitle="Registered"
            value={stats?.totalUsers.toString() || '0'}
            change={{
              value: '3%',
              isPositive: true,
              label: 'vs last 7 days',
            }}
            chartColor="#22C55E"
          />
        </div>
      </div>

      {/* Row 2: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SmallStatsCard
          title="Total Orders"
          subtitle="All time"
          value={stats?.totalOrders.toString() || '0'}
          change={{
            value: '8%',
            isPositive: true,
            label: 'vs last 7 days',
          }}
          chartColor="#22C55E"
        />
        <SmallStatsCard
          title="Total Products"
          subtitle="In Catalog"
          value={stats?.totalProducts.toString() || '0'}
          change={{
            value: '12%',
            isPositive: true,
            label: 'vs last 7 days',
          }}
          chartColor="#8B5CF6"
        />
        <SmallStatsCard
          title="Discounted Amount"
          subtitle="Last 7 days"
          value="12K"
          change={{
            value: '2%',
            isPositive: true,
            label: 'vs last 7 days',
          }}
          chartColor="#EF4444"
        />
      </div>

      {/* Row 3: Reports & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ReportsCard />
        </div>
        <div className="lg:col-span-5">
          <UsersCard totalUsers={stats?.totalUsers || 0} />
        </div>
      </div>

      {/* Row 4: Category & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <CategoryChart />
        </div>
        <div className="lg:col-span-8">
          <TransactionsTable />
        </div>
      </div>

      {/* Row 5: Best Selling & Trending Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <BestSellingProducts />
        </div>
        <div className="lg:col-span-4">
          <TrendingProducts />
        </div>
      </div>

      {/* Row 6: Today Orders & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <TodayOrdersCard />
        </div>
        <div className="lg:col-span-8">
          <RecentOrdersTable orders={stats?.recentOrders || []} />
        </div>
      </div>
    </div>
  );
}
