import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Row,
    Column,
    Heading,
    Text,
    Button,
    Hr,
    Img,
    Tailwind,
} from 'react-email';
import { IMAGE_RESOURCES } from '@repo/ui';
import * as themes from '@repo/ui/themes';

interface OrderItem {
    name: string,
    quantity: number,
    price: string,
    image?: string
}

export interface OrderConfirmationProps {
    customerName: string,
    orderNumber: string,
    items: OrderItem[],
    total: string,
    orderUrl: string
}

export default function OrderConfirmation({
    customerName="fellow Cultist",
    orderNumber="dd99ce72-ad6d-4401-8168-6dec42042ffe",
    items=[
        { name: "Ribbon Ghost", quantity: 2, price: "60" },
        { name: "Dark Messiah Plush", quantity: 1, price: "150" }
    ],
    total="1,056",
    orderUrl="https://cultofthreads.com/order/dd99ce72-ad6d-4401-8168-6dec42042ffe",
}: OrderConfirmationProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Your order #{orderNumber} is confirmed</Preview>
                <Body className="bg-gray-100 font-sans py-10">
                    <Container style={{ background: themes.cute.colors.background }} className="rounded-lg mx-auto p-8 max-w-xl">
                        <Container className="flex items-center justify-center">
                            <Img src={IMAGE_RESOURCES.LOGO_LANDSCAPE} className="w-50" />
                        </Container>
                        <Heading className="text-xl font-bold text-gray-900">
                            Thanks for your order, {customerName}!
                        </Heading>

                        <Text className="text-gray-600">
                            Your order #{orderNumber} has been confirmed and is being processed.
                        </Text>

                        <Hr className="border-gray-200 my-6" />

                        {items.map((item) => (
                            <Row key={item.name} className="mb-3">
                                <Column>
                                    <Text className="text-gray-800 m-0">
                                        {item.name} × {item.quantity}
                                    </Text>
                                </Column>
                                <Column align="right" className="flex gap-1 items-center justify-end">
                                    <Text className="font-bold" style={{ color: themes.cute.colors.primary }}>$</Text>
                                    <Text className="text-gray-800 m-0">{item.price}</Text>
                                </Column>
                            </Row>
                        ))}

                        <Hr className="border-gray-200 my-6" />

                        <Row>
                            <Column>
                                <Text className="font-bold text-gray-900">Total</Text>
                            </Column>
                            <Column align="right" className="flex gap-1 items-center justify-end">
                                <Text className="font-bold" style={{ color: themes.cute.colors.primary }}>$</Text>
                                <Text className="font-bold text-gray-900">{total}</Text>
                            </Column>
                        </Row>

                        <Section className="text-center mt-8">
                            <Button
                                href={orderUrl}
                                style={{ background: themes.cute.colors.primary }}
                                className="text-white px-6 py-3 rounded-md text-sm font-medium"
                            >
                                View your order
                            </Button>
                        </Section>

                        <Text className="text-gray-400 text-xs text-center mt-8">
                            If you have questions, please send an email to <span className="text-[#FB5377]">contact@cultofthreads.com.</span>
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
};