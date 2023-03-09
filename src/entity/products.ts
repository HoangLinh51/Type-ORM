import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Categories } from './categories';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  productPrice: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  createdBy: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  updatedBy: number;

  @Column({
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @Column({
    name: 'category_id',
    nullable: true,
  })
  categoryId: number;

  @ManyToOne(type => Categories)
  @JoinColumn({ name: 'category_id' })
  categories: Categories;

  productcategories: any;
}
