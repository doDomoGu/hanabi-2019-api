import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('room_player')
@Index('user_room', ['userId', 'roomId'], { unique: true })
export default class RoomPlayer {
  @PrimaryColumn({
    name: 'user_id',
    unsigned: true,
  })
  userId!: number

  @Column({
    name: 'room_id',
    unsigned: true,
  })
  roomId!: number

  @Column({
    name: 'is_host',
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: 0,
  })
  isHost?: number

  @Column({
    name: 'is_ready',
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: 0,
  })
  isReady?: number

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date
}
