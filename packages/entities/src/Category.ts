import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import ProductCategory from './ProductCategory';

@Entity("categories")
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", unique: true })
    name: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @OneToMany(() => ProductCategory, (productCategories) => productCategories.category)
    productCategories: ProductCategory[];
};