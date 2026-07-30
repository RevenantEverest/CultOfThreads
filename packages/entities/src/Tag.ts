import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
} from 'typeorm';
import ProductTag from './ProductTag';

@Entity("tags")
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relation */
    @OneToMany(() => ProductTag, (productTags) => productTags.tag)
    productTags: ProductTag[];
};