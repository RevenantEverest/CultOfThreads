import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm';
import ProductDetails from './ProductDetails';
import ProductMedia from './ProductMedia';
import Sale from './Sale';
import Tag from './Tag';
import Category from './Category';
import ProductTag from './ProductTag';
import ProductCategory from './ProductCategory';

@Entity("products")
export default class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", unique: true })
    name: string;

    @Column({ type: "jsonb", nullable: true })
    description: JSON;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @OneToOne(() => ProductDetails)
    details: ProductDetails;

    @OneToMany(() => ProductMedia, (media) => media.product)
    media: ProductMedia[];

    @OneToMany(() => Sale, (sales) => sales.product)
    sales: Sale[];
    
    @OneToMany(() => ProductTag, (tags) => tags.product)
    tags: ProductTag[];

    @OneToMany(() => ProductCategory, (categories) => categories.product)
    categories: Category[];
};