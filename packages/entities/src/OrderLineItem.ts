import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    type Relation,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import Product from './Product';
import Order from './Order';

@Entity("order_line_items")
export default class OrderLineItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "int" })
    purchasePriceSnapshot: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @ManyToOne(() => Product, (product) => product.orderLineItems, { onDelete: "SET NULL" })
    @JoinColumn()
    product: Relation<Product>;

    @ManyToOne(() => Order, (order) => order.orderLineItems, { onDelete: "CASCADE" })
    order: Relation<Order>;
};