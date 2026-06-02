import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity({ 
    name: "traffic_analytics",
    comment: "A table to store information about a UTM source search param found in shop URL"
})
export default class TrafficAnalytics {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    landingPageUrl: string;

    @Column({ type: "varchar" })
    utmSource: string;

    @Column({ type: "varchar", nullable: true })
    utmMedium: string;

    @Column({ type: "varchar", nullable: true })
    utmCampaign: string;

    @Column({ type: "varchar", nullable: true })
    utmTerm: string;

    @Column({ type: "varchar", nullable: true })
    utmContent: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: string;
};