"use client"

import { FaChevronDown } from 'react-icons/fa6';
import { motion } from 'motion/react';

function ScrollToSeeMore() {
  
    return(
        <div className="absolute bottom-20 ">
            <motion.div
                className="flex flex-col items-center justify-center"
                animate={{
                    y: ["0vh", "-2vh", "0vh"]
                }}
                transition={{
                    duration: 2.5,
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