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
    trackingNumber: string,
    trackingUrl: string,
    customerName: string,
    orderNumber: string,
    items: OrderItem[],
    total: string,
    orderUrl: string
}

export default function OrderConfirmation({
    trackingNumber="1ZA3B4C501483927518",
    trackingUrl="https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=1ZA3B4C501483927518/trackdetails",
    customerName="Fellow Cultist",
    orderNumber="dd99ce72-ad6d-4401-8168-6dec42042ffe",
    items=[
        { name: "Ribbon Ghost", quantity: 2, price: "60" },
        { name: "Dark Messiah Plush", quantity: 1, price: "150" }
    ],
    total="1,400",
    orderUrl="https://cultofthreads.com/order/dd99ce72-ad6d-4401-8168-6dec42042ffe",
}: OrderConfirmationProps) {
    return (
        <Layout previewText={`Your oder #${orderNumber} has shipped`}>
            <Heading className="text-xl font-bold text-gray-900">
                {customerName} get excited, your order has shipped!
            </Heading>
            <Section>
                <Text className="text-gray-600">
                    Tracking number is <span className="text-white font-bold">{trackingNumber}</span>
                </Text>
                <Text className="text-gray-600">
                    Order Number is <span className="text-white font-bold">#{orderNumber}</span>
                </Text>
            </Section>

            <Section className="text-center mt-8">
                <Button
                    href={trackingUrl}
                    style={{ 
                        backgroundColor: themes.cute.colors.primary,
                        borderRadius: "8px",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px", // text-sm equivalent,
                        padding: "12px 24px 12px 24px"
                    }}
                >
                    View Tracking
                </Button>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Text className="font-bold text-white text-xl">
                Items in shipment:
            </Text>

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