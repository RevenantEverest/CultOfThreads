import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import Product from './Product';

@Entity("product_media")
export default class ProductMedia extends BaseEntity {
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
    @ManyToOne(() => Product, (product) => product.media, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({
        foreignKeyConstraintName: "product_media_product_id_fkey"
    })
    product: Relation<Product>;
};