
import { Column, Entity,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn ,
   BaseEntity
  } from 'typeorm';



@Entity()
export class User extends BaseEntity  {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:50})
  nombre: string;

  @Column({length:50})
  apellido: string;

  @Column({length:250})
  email: string;

  @Column({length:300})
  cv_bucket_url: string;

  @Column({length:250})
  github_url: string;

  @Column({length:250})
  likedin_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
