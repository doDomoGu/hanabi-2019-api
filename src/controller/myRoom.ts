import { Request, Response, NextFunction } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../utils/handler';
import RoomRepository from '../repository/RoomRepository';
import State from '../config/state';
import ExceptionMyRoom from '../utils/exception/ExceptionMyRoom';
import RoomPlayer from '../entity/RoomPlayer';
import Cache from '../utils/cache'

export default {
  enter: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomRepository = getCustomRepository(RoomRepository);
      const { isInRoom } = await roomRepository.isIn(State.userId);

      // 检查是否在房间内
      if (isInRoom) {
        ExceptionMyRoom.t('do_enter_already_in_room');
      }

      // 获取请求参数 roomId
      const { roomId } = req.body;

      const room = <Room> await getRepository(Room).findOne(roomId);

      if (room.password !== '') {
        // TODO 房间密码处理
        ExceptionMyRoom.t('do_enter_locked_room_by_wrong_password');
      }

      const hostPlayer = await room.getHostPlayer();
      const guestPlayer = await room.getGuestPlayer();

      // 房间已满
      if (typeof hostPlayer !== 'undefined' && typeof guestPlayer !== 'undefined') {
        ExceptionMyRoom.t('do_enter_full_room');
      }

      if (typeof hostPlayer === 'undefined') {
        // 成为主机玩家
        const newRoomPlayer = new RoomPlayer();
        newRoomPlayer.roomId = roomId;
        newRoomPlayer.userId = Number(State.userId);
        newRoomPlayer.isHost = 1;
        newRoomPlayer.isReady = 0;
        await getRepository(RoomPlayer).save(newRoomPlayer);
      } else {
        // 成为客机玩家
        const newRoomPlayer = new RoomPlayer();
        newRoomPlayer.roomId = roomId;
        newRoomPlayer.userId = Number(State.userId);
        newRoomPlayer.isHost = 0;
        newRoomPlayer.isReady = 0;
        await getRepository(RoomPlayer).save(newRoomPlayer);

        // 清空房主的房间信息缓存
        Cache.myRoom.clear(hostPlayer.userId.toString());
      }

      Cache.roomList.updateUserKey(State.userId);

      successHandler(res);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  exit: async (req: Request, res: Response) => {
    //
  },

  info: async (req: Request, res: Response) => {
    //
  },

  doReady: async (req: Request, res: Response) => {
    //
  },
};
