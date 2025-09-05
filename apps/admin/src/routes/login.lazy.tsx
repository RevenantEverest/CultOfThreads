import { Layout } from '@@admin/components/Common';
import LoginForm from '@@admin/components/Forms/LoginForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
    component: Login,
});

function Login() {

    return(
        <Layout main className="mt-40">
            <div className="flex items-center justify-center">
            <LoginForm className="w-8/12" />
            </div>
        </Layout>
    );
};