import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    Unique,
    type Relation
} from 'typeorm';
import Product from './Product';

@Entity("product_provider_details")
@Unique(["product"])
export default class ProductProviderDetails extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid", nullable: true })
    stripeProductId: string | null;

    @Column({ type: "varchar", nullable: true })
    stripePriceId: string | null;
    
    @Column({ type: "varchar", nullable: true })
    squareProductId: string | null;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @ManyToOne(() => Product, (product) => product.providerDetails, { onDelete: "CASCADE", nullable: false })
    @JoinColumn()
    product: Relation<Product>;
};