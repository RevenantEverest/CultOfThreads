import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import Product from './Product';
import Event from './Event';

@Entity("sales")
export default class Sale {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: true })
    marketName: string;

    @Column({ type: "varchar", })
    productName: string;

    @Column({ type: "float4" })
    originalProductPrice: number;

    @Column({ type: "float4" })
    salePrice: number;

    @Column({ type: "varchar" })
    saleType: "EVENT" | "ONLINE" | "OTHER";

    @Column({ type: "timestamptz" })
    purchaseDate: Date;

    @Column({ type: "jsonb", nullable: true })
    notes: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @ManyToOne(() => Product, (product) => product.sales, { onDelete: "SET NULL" })
    @JoinColumn({
        foreignKeyConstraintName: "sales_product_id_fkey"
    })
    product: Relation<Product>;

    @ManyToOne(() => Event, (event) => event.sales, { onDelete: "SET NULL" })
    @JoinColumn({
        foreignKeyConstraintName: "sales_event_id_fkey"
    })
    event: Relation<Event>;
};