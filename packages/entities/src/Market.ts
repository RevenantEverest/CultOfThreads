import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    type Relation
} from 'typeorm';
import MarketDetails from './MarketDetails';
import Event from './Event';

@Entity("markets")
export default class Market {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @OneToOne(() => MarketDetails)
    details: Relation<MarketDetails>;

    @OneToMany(() => Event, (event) => event.market)
    events: Relation<Event>;
};