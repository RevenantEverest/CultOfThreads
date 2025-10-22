"use client"

import type { HTMLMotionProps } from 'motion/react';

import React from 'react';
import { motion } from 'motion/react';

interface MotionHoverProps extends HTMLMotionProps<"div"> {
    disable?: boolean
};

function MotionHover({ children, disable, ...rest }: React.PropsWithChildren<MotionHoverProps>) {

    return(
        <motion.div
            whileHover={
                disable ? {} : { y: "-.5dvh" }
            }
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default MotionHover;