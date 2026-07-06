import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    type Relation
} from 'typeorm';
import Product from './Product';
import Category from './Category';

/* Custom Many-to-Many Join Table */
@Entity("product_categories")
@Unique("product_categories_category_id_product_id_key", ["product", "category"])
export default class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @ManyToOne(() => Product, (product) => product.categories, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        foreignKeyConstraintName: "product_categories_product_id_fkey"
    })
    product: Relation<Product>;

    @ManyToOne(() => Category, (category) => category.productCategories, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        foreignKeyConstraintName: "product_categories_category_id_fkey"
    })
    category: Relation<Category>;
};
