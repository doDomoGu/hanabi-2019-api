import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id!: number

  @Column({
    length: 100,
    comment: '账号',
  })
  username!: string

  @Column({
    length: 100,
    comment: '密码',
  })
  password!: string

  @Column({
    length: 100,
    comment: '显示用昵称',
  })
  nickname!: string

  @Column({
    length: 20,
  })
  mobile?: string

  @Column({
    length: 100,
    nullable: true,
  })
  email?: string

  @Column({
    length: 200,
    nullable: true,
  })
  avatar?: string

  @Column({
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: 0,
    comment: '性别，0:无;1:男,2:女',
  })
  gender?: number

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday?: Date

  @Column({
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: 1,
  })
  status?: string

  @Column({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt?: Date

  @Column({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt?: Date
}
