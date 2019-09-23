import express from 'express';
import { getConnection, getRepository, getCustomRepository } from 'typeorm';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../entity/User';
import UserAuth from '../entity/UserAuth';
// import UserAuthRepository from '../repository/UserAuthRepository';
import { successHandler, errorHandler } from '../config/handler';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
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
});

// router.get('/auth', (req, res) => {
//   if (typeof req.query.accessToken === 'string' && req.query.accessToken !== '') {
//     const { accessToken } = req.query;
//     console.log(accessToken);

//     User.findAll().then((users: Array<any>) => {
//       console.log(typeof users);
//       console.log('All users:', JSON.stringify(users, null, 4));
//     });


//     // db.query( 'SELECT * FROM User',(err, results , fields ) => {
//     //     console.log(err)
//     //     console.log(results)
//     //     console.log(fields)

//     // })
//   }

//   res.send('[GET] this is test');
// });

// router.post('/', (req, res) => {
//   res.send('[POST] this is test');
// });

export default router;
