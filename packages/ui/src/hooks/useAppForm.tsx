import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/formContext.js';
import TextField from '../components/inputs/TextInput.js';
import TextAreaField from '../components/inputs/TextArea.js';
import SubscribeField from '../components/inputs/SubscribeButton.js';

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