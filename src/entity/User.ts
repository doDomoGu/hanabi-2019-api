import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  username!: string;

  @Column({
    length: 100,
  })
  password!: string;

  @Column({
    length: 100,
  })
  test!: string;
}
