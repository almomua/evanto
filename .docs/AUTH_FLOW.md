# Authentication & Authorization Flow

## Overview
This document describes the authentication and authorization system for the ProBerry e-commerce platform.

## User Roles
1. **Guest** - Non-registered visitors
2. **User** - Registered customers
3. **Admin** - Store administrators

---

## Guest Mode

Guests can:
- ✅ Browse all products and categories
- ✅ View product details
- ✅ Add items to cart (stored in localStorage)
- ✅ Add items to wishlist (stored in localStorage)
- ✅ View wishlist page (with prompt to sign in)
- ✅ Proceed to checkout (with prompt to sign in or continue as guest)

Guests cannot:
- ❌ View order history
- ❌ Access personal info page (redirected to sign-in prompt)
- ❌ Manage saved addresses
- ❌ Manage payment methods
- ❌ Access admin dashboard

---

## Authentication Pages

### Login (`/auth/login`)
- Email and password authentication
- Redirects admins to `/admin`
- Redirects users to `/` or their intended destination
- Stores redirect destination in sessionStorage for post-login navigation

### Register (`/auth/register`)
- Name, email, password, confirm password
- Automatically logs in after successful registration
- Redirects to home page

---

## Protected Routes

### User Account Pages (`/account/*`)
Protected by `AuthGuard` component in the account layout:

| Route | Guest Behavior |
|-------|---------------|
| `/account` | Shows sign-in prompt |
| `/account/orders` | Shows sign-in prompt |
| `/account/orders/[id]` | Shows sign-in prompt |
| `/account/addresses` | Shows sign-in prompt |
| `/account/payments` | Shows sign-in prompt |
| `/account/wishlist` | ✅ Open to guests (uses localStorage) |

### Admin Pages (`/admin/*`)
Protected by `AdminGuard` component:
- Checks if user has `role: 'admin'`
- Redirects non-admins to home page
- Shows loading spinner while checking auth

---

## Key Components

### `AuthProvider` (`lib/context/auth-context.tsx`)
- Provides user state globally
- Handles login, register, logout
- Checks auth status on mount via `/user/me` endpoint
- Manages redirect after login

### `AuthGuard` (`components/auth/auth-guard.tsx`)
- Protects user account pages
- Shows loading state while checking auth
- Displays sign-in prompt for guests
- Option to redirect or show inline prompt

### `AdminGuard` (`components/admin/admin-guard.tsx`)
- Protects admin dashboard
- Redirects non-admins to home
- Checks `user.role === 'admin'`

### `GuestWishlistPrompt` (`components/auth/guest-wishlist-prompt.tsx`)
- Shown on wishlist page for guests
- Encourages sign-in to sync wishlist

---

## Backend Authentication

### Endpoints
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login with email/password
- `POST /auth/logout` - Clear session
- `GET /auth/refresh` - Refresh access token
- `GET /user/me` - Get current user (protected)

### Cookies
- `jwt` - Refresh token (HttpOnly, 7 days)
- `token` - Access token (15 minutes)

### Protected Routes
- All `/user/*` routes require authentication
- `GET /user` and `DELETE /user/:id` require admin role
- `POST /user` (create user) requires admin role

---

## localStorage Data (Guests)

### Cart (`ProBerry-cart`)
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "brand": "Brand",
      "price": 99.99,
      "image": "url",
      "quantity": 1
    }
  ]
}
```

### Wishlist (`ProBerry-wishlist`)
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "brand": "Brand",
      "price": 99.99,
      "image": "url"
    }
  ]
}
```

---

## UI Behavior

### Header
- Guest: User icon links to `/auth/login`
- Authenticated: User icon links to `/account`, logout button shown

### Account Sidebar
- Guest: Shows "Hello Guest" and "Sign In" button
- Authenticated: Shows user name and "Sign out" button

### Checkout
- Guest: Prompted to sign in (with option to continue as guest)
- Authenticated: Proceeds normally

---

## Error Handling

- 401 errors redirect to login if on protected page
- 403 errors show "Access Denied" for admin routes
- Failed auth check silently sets user to null (guest mode)
