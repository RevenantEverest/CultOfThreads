"use client"

import { FaChevronDown } from 'react-icons/fa6';
import { motion } from 'motion/react';
import React from 'react';

function ScrollToSeeMore({ className }: React.HTMLAttributes<HTMLDivElement>) {
  
    return(
        <div className={`absolute bottom-15 md:bottom-20 ${className}`}>
            <motion.div
                className="flex flex-col items-center justify-center"
                animate={{
                    y: ["0vh", "-1.5vh", "0vh"]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            >
                <p className="font-bold">Scroll To See More!</p>
                <FaChevronDown className="text-4xl scale-x-150" />
            </motion.div>
        </div>
    );
};

export default ScrollToSeeMore;