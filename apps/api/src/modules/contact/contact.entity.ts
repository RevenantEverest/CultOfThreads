import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne
} from 'typeorm';
import { Newsletter } from '~/modules/newsletter';

@Entity("contacts")
export default class Contact extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: true })
    firstName: string;

    @Column({ type: "varchar", nullable: true })
    lastName: string;

    @Column({ nullable: true, type: "varchar" })
    email: string;

    @Column({ nullable: true, type: "varchar" })
    phone: string;

    @Column({ nullable: true, type: "varchar" })
    address: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @OneToOne(() => Newsletter, (newsletter) => newsletter.contact, { nullable: true })
    newsletter: Newsletter;
};