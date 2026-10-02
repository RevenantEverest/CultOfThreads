import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    productId: string,
    quantity: number
};

interface CartActions {
    getTotalQuantities: () => number,
    toggleCart: () => void,
    setCustomerNote: (note: string) => void,
    addItem: (item: CartItem) => void,
    reduceItemQuantity: (productId: string) => void,
    removeItem: (productId: string) => void,
    updateCart: (items: CartItem[]) => void,
    emptyCart: () => void,
    setHasHydrated: (value: boolean) => void
};

interface CartState {
    cart: {
        items: CartItem[]
    },
    customerNote: string,
    isOpen: boolean,
    hasHydrated: boolean
};

const initialState: CartState = {
    cart: {
        items: []
    },
    customerNote: "",
    isOpen: false,
    hasHydrated: false
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            getTotalQuantities: (): number => {
                const cartItems = get().cart.items;
                const quantities = cartItems.map((item) => item.quantity);

                if(quantities.length >= 1) {
                    return quantities.reduce((acc, curr) => acc += curr);
                }

                return 0;
            },
            setCustomerNote: (note: string) => set(() => ({ customerNote: note })),
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
            })),
            setHasHydrated: (value: boolean) => {
                set(() => ({ hasHydrated: value }));
            }
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        },
    ),
);