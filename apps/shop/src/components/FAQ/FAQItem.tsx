"use client"

import { 
    AccordionItem, 
    AccordionContent, 
    AccordionTrigger
} from '@repo/ui';

export interface FAQItem {
    question: string,
    answer: string
};

interface FAQContentProps {
    item: FAQItem,
    isFirst: boolean,
    isLast: boolean
};

function FAQContent({ item, isFirst, isLast }: FAQContentProps) {

    return(
        <AccordionItem 
            key={`faq-${item.question}`}
            value={item.question} 
            className={`
                border-0 bg-card px-5
                hover:bg-card-light/50
                duration-300 transition-all
                ${isFirst && "rounded-t-lg"}
                ${isLast && "rounded-b-lg"}
            `}
        >
            <AccordionTrigger
                className="font-bold text-md md:text-2xl hover:no-underline"
            >
                {item.question}
            </AccordionTrigger>
            <AccordionContent
                className="font-semibold text-md md:text-lg text-accent"
            >
                {item.answer}
            </AccordionContent>
        </AccordionItem>
    );
};

export default FAQContent;