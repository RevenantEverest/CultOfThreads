"use client"

import { motion } from 'motion/react';
import React from 'react';

interface MotionHoverProps {
    disable?: boolean
};

function MotionHover({ children, disable }: React.PropsWithChildren<MotionHoverProps>) {

    return(
        <motion.div
            whileHover={
                disable ? {} : { y: "-.5dvh" }
            }
        >
            {children}
        </motion.div>
    );
};

export default MotionHover;