import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '@@admin/store/auth';

/**
 * Checks if a JWT is expired.
 * @param token The JWT string.
 * @returns boolean true if expired, false otherwise.
 */
export function isTokenExpired(token: string): boolean {
    try {
        const base64Url = token.split('.')[1];

        if(!base64Url) {
            throw new Error("Invalid Token");
        }
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        const jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const { exp } = JSON.parse(jsonPayload);

        const currentTime = Math.floor(Date.now() / 1000);
        return exp < currentTime + 5;
    } catch {
        return true;
    }
}

export const authGuard = () => {
    const state = useAuthStore.getState();
    const { user, session } = state.auth;

    if (!user || (session && isTokenExpired(session.accessToken))) {
        throw redirect({ to: '/login' });
    }
};

export const guestGuard = () => {
    const state = useAuthStore.getState();
    const { user, session } = state.auth;

    if(user && session && !isTokenExpired(session.accessToken)) {
        throw redirect({ to: "/dashboard" });
    }
};