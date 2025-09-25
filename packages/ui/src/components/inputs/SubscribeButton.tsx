"use client"

import type { Theme } from '../../types/theme';
import { useFormContext } from '../../context/formContext';
import { Button, type ButtonProps } from '../shadcn/button';
import { BeatLoader } from 'react-spinners';

interface SubscribeButtonProps extends ButtonProps {
    label: string,
    theme: Theme
};

function SubscribeButton({ label, theme, ...rest }: SubscribeButtonProps) {
    const form = useFormContext();
    return (
        <form.Subscribe selector={(state) => ([state.canSubmit, state.isSubmitting])}>
            {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={isSubmitting || !canSubmit} {...rest}>
                    {isSubmitting ? <BeatLoader color={theme.colors.muted} size="11" /> : label }
                </Button>
            )}
        </form.Subscribe>
    )
};

export default SubscribeButton;