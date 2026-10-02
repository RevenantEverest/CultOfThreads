import { FaDollarSign } from 'react-icons/fa6';

interface ProductPriceProps {
    onlinePrice: number
};

function ProductPrice({ onlinePrice }: ProductPriceProps) {

    return(
        <div className="flex gap-0 lg:gap-10">
            <div className="flex flex-col lg:flex-row items-center pb-2 font-bold text-lg gap-3 md:gap-2 flex-1">
                <div className="flex items-center text-2xl">
                    <FaDollarSign className="text-primary" />
                    <p>{onlinePrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPrice;