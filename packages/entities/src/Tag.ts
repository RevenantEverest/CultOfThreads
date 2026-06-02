import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity("tags")
export default class Tag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
};