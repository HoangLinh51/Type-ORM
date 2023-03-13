import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products';

@Entity({
  name: 'brands',
})
export class Brands {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  brandName: string;

  @Column()
  description: string;

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

  @OneToMany(() => Product, product => product.brands)
  products: Product[];
}
