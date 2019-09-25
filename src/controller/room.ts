import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Room from '../entity/Room';
import { successHandler, errorHandler } from '../config/handler';

export default {
  list: async (req: Request, res: Response) => {
    successHandler(res, await getRepository(Room).find());
    // res.send(await getRepository(Room).find());
  },

  // add: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const user = new User();
  //     if (typeof req.body.username !== 'string') {
  //       throw new Error('username 数据错误');
  //     }

  //     if (typeof req.body.password !== 'string') {
  //       throw new Error('password 数据错误');
  //     }

  //     if (typeof req.body.nickname !== 'string') {
  //       throw new Error('nickname 数据错误');
  //     }

  //     user.username = req.body.username;
  //     user.password = crypto.createHash('md5').update(req.body.password).digest('hex');
  //     user.nickname = req.body.nickname;

  //     getRepository(User).save(user).then((u) => {
  //       successHandler(res, null, '#23333 User has been saved. User id is ' + u.id);

  //       // res.send('ok');
  //     }).catch((err) => {
  //       // console.log(e);
  //       // res.send(e);
  //       errorHandler(err, req, res, next);
  //     });
  //   } catch (err) {
  //     errorHandler(err, req, res, next);
  //   }
  // },
};
