import { useCallback, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useAuthStore } from '@@admin/store/auth';

function AuthValidator() {
    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const validateAuth = useCallback(() => {
        if(!auth.user) {
            navigate({ to: "/login" });
        }
    }, [auth, navigate]);

    useEffect(() => {
        validateAuth();
    }, [validateAuth, auth]);

    return null;
};

export default AuthValidator;