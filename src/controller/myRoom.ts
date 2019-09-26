import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../config/handler';

export default {
  enter: async (req: Request, res: Response) => {
    //
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
