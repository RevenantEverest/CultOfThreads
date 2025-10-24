import type { ProductListing } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import { FaCashRegister } from 'react-icons/fa6';
import { FaEdit, FaLongArrowAltLeft } from 'react-icons/fa';

import { Button } from '@repo/ui';

import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';

interface ProductProps {
    product: ProductListing
};

function Product({ product }: ProductProps) {

    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <div>
                    <Link to="/dashboard/products">
                        <Button colorScheme={"cardLight"}>
                            <FaLongArrowAltLeft />
                            Back To Products
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-1 justify-center md:justify-end gap-2">
                    <Link to="/dashboard/sales/add" search={{ productId: product.id }}>
                        <Button colorScheme={"cardLight"}>
                            <FaCashRegister />
                            Create Sale
                        </Button>
                    </Link>
                    <Link to="/dashboard/products/edit/$productId" params={{ productId: product.id }}>
                        <Button colorScheme={"cardLight"}>
                            <FaEdit />
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                    {
                        product.media &&
                        <ProductImages images={product.media} />
                    }
                </div>
                <div className="flex-1">
                    {
                        product.details &&
                        <ProductDetails name={product.name} description={product.description?.toString()} details={product.details} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;