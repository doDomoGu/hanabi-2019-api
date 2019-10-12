import { EntityRepository, Repository, getRepository } from 'typeorm';
import Room from '../entity/Room';
import RoomPlayer from '../entity/RoomPlayer';
import ExceptionMyRoom from '../utils/exception/ExceptionMyRoom';

@EntityRepository(Room)
export default class RoomRepository extends Repository<Room> {
  isIn = async (userId: string) => {
    let isInRoom = false;
    let roomId = -1;
    // inRoomCount: 所在房间数量
    const inRoomCount = await getRepository(RoomPlayer).count({ where: [{ userId }] });

    // 抛出异常：一个玩家不应该在多个房间
    if (inRoomCount !== 0 && inRoomCount !== 1) {
      ExceptionMyRoom.t('in_too_many_rooms');
    }
    // 不在房间内，返回[false, -1]
    if (inRoomCount === 0) {
      return {
        isInRoom,
        roomId,
      };
    }

    isInRoom = true;

    // 获得所在房间ID
    roomId = (<RoomPlayer>
      await getRepository(RoomPlayer).findOne({ where: [{ userId }] })).roomId; // 房间ID

    // 检查房间数据
    // Room::check($roomId);

    return {
      isInRoom,
      roomId,
    };
  }
  // create2( userId : number, token: string, expiredTime: Date) {
  // async create2() {
  //   const userAuth = new UserAuth();
  //   userAuth.userId = 10002;
  //   userAuth.token = '123ssss21313';
  //   userAuth.expiredTime = new Date('2019-01-01 08:00:00');
  //   userAuth.createdAt = new Date('2019-01-01 09:00:00');
  //   return this.save(userAuth);
  // }


  // username2:string =  this.get('username')  + 1;

  // findByName(firstName: string, lastName: string) {
  //   return this.createQueryBuilder("user")
  //     .where("user.firstName = :firstName", { firstName })
  //     .andWhere("user.lastName = :lastName", { lastName })
  //     .getMany();
  // }
}
