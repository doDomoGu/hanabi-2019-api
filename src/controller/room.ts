import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../config/handler';

export default {
  list: async (req: Request, res: Response) => {
    successHandler(res, await getRepository(Room).find());
  },
};
