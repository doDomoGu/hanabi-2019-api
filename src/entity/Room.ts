import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Room {
  @PrimaryColumn({
    unsigned: true,
  })
  id!: number

  @Column({
    length: 100,
  })
  title!: string

  @Column({
    length: 100,
    nullable: true,
  })
  password!: string

  @Column({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt?: Date
}
