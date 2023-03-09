import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

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

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
