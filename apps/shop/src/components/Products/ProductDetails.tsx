import type { ProductDetails as Details, ProductTagFull } from '@repo/supabase';

import { createSlateEditor, PlateStatic } from 'platejs';
import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import { 
    BlockquoteElement,
    H1Element,
    H2Element,
    H3Element,
} from '@repo/ui';

import ProductTags from './ProductTags';
import ProductPurchase from './ProductPurchase';
import ProductPrice from './ProductPrice';

interface ProductDetailsProps {
    id: string,
    name: string,
    description?: string,
    details: Details,
    tags: ProductTagFull[] | null
};

function ProductDetails({ id, name, description, details, tags }: ProductDetailsProps) {

    const editor = createSlateEditor({
        plugins: [
            BoldPlugin, 
            ItalicPlugin, 
            UnderlinePlugin,
            H1Plugin.withComponent(H1Element),
            H2Plugin.withComponent(H2Element),
            H3Plugin.withComponent(H3Element),
            BlockquotePlugin.withComponent(BlockquoteElement),
        ],
        value: () => {
            return description && JSON.parse(description);
        }
    });

    return(
        <div className="flex flex-col gap-10 pb-20 md:pb-0">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-center md:text-left">{name}</h1>
                {tags && <ProductTags tags={tags} />}
            </div>
            <ProductPrice 
                marketPrice={details.market_price ?? 0}
                onlinePrice={details.online_price ?? 0}
            />
            <ProductPurchase productId={id} />
            <PlateStatic editor={editor} />
        </div>
    );
};

export default ProductDetails;
