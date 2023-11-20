import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "roles" })
export class Roles {

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({ length: 25, nullable: false })
    name: string;

    @Column({ length: 25, nullable: false })
    description: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
