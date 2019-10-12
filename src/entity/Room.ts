import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  getRepository,
} from 'typeorm';
import RoomPlayer from './RoomPlayer';

@Entity('room')
export default class Room extends BaseEntity  {
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

  getHostPlayer = async () => getRepository(RoomPlayer).findOne({
    where: [{ roomId: this.id, isHost: 1 }],
  });

  getGuestPlayer = async () => getRepository(RoomPlayer).findOne({
    where: [{ roomId: this.id, isHost: 0 }],
  });
}
