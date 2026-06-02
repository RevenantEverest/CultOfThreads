import { Layout } from '@@admin/components/Common';
import LoginForm from '@@admin/components/Forms/LoginForm';
import { auth } from '@@admin/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
    component: Login,
    beforeLoad: auth.guestGuard
});

function Login() {

    return(
        <Layout main className="mt-40">
            <div className="flex items-center justify-center">
            <LoginForm className="w-full lg:w-8/12" />
            </div>
        </Layout>
    );
};