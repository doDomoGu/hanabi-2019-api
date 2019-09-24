import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import User from '../entity/User';
import UserAuth from '../entity/UserAuth';
import { successHandler, errorHandler } from '../config/handler';


export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('提交数据错误');
      }

      const user = await getRepository(User).findOne({ where: { username } });

      if (typeof user === 'undefined') {
        throw new Error('用户名错误');
      }

      if (user.password !== crypto.createHash('md5').update(password).digest('hex')) {
        throw new Error('密码错误');
      }

      const userId = user.id;
      const jwtSecretKey = 'hanabi-api-dev';
      const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: 60 * 60 });

      const userAuth = new UserAuth();
      userAuth.userId = userId;
      userAuth.token = token;
      userAuth.expiredTime = moment().add(1, 'day').toDate(); // .format('YYYY-MM-D HH:mm:ss');
      userAuth.createdAt = moment().toDate();

      if (await getRepository(UserAuth).save(userAuth)) {
        successHandler(res, {
          token,
          userId,
          userInfo: user,
        });
      } else {
        throw new Error('user auth 创建失败');
      }
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};
