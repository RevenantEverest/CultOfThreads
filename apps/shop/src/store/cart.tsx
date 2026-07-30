import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
    productId: string,
    quantity: number
};

interface CartActions {
    toggleCart: () => void,
    addItem: (item: CartItem) => void,
    reduceItemQuantity: (productId: string) => void,
    removeItem: (productId: string) => void,
    updateCart: (items: CartItem[]) => void,
    emptyCart: () => void
};

interface CartState {
    cart: {
        items: CartItem[]
    },
    isOpen: boolean
};

const initialState: CartState = {
    cart: {
        items: []
    },
    isOpen: false
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            addItem: (item: CartItem) => {
                const cartItems = get().cart.items;
                
                const existingItemIndex = cartItems.findIndex((cItem) => cItem.productId === item.productId);

                let newItems: CartItem[] = [...cartItems, item];

                if(existingItemIndex > -1) {
                    newItems = cartItems.map((cItem, index) => {
                        if(index === existingItemIndex) {
                            return {
                                ...cItem,
                                quantity: cItem.quantity + item.quantity
                            }
                        }

                        return cItem;
                    });
                }

                set(() => ({
                    cart: {
                        items: newItems
                    }
                }));
            },
            reduceItemQuantity: (productId: string) => {
                const cartItems = get().cart.items;
                const existingItemIndex = cartItems.findIndex((cItem) => cItem.productId === productId);

                let newItems: CartItem[] = [...cartItems];

                if(existingItemIndex > -1) {
                    newItems = cartItems.map((cItem, index) => {
                        if(index === existingItemIndex) {
                            return {
                                ...cItem,
                                quantity: cItem.quantity - 1
                            }
                        }

                        return cItem;
                    });
                }

                set(() => ({
                    cart: {
                        items: newItems
                    }
                }));
            },
            removeItem: (productId: string) => {
                const cartItems = get().cart.items;
                const existingItemIndex = cartItems.findIndex((cItem) => cItem.productId === productId);

                const newItems = [...cartItems];

                if(existingItemIndex > -1) {
                    newItems.splice(existingItemIndex, 1);
                }

                set(() => ({
                    cart: {
                        items: newItems
                    }
                }));
            },
            toggleCart: () => {
                const currentValue = get().isOpen;
                set(() => ({ isOpen: !currentValue }));
            },
            updateCart: (items: CartItem[]) => set(() => ({ 
                cart: {
                    items
                }
            })),
            emptyCart: () => set(() => ({
                cart: {
                    items: []
                }
            }))
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);