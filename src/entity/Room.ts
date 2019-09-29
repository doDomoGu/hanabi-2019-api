import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('room')
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

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date
}
