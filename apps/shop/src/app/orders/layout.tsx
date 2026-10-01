import React from 'react';

export default function OrdersLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
    return(
        <div>
            {children}
        </div>
    );
};