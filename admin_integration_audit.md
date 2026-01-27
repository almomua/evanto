# Admin Integration Audit & Tasks

## Current Status (Phase 3)

### Dashboard
- [x] **Backend Ready**: Statistics endpoints implemented (`/stats/dashboard`, `/stats/best-sellers`, `/stats/categories`).
- [x] **Frontend Ready**: `getStats`, `getBestSellers`, `getCategoryDistribution` added to `adminApi`.
- [x] **Integrated**:
    - [x] Best Selling Products table (`products-table.tsx`)
    - [x] Trending Products list (`products-table.tsx`)
    - [ ] Category Distribution Chart (Needs Chart.js/Recharts integration)
    - [x] Recent Orders list

### Coupons
- [x] **Backend Ready**: `/coupons` CRUD operations implemented.
- [x] **Frontend Ready**: `getCoupons`, `createCoupon`, `deleteCoupon` added to `adminApi`.
- [x] **Integrated**:
    - [x] Coupon List table (`coupon-table.tsx`)
    - [x] Create Coupon form (`create-coupon-form.tsx`)

### Transactions
- [x] **Backend Ready**: `/transactions` CRUD operations implemented.
- [x] **Frontend Ready**: `getTransactions` added to `adminApi`.
- [x] **Integrated**:
    - [x] Transaction List table (`transaction-table.tsx`)
    - [ ] Transaction Details view (View logic implemented, but details page needs setup)

---

## Technical Debt / Next Steps
1.  **Charts**: Implement real charts for Sales/Revenue and Category Distribution using a library like `recharts`.
2.  **Order Detail Profit**: Implement profit calculation in `Order` model based on cost price.
3.  **Search & Filters**: Enhance backend filtering for transactions and orders to support more parameters.
