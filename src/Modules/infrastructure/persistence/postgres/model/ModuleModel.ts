import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Module extends BaseEntity {
  @PrimaryColumn({ length: 100 })
    id: string;

  @Column({ length: 50 })
    name: string;

  @Column({ length: 300 })
    description: string;

  @Column({ length: 300 })
    moduleStartDate: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}
