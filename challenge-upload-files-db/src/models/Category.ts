import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn({
    select: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    select: false,
  })
  updated_at: Date;
}

export default Category;
