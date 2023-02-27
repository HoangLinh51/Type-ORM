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
}
