import { useAppForm } from '@repo/ui/hooks';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';

import { supabase } from '@repo/supabase';

import { Card, CardContent, ToastError } from '@repo/ui';

import { useThemeStore } from '@@admin/store/theme';
import { useAuthStore } from '@@admin/store/auth';

export interface LoginFormValues {
    email: string,
    password: string
};

function LoginForm() {

    const theme = useThemeStore((state) => state.theme);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        email: "",
        password: ""
    };

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: value.email,
                password: value.password
            });

            if(error || !data) {
                return toast((t) => (
                    <ToastError toast={t} message={error?.message ?? "Login Error"} />
                ));
            }

            const { 
                access_token, 
                expires_in, 
                expires_at, 
                refresh_token, 
                token_type
            } = data.session;

            login({
                user: {
                    id: data.user.id,
                    email: data.user.email
                },
                session: {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresAt: expires_at,
                    expiresIn: expires_in,
                    tokenType: token_type
                }
            });

            return navigate({ to: "/dashboard" });
        }
    });

    return(
        <Card className="w-full">
            <CardContent className="py-8">
                <h1 className="text-center font-bold text-4xl mb-10">Login</h1>
                <form
                    className="flex flex-col gap-10"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        form.handleSubmit();
                    }}
                >
                    <form.AppForm>
                        <div className="w-full flex flex-col items-center justify-center gap-8">
                            <div className="w-full">
                                <form.AppField
                                    name="email"
                                    children={(field) => (
                                        <field.TextField label='Email' type="text" theme={theme} />
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <form.AppField
                                    name="password"
                                    children={(field) => (
                                        <field.TextField label="Password" type="password" theme={theme} />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <form.SubscribeField theme={theme} label="Login" className="px-10" />
                        </div>
                    </form.AppForm>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;