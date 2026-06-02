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

@Entity("product_media")
export default class ProductMedia {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    type: string;

    @Column({ type: "varchar" })
    mediaUrl: string;

    @Column({ type: "boolean", nullable: true })
    featured: boolean;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @ManyToOne(() => Product, (product) => product.media, { nullable: false })
    @JoinColumn({
        foreignKeyConstraintName: "product_media_product_id_fkey"
    })
    product: Relation<Product>;
};