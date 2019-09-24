import { Request, Response, NextFunction } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';

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
      // TODO jwtSecretKey作为可配置项
      const jwtSecretKey = 'hanabi-api-dev';
      // 根据 userId 和 key 生成秘钥token
      const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1 day' });

      // 新建userAuth记录
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
          .where('user_id = :user_id', { user_id: 1 })
          .andWhere('expired_time > :now', { now: moment().format('YYYY-MM-D HH:mm:ss') })
          .execute();
      } else {
        // 非同步退出 只删除使用的Token
      }


      // $isSync = (int) Yii::$app->request->get('sync_exit') > 0;

      //   $expired = date('Y-m-d H:i:s',strtotime('-1 second')); //生成一个过期时间，比当前时间小

      //   if($isSync) {
      //       #同步退出 user_auth表里所有user_id=当前登录用户的Token都置为过期
      //       UserAuth::updateAll(
      //           ['expired_time'=>$expired],
      //           [
      //               'and',
      //               ['user_id'=>Yii::$app->user->id],
      //               ['>','expired_time',date('Y-m-d H:i:s')]
      //           ]
      //       );

      //   } else {
      //       #非同步退出 只删除使用的Token
      //       $token = Yii::$app->request->headers->get('X-Token');

      //       $auth = UserAuth::find()->where(['token'=>$token])->one();

      //       if(!$auth){

      //           throw new \Exception('Token数据错误(退出登录时)',1000);

      //       }

      //       $auth->expired_time = $expired;

      //       $auth->save();

      //   }

      successHandler(res);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};
