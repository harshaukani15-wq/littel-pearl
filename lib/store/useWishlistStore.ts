import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductWithImages } from '@/types'

interface WishlistStore {
  items: ProductWithImages[];
  addItem: (product: ProductWithImages) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (state.items.find((item) => item.id === product.id)) {
            return state; // Already exists
          }
          return { items: [...state.items, product] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      hasItem: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'little-pearl-wishlist',
    }
  )
)
