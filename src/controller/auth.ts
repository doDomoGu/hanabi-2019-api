import { Request, Response, NextFunction } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import User from '../entity/User';
import UserAuth from '../entity/UserAuth';
import { successHandler, errorHandler } from '../utils/handler';
import State from '../config/state';

export default {
  // 处理请求 验证token, 并设置State.userId
  tokenHandler: async (req: Request, res: Response, next: NextFunction) => {
    // TODO req.path 不用token的地址
    if (['/login', '/auth'].indexOf(req.path) > -1) {
      next();
    } else {
      try {
        const { 'x-token': token } = req.headers;
        if (typeof token !== 'string') {
          throw new Error('提交秘钥错误');
        }

        const userAuth = await getRepository(UserAuth).findOne({ where: { token } });

        if (typeof userAuth === 'undefined') {
          throw new Error('秘钥不存在');
        }

        if (!moment().isBefore(userAuth.expiredTime)) {
          throw new Error('秘钥已过期');
        }

        State.userId = userAuth.userId;
        next();
      } catch (err) {
        console.log('token auth wrong');
        errorHandler(err, req, res, next);
      }
    }
  },
  //  (无需验证header.x-token) 登录操作
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('提交数据错误');
      }

      const user = await getRepository(User).findOne({ where: { username } });

      if (typeof user === 'undefined') {
        throw new Error('找不到用户');
      }

      if (user.password !== crypto.createHash('md5').update(password).digest('hex')) {
        throw new Error('密码错误');
      }

      const userId = user.id;
      // TODO jwtSecretKey作为可配置项
      const jwtSecretKey = 'hanabi-api-dev';
      // 根据 userId 和 key 生成秘钥token
      const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1 day' });

      // 新建userAuth记录
      const userAuth = new UserAuth();
      userAuth.userId = userId;
      userAuth.token = token;
      userAuth.expiredTime = moment().add(1, 'day').toDate(); // .format('YYYY-MM-DD HH:mm:ss');
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

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sync_exit: syncExit } = req.query;

      // 生成一个过期时间，比当前时间小一秒
      const expiredTime = moment().subtract(1, 'second').toDate();
      if (typeof syncExit === 'string' && syncExit === '1') {
        // 同步退出 user_auth表里所有user_id=当前登录用户的Token都置为过期
        await createQueryBuilder()
          .update(UserAuth)
          .set({ expiredTime })
          .where('user_id = :user_id', { user_id: State.userId })
          .andWhere('expired_time > :now', { now: moment().format('YYYY-MM-DD HH:mm:ss') })
          .execute();
      } else {
        // 非同步退出 只删除使用的Token
        const { 'x-token': token } = req.headers;

        await createQueryBuilder()
          .update(UserAuth)
          .set({ expiredTime })
          .where('token = :token', { token })
          .execute();
      }

      successHandler(res);
    } catch (err) {
      console.log(err);
      errorHandler(err, req, res, next);
    }
  },
  // (无需验证header.x-token) 通过token获取用户信息 （用于刷新页面自动登录）
  checkToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken: token } = req.query;
      if (typeof token !== 'string') {
        throw new Error('提交秘钥错误001');
      }

      const userAuth = await getRepository(UserAuth).findOne({ where: { token } });

      if (typeof userAuth === 'undefined') {
        throw new Error('秘钥不存在');
      }

      if (!moment().isBefore(userAuth.expiredTime)) {
        throw new Error('秘钥已过期');
      }

      const user = await getRepository(User).findOne({ where: { userId: userAuth.userId } });

      if (typeof user === 'undefined') {
        throw new Error('找不到用户');
      }

      successHandler(res, {
        token,
        tokenForceUpdate: true,
        userId: user.id,
        userInfo: user,
      });
    } catch (err) {
      // console.log('token auth wrong');
      errorHandler(err, req, res, next);
    }
  },
};
