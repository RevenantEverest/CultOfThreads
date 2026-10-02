import { formOptions } from '@tanstack/react-form';
import type { OrderFormValues } from './OrderForm';

export const orderFormOpts = formOptions({
    defaultValues: {} as OrderFormValues
});