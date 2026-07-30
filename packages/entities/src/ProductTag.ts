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
import Tag from './Tag';

/* Custom Many-to-Many Join Table */
@Entity("product_tags")
@Unique("product_tags_tag_id_product_id_key", ["product", "tag"])
export default class ProductTag extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @ManyToOne(() => Product, (product) => product.tags, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        foreignKeyConstraintName: "product_tags_product_id_fkey"
    })
    product: Relation<Product>;

    @ManyToOne(() => Tag, (tag) => tag.productTags, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        foreignKeyConstraintName: "product_tags_tag_id_fkey"
    })
    tag: Relation<Tag>;
};