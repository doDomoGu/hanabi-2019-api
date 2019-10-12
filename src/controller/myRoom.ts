import { Request, Response, NextFunction } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../utils/handler';
import RoomRepository from '../repository/RoomRepository';
import State from '../config/state';
import MyError from '../utils/exception/MyError';


export default {
  enter: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomRepository = getCustomRepository(RoomRepository);
      const { isInRoom } = await roomRepository.isIn(State.userId);

      console.log(isInRoom);
      // 检查是否不在房间内
      // list($isInRoom) = MyRoom::isIn();
      // if($isInRoom){
      //     MyRoomException::t('do_enter_already_in_room');
      // }

      // $roomId = (int) Yii::$app->request->post('roomId');

      // $room = Room::getOne($roomId);

      // if ($room->password != '') {
      //     //TODO 房间密码处理
      //     MyRoomException::t('do_enter_locked_room_by_wrong_password');
      // }

      // $hostPlayer = $room->hostPlayer;
      // $guestPlayer = $room->guestPlayer;

      // # 房间已满
      // if($hostPlayer && $guestPlayer) {
      //     MyRoomException::t('do_enter_full_room');
      // }

      // if (!$hostPlayer) {
      //     # 成为主机玩家
      //     $newRoomPlayer = new RoomPlayer();
      //     $newRoomPlayer->room_id = $roomId;
      //     $newRoomPlayer->user_id = Yii::$app->user->id;
      //     $newRoomPlayer->is_host = 1;
      //     $newRoomPlayer->is_ready = 0;
      //     $newRoomPlayer->save();
      // }else {
      //     # 成为客机玩家
      //     $newRoomPlayer = new RoomPlayer();
      //     $newRoomPlayer->room_id = $roomId;
      //     $newRoomPlayer->user_id = Yii::$app->user->id;
      //     $newRoomPlayer->is_host = 0;
      //     $newRoomPlayer->is_ready = 0;
      //     $newRoomPlayer->save();

      //     # 清空房主的房间信息缓存
      //     MyRoomCache::clear($hostPlayer->user_id);
      // }

      // RoomListCache::updateSysKey();
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
