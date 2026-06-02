import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import Contact from './Contact';

@Entity("newsletter")
export default class Newsletter extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @OneToOne(() => Contact, (contact) => contact.newsletter, { nullable: false, onDelete: "SET NULL" })
    @JoinColumn({ 
        foreignKeyConstraintName: "newsletter_contact_id_fkey"
    })
    contact: Relation<Contact>;
};