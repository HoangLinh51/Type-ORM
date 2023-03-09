import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './products';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  categoryName: string;

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

  @OneToMany(() => Product, product => product.categories)
  products: Product[];

  productcategories: any;
}
