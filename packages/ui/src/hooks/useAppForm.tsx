import { lazy } from 'react';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './context/formContext';

const TextField = lazy(() => import ('../components/Inputs/TextInput'));
const TextAreaField = lazy(() => import ('../components/Inputs/TextArea'));
const SubscribeField = lazy(() => import('../components/SubscribeButton'));

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        TextField,
        TextAreaField
    },
    formComponents: {
        SubscribeField
    },
    fieldContext,
    formContext
});