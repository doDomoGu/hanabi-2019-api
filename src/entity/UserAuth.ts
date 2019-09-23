import {
  Entity, Column, PrimaryColumn,
} from 'typeorm';

@Entity()
export default class UserAuth {
  @Column({
    name: 'user_id',
  })
  userId!: number;

  @PrimaryColumn({
    length: 200,
  })
  token!: string;

  @Column({
    name: 'expired_time',
    type: 'datetime',
    width: 0,
  })
  expiredTime!: Date;

  @Column({
    name: 'created_at',
    type: 'datetime',
    width: 0,
  })
  createdAt!: Date;
}
