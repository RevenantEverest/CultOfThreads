import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import Sale from './Sale';
import Market from './Market';

@Entity("events")
export default class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    address: string;

    @Column({ type: "varchar" })
    flyerUrl: string;

    @Column({ type: "timestamptz" })
    dateFrom: Date;

    @Column({ type: "timestamptz", nullable: true })
    dateTo: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    /* Relations */
    @OneToMany(() => Sale, (sale) => sale.event)
    sales: Sale[];

    @ManyToOne(() => Market, (market) => market.events, { nullable: false })
    @JoinColumn({
        foreignKeyConstraintName: "events_market_id_fkey"
    })
    market: Relation<Market>;
};