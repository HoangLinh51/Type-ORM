import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'category',
})
export class Category {
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
}
