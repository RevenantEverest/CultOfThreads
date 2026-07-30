import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany
} from 'typeorm';
import ProductDetails from './ProductDetails';
import ProductMedia from './ProductMedia';
import Sale from './Sale';
import ProductTag from './ProductTag';
import ProductCategory from './ProductCategory';

@Entity("products")
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", unique: true })
    name: string;

    @Column({ type: "jsonb", nullable: true })
    description: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @OneToOne(() => ProductDetails, (details) => details.product, { cascade: true })
    details: ProductDetails;

    @OneToMany(() => ProductMedia, (media) => media.product, { cascade: true })
    media: ProductMedia[];

    @OneToMany(() => Sale, (sales) => sales.product, { cascade: true })
    sales: Sale[];
    
    @OneToMany(() => ProductTag, (tags) => tags.product, { cascade: true })
    tags: ProductTag[];

    @OneToMany(() => ProductCategory, (categories) => categories.product, { cascade: true })
    categories: ProductCategory[];
};