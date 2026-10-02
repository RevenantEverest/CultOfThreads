import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import OrderLineItem from './OrderLineItem';
import Sale from './Sale';

type OrderStatus = (
    "FAILED" |
    "PENDING" |
    "PAID" | 
    "SHIPPED" | 
    "COMPLETE" |
    "CANCELLED" | 
    "REFUNDED"
);

type ShippingOption = (
    "STANDARD" |
    "EXPRESS"
);

@Entity("orders")
export default class Order extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    status: OrderStatus;

    @Column({ type: "varchar", nullable: true })
    customerEmail: string;

    @Column({ type: "varchar", nullable: true })
    customerName: string;

    @Column({ type: "varchar", nullable: true })
    billingAddress: string;

    @Column({ type: "varchar", nullable: true })
    shippingAddress: string;

    @Column({ type: "varchar", nullable: true })
    shippingOptionName: ShippingOption;

    @Column({ type: "varchar", nullable: true })
    shippingOptionId: string;

    @Column({ type: "int", nullable: true })
    shippingAmountInCents: number;

    @Column({ type: "varchar", nullable: true })
    trackingNumber: string;

    @Column({ type: "int", nullable: true })
    amountSubtotalInCents: number;

    @Column({ type: "int", nullable: true })
    amountTotalInCents: number;

    @Column({ type: "int", nullable: true })
    taxCollectedInCents: number;

    @Column({ type: "varchar", nullable: true })
    stripeTransactionId: string;

    @Column({ type: "varchar", nullable: true })
    stripeCheckoutSessionId: string;

    @Column({ type: "text", nullable: true })
    customerNotes: string;

    @Column({ type: "timestamptz" })
    tokensValidBefore: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    /* Relations */
    @OneToMany(() => OrderLineItem, (orderLineItem) => orderLineItem.order, { cascade: true })
    orderLineItems: OrderLineItem[];

    @OneToMany(() => Sale, (sales) => sales.order, { cascade: true })
    sales: Sale[];
};