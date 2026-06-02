import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Button } from '@repo/ui';

import { Layout } from '@@admin/components/Common';
import { useAuthStore } from '@@admin/store/auth';
import { auth as authUtils } from '@@admin/utils';
import { FaArrowRightLong } from 'react-icons/fa6';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {

    const auth = useAuthStore((state) => state.auth);

    const isAuthenticated = () => {
        if(auth.session && !authUtils.isTokenExpired(auth.session.accessToken)) {
            return true;
        }

        return false;
    };

    return(
        <Layout main className="mt-40">
            <div className="flex items-center justify-center w-full">
            {
                isAuthenticated() ?
                <Link to="/dashboard">
                    <Button className="w-full" size="xl">
                        Go To Dashboard
                        <FaArrowRightLong />
                    </Button>
                </Link>
                :
                <Link to="/login">
                    <Button className="w-full" size="xl">
                        Login
                    </Button>
                </Link>
            }
            </div>
        </Layout>
    );
};
