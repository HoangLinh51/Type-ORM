import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  date: string;
}
