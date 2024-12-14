import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    matchWidth?: boolean,
    contentContainerClassName?: string,
    headerComponent: React.FC<React.HTMLProps<HTMLDivElement>>
};

function Dropdown(props: React.PropsWithChildren<DropdownProps>) {

    const { 
        className="", 
        contentContainerClassName="",
        headerComponent, 
        matchWidth, 
        children
    } = props;

    const bgColor = "bg-card-light";
    const Header = headerComponent;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseDownClose = useCallback((e: MouseEvent) => {
        if(!triggerRef.current || !dropdownRef.current || !e.target || !isOpen) {
            return;
        }

        if(!dropdownRef.current.contains(e.target as Node) && !triggerRef.current.contains(e.target as Node)){
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownClose);

        return () => {
            document.removeEventListener("mousedown", handleMouseDownClose);
        };
    }, [handleMouseDownClose]);

    return(
        <div className={`flex-col ${className}`}>
            <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                <Header />
            </div>
            <AnimatePresence key="dropdown" mode="wait">
                {
                    isOpen &&
                    <motion.div
                        ref={dropdownRef}
                        className={`
                            relative bottom-0 w-full z-50
                            ${contentContainerClassName}
                        `}
                        initial={{ y: "-1vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-1vh", opacity: 0 }}
                    >
                        <div 
                            className={`
                                absolute rounded-lg px-2 py-2
                                ${bgColor}
                            `}
                            style={{ 
                                ...((matchWidth && triggerRef.current) && { width: triggerRef.current?.offsetWidth })
                            }} 
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {children}
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;