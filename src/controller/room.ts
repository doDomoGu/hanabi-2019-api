import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../config/handler';
import Cache from '../utils/cache';

export default {
  list: async (req: Request, res: Response) => {
    const { force: forceUpdate } = req.query;
    if (typeof forceUpdate === 'undefined' || forceUpdate !== '1') {
      if (Cache.roomList.isNoUpdate()) {
        return successHandler(res, { noUpdate: true });
      }
    }

    const data = await getRepository(Room).find();

    Cache.roomList.updateUserKey();
    return successHandler(res, data);
  },
};
