import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductWithImages } from '@/types'

export interface CartItem {
  id: string; // unique id for cart item (product.id + variant.id)
  product: ProductWithImages;
  variant?: any; // To support variants later
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: ProductWithImages, quantity?: number, variant?: any) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, variant = null) => {
        set((state) => {
          // Generate unique ID based on product and selected variant
          const itemId = variant ? `${product.id}-${variant.id}` : product.id;
          
          const existingItem = state.items.find((item) => item.id === itemId);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { id: itemId, product, variant, quantity }],
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const price = item.variant?.price_override ?? item.product.base_price;
          // Apply discount if present
          const finalPrice = (item.product.compare_at_price && item.product.compare_at_price < price) 
            ? item.product.compare_at_price 
            : price;
            
          return total + (finalPrice * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'little-pearl-cart', // name of the item in the storage (must be unique)
    }
  )
)
