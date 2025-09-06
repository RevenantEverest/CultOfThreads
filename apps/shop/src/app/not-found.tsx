"use client"

import { Layout } from '@@shop/components/Common';
import { Button } from '@repo/ui';
import Link from 'next/link';

function NotFound() {

    return(
        <Layout main transparent>
            <div className="flex flex-col items-center justify-center h-[80dvh] w-6/12 text-center gap-10">
                <h1 className="font-bold text-4xl">The page you&apos;re looking for may have been taken by one of the dolls.</h1>
                <Link href="/">
                    <Button size="lg">Return To Safety</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;