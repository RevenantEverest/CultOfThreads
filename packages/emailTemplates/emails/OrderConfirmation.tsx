import {
    Section,
    Row,
    Column,
    Heading,
    Text,
    Button,
    Hr,
} from 'react-email';
import * as themes from '@repo/ui/themes';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

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
    total="1,400",
    orderUrl="https://cultofthreads.com/order/dd99ce72-ad6d-4401-8168-6dec42042ffe",
}: OrderConfirmationProps) {
    return (
        <Layout previewText={`Your order #${orderNumber} is confirmed`}>
            <Heading className="text-xl font-bold text-gray-900">
                Thanks for your order, {customerName}!
            </Heading>
            <Text className="text-gray-600">
                Your order <span className="text-white font-bold">#{orderNumber}</span> has been confirmed and is being processed.
            </Text>

            <Hr className="border-gray-200 my-6" />

            {items.map((item) => (
                <Row key={item.name} className="mb-3">
                    <Column>
                        <Text style={{ color: "white" }}>
                            {item.name} × {item.quantity}
                        </Text>
                    </Column>
                    <Column align="right">
                        <Text
                            style={{ 
                                color: "white", 
                                fontWeight: "800", 
                                margin: 0, 
                                whiteSpace: "nowrap"
                            }}
                        >
                            <span style={{ color: themes.cute.colors.primary, fontWeight: "800" }}>$</span>
                            &nbsp;
                            {item.price}
                        </Text>
                    </Column>
                </Row>
            ))}

            <Hr className="border-gray-200 my-6" />

            <Row>
                <Column>
                    <Text className="font-bold text-white">Total</Text>
                </Column>
                <Column align="right">
                    <Text 
                        style={{ 
                            color: "white", 
                            fontWeight: "800", 
                            margin: 0, 
                            whiteSpace: "nowrap"
                        }}
                    >
                        <span style={{ color: themes.cute.colors.primary, fontWeight: "800" }}>$</span>
                        &nbsp;
                        {total}
                    </Text>
                </Column>
            </Row>

            <Section className="text-center mt-8">
                <Button
                    href={orderUrl}
                    style={{ 
                        backgroundColor: themes.cute.colors.primary,
                        borderRadius: "8px",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px", // text-sm equivalent,
                        padding: "12px 24px 12px 24px"
                    }}
                >
                    View your order
                </Button>
            </Section>

            <Footer />
        </Layout>
    );
};