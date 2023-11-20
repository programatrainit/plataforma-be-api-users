import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, nullable: false })
    username: string;

    @Column({ length: 25, nullable: false })
    password: string;

    @Column({ length: 25, nullable: false, unique: true })
    email: string;

    @Column({ length: 25, nullable: true })
    cv_bucket_url: string;

    @Column({ length: 25, nullable: true })
    github_url: string;

    @Column({ length: 25, nullable: true })
    linkedin_url: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
