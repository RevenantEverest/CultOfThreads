"use client"

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

interface HighlightItemProps {
    imageSrc: string,
    title: string,
    subtitle: string,
    to: string
};

function HighlightItem({ imageSrc, title, subtitle, to }: HighlightItemProps) {

    return(
        <Link href={to} className="flex-1 text-center">
            <motion.div
                className="flex flex-col gap-5"
                whileHover={{ y: "-0.5dvh" }}
            >
                <div className="relative border-6 border-primary rounded-xl">
                    <Image fill className="!relative" src={imageSrc} alt={title} />
                </div>
                <div>
                    <h1 className="font-bold text-4xl uppercase w-full">{title}</h1>
                    <p className="font-semibold text-muted text-xl">{subtitle}</p>
                </div>
            </motion.div>
        </Link>
    );
};

export default HighlightItem;