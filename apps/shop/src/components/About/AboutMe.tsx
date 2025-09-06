import { Button, Card, CardContent } from '@repo/ui';
import Image from 'next/image';
import SocialsBar from '../SocialsBar';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

function AboutMe() {

    return(
        <div className="flex flex-col md:flex-row items-center justify-center relative gap-5">
            <div className="w-90 h-80 lg:w-150 lg:h-180 flex overflow-hidden p-1 relative border-card-light border-4 bg-card-light rounded-lg">
                <Image
                    className="shrink-0 relative object-cover w-full h-full rounded-lg"
                    height={2000}
                    width={2000}
                    src="https://cdn.imgchest.com/files/f9ee2cb844e3.jpg"
                    alt="Market Stall"
                />
            </div>
            <Card className="flex-1 w-full">
                <CardContent className="flex flex-col gap-10 pt-5 pb-48 md:pb-68">
                    <h1 className="text-3xl md:text-6xl text-center md:text-left font-beach">About Cult of Threads</h1>
                    <p className="font-semibold text-md md:text-lg">
                        Hi! I&apos;m a horror-loving, craft-obsessed creator who finds joy in anything horror and cute. 
                        I handmake crocheted plushies that blend creepy-cute vibes with a playful spirit. Bringing out my 
                        inner child through every stitch, I create pieces that are both fun and a little fantastical.
                        <br /><br />
                        I learned to crochet on a whim, never imagining it would become such a big part of my life, let alone 
                        my small business! What started with a very questionable scarf has grown into a passion for creating 
                        handmade horror plushies that are equal parts spooky and cute. Doing markets has been incredibly 
                        fulfilling, and I&apos;m so excited to keep growing, creating, and sharing my spooky little world with you.
                        I truly believe you&apos;re never too old to enjoy the silly, playful things that make life fun, and 
                        I hope my plushies can be a little reminder of that magic.
                    </p>
                    <div className="flex items-center justify-center md:justify-start">
                        <Link href="/shop">
                            <Button>Check Out What I Have To Offer <FaLongArrowAltRight /></Button>
                        </Link>
                    </div>
                    <div className="flex absolute bottom-6">
                        <div className="flex flex-col gap-5">
                            <p className="font-bold text-2xl">Follow Me!</p>
                            <SocialsBar size="4xl" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            
        </div>
    );
};

export default AboutMe;