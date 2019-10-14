import { Request, Response, NextFunction } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../utils/handler';
import RoomRepository from '../repository/RoomRepository';
import State from '../config/state';
import ExceptionMyRoom from '../utils/exception/ExceptionMyRoom';
import RoomPlayer from '../entity/RoomPlayer';
import Cache from '../utils/cache';

export default {
  enter: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = State;
      const roomRepository = getCustomRepository(RoomRepository);
      const { isInRoom } = await roomRepository.isIn(userId);

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
        Cache.myRoom.clear(hostPlayer.userId);
      }

      Cache.roomList.updateUserKey(State.userId);

      successHandler(res);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  exit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = State;
      const roomRepository = getCustomRepository(RoomRepository);
      const { isInRoom, roomId } = await roomRepository.isIn(userId);

      // 检查是否在房间内
      if (!isInRoom) {
        ExceptionMyRoom.t('do_exit_but_not_in_room');
      }

      const room = <Room> await getRepository(Room).findOne(roomId);

      // 删除房内玩家记录
      const deleteResult = await getRepository(RoomPlayer).delete({ userId, roomId });

      // 删除数不等于1 ， 删除失败
      if (deleteResult.affected !== 1) {
        ExceptionMyRoom.t('do_exit_failure');
      }

      // 清空当前玩家的房间信息缓存
      Cache.myRoom.clear(userId);

      const hostPlayer = await room.getHostPlayer();
      const guestPlayer = await room.getGuestPlayer();

      /* 原本是主机玩家  要对应改变客机玩家的状态 （原本的客机玩家变成这个房间的主机玩家，准备状态清空） */

      // 存在主机玩家
      if (typeof hostPlayer !== 'undefined') {
        // 清空房主的房间信息缓存
        Cache.myRoom.clear(hostPlayer.userId);
      }

      // 存在客机玩家
      if (typeof guestPlayer !== 'undefined') {
        guestPlayer.isHost = 1;
        guestPlayer.isReady = 0;
        await getRepository(RoomPlayer).save(guestPlayer);

        // 清空房主(此时的房主是原先的访客)的房间信息缓存
        Cache.myRoom.clear(guestPlayer.userId);
      }

      // 更新房间列表 系统时间
      Cache.roomList.updateSysKey();

      successHandler(res);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  info: async (req: Request, res: Response) => {
    //
  },

  doReady: async (req: Request, res: Response) => {
    //
  },
};
