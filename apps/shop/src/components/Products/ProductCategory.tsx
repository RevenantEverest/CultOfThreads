import type { Category } from '@repo/entities';

import { MotionHover, ScrollLink } from '@repo/ui';

interface ProductCategoryProps {
    category: Category,
    scrollTo: string,
    isActive?: boolean,
    onClick?: () => void,
};

function ProductCategory({ category, scrollTo, isActive, onClick }: ProductCategoryProps) {
    return(
        <MotionHover>
                <ScrollLink
                    to={scrollTo}
                    padding={120}
                    className={`
                        text-center w-60 rounded-xl py-2 hover:cursor-pointer 
                        ${isActive ? "bg-primary" : "bg-card-light"}
                    `}
                    onClick={onClick}
                >
                    <p className={`font-bold text-xl`}>{category.name}</p>
                </ScrollLink>
            </MotionHover>
    );
};

export default ProductCategory;