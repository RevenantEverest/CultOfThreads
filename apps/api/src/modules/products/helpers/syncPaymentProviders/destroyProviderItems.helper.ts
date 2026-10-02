import type { Product } from '@repo/entities';
import type { 
    SyncPaymentProviderOptions
} from '~/modules/products/helpers/syncPaymentProviders/types';

import * as stripe from '~/integrations/stripe';
import * as square from '~/integrations/square';

import { logs, entities } from '~/utils';

type Options = SyncPaymentProviderOptions;

export default async function destroyPaymentProviderItem(product: Product, options?: Options) {
    
};