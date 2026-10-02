import type { Product as ProductEntity } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import { FaCashRegister } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

import { Button } from '@repo/ui';

import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import AddPaymentProvider from './AddPaymentProvider';
import StatusBadge from './StatusBadge';
import { GoBackButton } from '../Common';

interface ProductProps {
    product: ProductEntity
};

function Product({ product }: ProductProps) {

    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <div>
                    <GoBackButton />
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
                <div className="flex-1 flex flex-col gap-5">
                    <div className="flex gap-5">
                        {!product?.providerDetails?.squareProductId && <AddPaymentProvider product={product} provider="SQUARE" />}
                        {!product?.providerDetails?.stripeProductId && <AddPaymentProvider product={product} provider="STRIPE" />}
                        <div className="flex flex-1 justify-end">
                            <StatusBadge status={product.details.status} size="md" />
                        </div>
                    </div>
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