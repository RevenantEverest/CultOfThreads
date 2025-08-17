import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
    id: string,
    email?: string,
};

export interface Session {
    accessToken: string,
    expiresAt?: number,
    expiresIn: number,
    refreshToken: string,
    tokenType: string
};

interface Auth {
    user?: User,
    session?: Session
};

interface AuthState {
    auth: Auth,
    login: (auth: Auth) => void
};

const initialState: Auth = {
    
};

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            auth: initialState,
            login: (auth: Auth) => set(() => ({ auth }))
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);