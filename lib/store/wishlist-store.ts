import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface WishlistState {
  // Guest wishlist (persisted to local storage)
  items: WishlistItem[];
  // Authenticated user wishlist (from server, not persisted)
  serverItems: WishlistItem[];

  // Guest actions
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;

  // Server/authenticated actions
  setServerItems: (items: WishlistItem[]) => void;
  addServerItem: (item: WishlistItem) => void;
  removeServerItem: (id: string) => void;
  clearServerItems: () => void;

  // Check if item is in wishlist - requires auth state to check correct array
  isInWishlist: (id: string, isAuthenticated: boolean) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      serverItems: [],

      // Guest actions
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== item.id) };
          }
          return { items: [...state.items, item] };
        }),

      clearWishlist: () => set({ items: [] }),

      // Server/authenticated actions
      setServerItems: (items) => set({ serverItems: items }),

      addServerItem: (item) =>
        set((state) => {
          if (state.serverItems.some((i) => i.id === item.id)) {
            return state;
          }
          return { serverItems: [...state.serverItems, item] };
        }),

      removeServerItem: (id) =>
        set((state) => ({
          serverItems: state.serverItems.filter((i) => i.id !== id),
        })),

      clearServerItems: () => set({ serverItems: [] }),

      // Check correct array based on auth state
      isInWishlist: (id, isAuthenticated) => {
        const { items, serverItems } = get();
        if (isAuthenticated) {
          return serverItems.some((i) => i.id === id);
        }
        return items.some((i) => i.id === id);
      },
    }),
    {
      name: 'ProBerry-wishlist',
      partialize: (state) => ({ items: state.items }), // Only persist guest items
    }
  )
);



