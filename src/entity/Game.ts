import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Game {
  @PrimaryColumn({
    name: 'room_id',
    unsigned: true,
  })
  roomId!: number

  @Column({
    name: 'round_num',
    unsigned: true,
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  roundNum?: number

  @Column({
    name: 'round_player_is_host',
    unsigned: true,
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  roundPlayerIsHost?: number

  @Column({
    name: 'cue_num',
    unsigned: true,
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  cueNum?: number

  @Column({
    name: 'chance_num',
    unsigned: true,
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  chanceNum?: number

  @Column({
    unsigned: true,
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  status?: number

  @Column({
    type: 'varchar',
    length: 5,
    default: '0',
  })
  score?: string

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date
}
