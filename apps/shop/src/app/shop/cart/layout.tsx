import React from 'react';

export default function CartLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
    return(
        <div>
            {children}
        </div>
    );
};