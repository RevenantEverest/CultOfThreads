import type React from 'react';

function DropdownItem({ children, ...rest }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {

    return(
        <div className={`flex gap-3 items-center hover:cursor-pointer pr-10 pl-4 py-2 rounded-lg hover:bg-card`} {...rest}>
            {children}
        </div>
    );
};

export default DropdownItem;