import LoginForm from '@@admin/components/Forms/LoginForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
    component: Login,
});

function Login() {

    return(
        <div className="flex items-center justify-center lg:px-96 h-screen">
            <LoginForm />
        </div>
    );
};