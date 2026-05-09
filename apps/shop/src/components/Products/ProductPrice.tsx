import { FaShop, FaCartShopping, FaDollarSign } from 'react-icons/fa6';

interface ProductPriceProps {
    marketPrice: number,
    onlinePrice: number
};

function ProductPrice({ marketPrice, onlinePrice }: ProductPriceProps) {

    return(
        <div className="flex gap-0 lg:gap-10">
            <div className="flex flex-col lg:flex-row items-center pb-2 font-bold text-lg gap-3 md:gap-2 flex-1">
                <FaCartShopping className="text-2xl md:text-lg" />
                <p>Online Price:</p>
                <div className="bg-card-light flex items-center px-5 py-1 rounded-full">
                    <FaDollarSign className="text-primary" />
                    <p>{onlinePrice.toLocaleString()}</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center pb-2 font-bold text-lg gap-3 md:gap-2 flex-1">
                <FaShop className="text-2xl md:text-lg" />
                <p>Market Price:</p>
                <div className="bg-card-light flex items-center px-5 py-1 rounded-full">
                    <FaDollarSign className="text-primary" />
                    <p>{marketPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPrice;