import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import Market from './Market';

@Entity("market_details")
export default class MarketDetails extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    state: string;

    @Column({ type: "varchar", nullable: true })
    logoUrl: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @OneToOne(
        () => Market, 
        (market) => market.details, 
        { 
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            nullable: false
        }
    )
    @JoinColumn({
        foreignKeyConstraintName: "market_details_market_id_fkey"
    })
    market: Relation<Market>;
};