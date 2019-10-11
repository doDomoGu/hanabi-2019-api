import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Room from '../entity/Room';
import RoomPlayer from '../entity/RoomPlayer';
import { successHandler, errorHandler } from '../config/handler';
import Cache from '../utils/cache';
import State from '../config/state';

export default {
  list: async (req: Request, res: Response) => {
    // 参数 forceUpdate: 值为1时，需要强制获取数据
    const { force: forceUpdate } = req.query;

    // forceUpdate不为1时 不强制获取数据
    if (typeof forceUpdate === 'undefined' || forceUpdate !== '1') {
      // 缓存有效时 不强制获取数据
      if (Cache.roomList.isEnabled(State.userId)) {
        // 返回 noUpdate
        return successHandler(res, { noUpdate: true });
      }
    }

    // 获取房间列表数据
    const data = await getRepository(Room).find();

    // 单个列表项的类型定义
    type listItem = {
      id: number,
      title: string,
      isLocked: boolean,
      playerNum: number
    };

    // formatData：格式化数据到需要返回的列表数据
    const formatData = async (d: Room[]) => {
      const results: listItem[] = [];

      await Promise.all(d.map(async (r) => {
        const roomPlayerNum = await getRepository(RoomPlayer).count({ where: [{ roomId: r.id }] });
        results.push({
          id: r.id,
          title: r.title,
          isLocked: r.password !== '',
          playerNum: roomPlayerNum,
        });
      }));
      return results;
    };

    const list: listItem[] = await formatData(data);

    Cache.roomList.updateUserKey(State.userId);

    return successHandler(res, list);
  },
};
