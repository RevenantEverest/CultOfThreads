import type { ProductDetails as Details } from '@repo/supabase';

import posthog from 'posthog-js';
import { FaShop, FaCartShopping, FaDollarSign } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
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
    Button,
    H1Element,
    H2Element,
    H3Element,
} from '@repo/ui';

interface ProductDetailsProps {
    id: string,
    name: string,
    description?: string,
    details: Details
};

function ProductDetails({ id, name, description, details }: ProductDetailsProps) {

    const pathname = usePathname();
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
            <h1 className="text-4xl font-bold text-center md:text-left">{name}</h1>
            <div className="flex gap-0 md:gap-10">
                <div className="flex flex-col md:flex-row items-center pb-2 font-bold text-lg gap-3 md:gap-2 flex-1">
                    <FaShop className="text-2xl md:text-lg" />
                    <p>Market Price:</p>
                    <div className="bg-card-light flex items-center px-5 py-1 rounded-full">
                        <FaDollarSign className="text-primary" />
                        <p>{details.market_price?.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center pb-2 font-bold text-lg gap-3 md:gap-2 flex-1">
                    <FaCartShopping className="text-2xl md:text-lg" />
                    <p>Online Price:</p>
                    <div className="bg-card-light flex items-center px-5 py-1 rounded-full">
                        <FaDollarSign className="text-primary" />
                        <p>{details.online_price?.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            {
                (details.etsy_listing && details.etsy_listing !== "") ?
                <div className="flex justify-center md:justify-start">
                    <a 
                        href={details.etsy_listing} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                            posthog.capture("product etsy link click", { productId: id, productName: name, location: pathname });
                        }}
                    >
                        <Button className="text-text">
                            Shop on Etsy
                        </Button>
                    </a>
                </div>
                :
                <div className="flex justify-center md:justify-start">
                    <Button disabled className="text-text">
                        Only Available At Markets Currently
                    </Button>
                </div>
            }
            <PlateStatic editor={editor} />
        </div>
    );
};

export default ProductDetails;
