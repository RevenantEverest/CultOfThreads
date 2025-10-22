"use client"

import type { HTMLMotionProps } from 'motion/react';

import { motion } from 'motion/react';

interface MotionSlideInProps extends HTMLMotionProps<"div"> {
    fadeDelay?: number,
    posXDelay?: number,
    posXInitial: number | string
};

function MotionSlideIn({ fadeDelay=0, posXDelay=0, posXInitial, children, ...rest }: MotionSlideInProps) {    
    return(
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: fadeDelay }}
            {...rest}
        >
            <motion.div
                key={`motion-slide-inner-${rest.key}`}
                className="w-full"
                initial={{ x: posXInitial }}
                whileInView={{ x: 0 }}
                transition={{ 
                    stiffness: 120, 
                    type: "spring", 
                    duration: .5, 
                    delay: posXDelay
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default MotionSlideIn;