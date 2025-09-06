"use client"

import { Layout } from '@@shop/components/Common';
import { Button } from '@repo/ui';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';

function NotFound() {

    return(
        <Layout main transparent>
            <div className="flex flex-col items-center justify-center h-[80dvh] w-full md:w-6/12 text-center gap-10">
                <div className="flex flex-col gap-5">
                    <p className="font-bold text-6xl text-primary">404</p>
                    <h1 className="font-bold text-2xl md:text-4xl">The page you&apos;re looking for may have been taken by one of the dolls.</h1>
                </div>
                <Link href="/">
                    <Button size="lg" colorScheme={"cardLight"}>
                        Return To Safety <span className="!font-semibold text-muted">(Go To Homepage)</span>
                        <FaLongArrowAltRight />
                    </Button>
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;