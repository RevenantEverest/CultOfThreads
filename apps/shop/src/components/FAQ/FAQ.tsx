import type { FAQItem } from './FAQItem';

import Link from 'next/link';
import { Accordion, Button, Card, CardContent } from '@repo/ui';
import FAQContent from './FAQItem';
import React from 'react';

const faqContent: FAQItem[] = [
    {
        question: "Do you take custom orders?",
        answer: `
            i can't always guarantee it but i'll try my best.
        `
    },
    {
        question: "Is this safe for children?",
        answer: `
            The safety eyes are secured on the plushie but 
            there is always a small chance that a small child 
            may choke on them if the eyes were to fall off
        `
    },
    {
        question: "Can you make modifications on existing plushies?",
        answer: `
            If they are already finished I cannot but I can definitely make a custom made one for you.
        `
    },
    {
        question: "Do you have other sizes available?",
        answer: `
            Unfortunately no, they only come in one size (large). 
        `
    },
    {
        question: "Are they returnable?",
        answer: `
            All plushies are final sale.
        `
    },
    {
        question: "Do they come to life?",
        answer: `
            Not that i know of but i cant say for sure.
        `
    },
    {
        question: "What are they made out of?",
        answer: `
            My plushies are made from chenille yarn, polyfill stuffing, acrylic safety eyes.
        `
    },
    {
        question: "Are they safe to wash?",
        answer: `
            I would recommend using a wet wipe first but if you put it in the wash make sure to wash on delicate.
        `
    }
];

function FAQ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {

    const renderContent = () => {
        return faqContent.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === (faqContent.length - 1);

            return(
                <FAQContent 
                    key={`faq-${item.question}`} 
                    item={item}
                    isFirst={isFirst}
                    isLast={isLast}
                />
            );
        });
    };

    return(
        <div className={`flex flex-col items-center justify-center gap-10 w-full ${className}`} {...rest}>
            <h1 className="font-beach text-3xl md:text-6xl text-center">
                FAQ&apos;s
            </h1>
            <Card className="w-full">
                <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                        {renderContent()}
                    </Accordion>
                </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-5">
                <p className="font-semibold text-primary text-lg">Still have questions?</p>
                <Link href="/contact">
                    <Button>
                        Contact Us!
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default FAQ;