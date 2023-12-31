import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

@Entity("module")
export class Module extends BaseEntity {
  @PrimaryColumn({ length: 100 })
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  status: boolean;

  @Column({ length: 300 })
  description: string;

  @Column({ type: 'date' })
  moduleStartDate: Date;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;


  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;
}
