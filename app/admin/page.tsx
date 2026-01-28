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
import { formatPrice } from '@/lib/utils';

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
            salesValue={formatPrice(stats?.totalSales || 0)}
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

      {/* Row 2: Analytics Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmallStatsCard
          title="Active Users"
          subtitle="Last 15 min"
          value={stats?.activeUsers.toString() || '0'}
          change={{
            value: 'Live',
            isPositive: true,
            label: 'real-time',
          }}
          chartColor="#22C55E"
        />
        <SmallStatsCard
          title="Sessions Today"
          subtitle="Unique visits"
          value={stats?.sessionsToday.toString() || '0'}
          change={{
            value: `${stats?.sessionsThisWeek || 0} this week`,
            isPositive: true,
            label: '',
          }}
          chartColor="#3B82F6"
        />
        <SmallStatsCard
          title="Page Views"
          subtitle="Today"
          value={stats?.pageViewsToday.toString() || '0'}
          change={{
            value: 'PostHog',
            isPositive: true,
            label: 'analytics',
          }}
          chartColor="#8B5CF6"
        />
        <SmallStatsCard
          title="Total Orders"
          subtitle="All time"
          value={stats?.totalOrders.toString() || '0'}
          change={{
            value: `${stats?.totalProducts || 0} products`,
            isPositive: true,
            label: 'in catalog',
          }}
          chartColor="#F59E0B"
        />
      </div>

      {/* Row: Coupon Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SmallStatsCard
          title="Coupons Used"
          subtitle="Total redemptions"
          value={stats?.couponsUsed.toString() || '0'}
          change={{
            value: 'Redeemed',
            isPositive: true,
            label: 'Successfully',
          }}
          chartColor="#10B981"
        />
        <SmallStatsCard
          title="Total Savings"
          subtitle="Amount cut by coupons"
          value={formatPrice(stats?.totalDiscountCut || 0)}
          change={{
            value: 'Value',
            isPositive: true,
            label: 'Discounted',
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
