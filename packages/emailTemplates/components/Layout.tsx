import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Img,
    Tailwind,
} from 'react-email';
import * as themes from '@repo/ui/themes';
import { IMAGE_RESOURCES } from '@repo/ui';

interface LayoutProps {
    previewText?: string
};

export default function Layout({ previewText, children }: React.PropsWithChildren<LayoutProps>) {

    return(
        <Tailwind>
            <Html>
                <Head />
                {previewText && <Preview>{previewText}</Preview>}
                <Body className="bg-gray-100 font-sans py-10 px-10">
                    <Container 
                        style={{ 
                            background: themes.cute.colors.background,
                            padding: "32px",
                            borderRadius: "8px",
                            maxWidth: "576px", // max-w-xl equivalent
                            margin: "0 auto"
                        }} 
                        className="rounded-lg mx-auto p-8 max-w-xl">
                        <Section className="text-center">
                            <Img 
                                src={IMAGE_RESOURCES.LOGO_LANDSCAPE_EMAIL_HEADER}
                                alt="Cult of Threads"
                                className="m-auto"
                            />
                        </Section>
                        {children}
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
};