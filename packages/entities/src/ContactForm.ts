import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity("contact_form")
export default class ContactForm extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    firstName: string;

    @Column({ type: "varchar" })
    lastName: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "text" })
    message: string;

    @Column({ type: "varchar" })
    status: "PENDING" | "RESOLVED";

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
};