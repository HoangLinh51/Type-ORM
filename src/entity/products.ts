import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Categories } from './categories';
import { Brands } from './brands';
import { Orderline } from './order_line';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    name: 'brand_id',
    nullable: true,
  })
  brandId: number;

  @ManyToOne(type => Categories)
  @JoinColumn({ name: 'category_id' })
  categories: Categories;

  @ManyToOne(type => Brands)
  @JoinColumn({ name: 'brand_id' })
  brands: Brands;

  @ManyToOne(type => Orderline)
  @JoinColumn({ name: 'orderline_id' })
  orderline: Orderline;

  productcategories: any;
}
