import type { ReactNode } from 'react';

import { motion } from 'motion/react';
import { Card } from '@@client/components/Common';
import { GiBowTieRibbon } from 'react-icons/gi';

import LinkTreeElementOptions from './LinkTreeElementOptions';

export interface LinkTreeElementProps {
    title: string,
    subtitle: string,
    icon: ReactNode
    index?: number,
    url?: string,
    copyContent?: string
};

function LinkTreeElement({ index, url, title, subtitle, icon, copyContent }: LinkTreeElementProps) {

    const renderContent = () => (
        <div className="flex justify-center items-center gap-4">
            {(index || index === 0) && <GiBowTieRibbon className="text-background text-2xl" />}
            <div>
                <p className="font-bold text-md md:text-2xl">
                    {title}
                </p>
                <p className="font-semibold text-sm md:text-xl mt-[.15rem]">
                    {subtitle}
                </p>
            </div>
            {(index || index === 0) && <GiBowTieRibbon className="text-background text-2xl" />}
        </div>
    );

    return(
        <motion.div
            key={`${title}-link-tree-element-motion`}
            className="hover:cursor-pointer"
            whileHover={{
                y: "-0.5vh"
            }}
        >
            <Card className="rounded-full text-background">
                <div className="flex flex-row items-center gap-2 md:gap-4">
                    <div>
                        {icon}
                    </div>
                    <div className="flex items-center justify-center text-center md:gap-2 flex-1">
                        {
                            url ? 
                            (
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {renderContent()}
                                </a>
                            ) : 
                            renderContent()
                        }
                    </div>
                    <div>
                        <LinkTreeElementOptions copyContent={url ?? copyContent} />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default LinkTreeElement;