import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    type Relation
} from 'typeorm';
import Product from './Product';

@Entity("product_details")
@Unique(["product"])
export default class ProductDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "float4", default: 0, nullable: true })
    marketPrice: number;

    @Column({ type: "float4", default: 0, nullable: true })
    onlinePrice: number;

    @Column({ type: "float4", default: 0, nullable: true })
    weightGrams: number;

    @Column({ type: "varchar", })
    status: "ACTIVE" | "DRAFT";

    @Column({ type: "varchar", nullable: true })
    etsyListing: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @ManyToOne(() => Product, (product) => product.details, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({
        foreignKeyConstraintName: "product_details_product_id_fkey"
    })
    product: Relation<Product>;
};