import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Rol extends BaseEntity {
  @PrimaryColumn({ length: 100 })
    id: string;

  @Column({ length: 50 })
    nombre: string;

  @Column({ length: 255 })
    description: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}
