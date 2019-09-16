import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/user';
import UserAuth from '../models/user_auth';
import { successHandler, errorHandler } from '../config/handler';


const router = express.Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('提交数据错误');
  }

  User.findOne<User>({ where: { username } }).then((user) => {
    if (user === null) {
      throw new Error('用户名错误');
    }

    if (user.get('password') !== crypto.createHash('md5').update(password).digest('hex')) {
      throw new Error('密码错误');
    }

    const userId = user.get('id');
    const jwtSecretKey = 'hanabi-api-dev';
    const token = jwt.sign({ userId }, jwtSecretKey, { expiresIn: 60 * 60 });

    UserAuth.create({
      userId,
      token,
      expiredTime: moment().add(1, 'day').format('YYYY-MM-D HH:mm:ss'),
    });

    successHandler(res, {
      token,
      userId,
      userInfo: user.toJSON(),
    });
  }).catch((err) => {
    errorHandler(err, req, res, next);
  });
});

router.get('/auth', (req, res) => {
  if (typeof req.query.accessToken === 'string' && req.query.accessToken !== '') {
    const { accessToken } = req.query;
    console.log(accessToken);

    User.findAll().then((users: Array<any>) => {
      console.log(typeof users);
      console.log('All users:', JSON.stringify(users, null, 4));
    });


    // db.query( 'SELECT * FROM User',(err, results , fields ) => {
    //     console.log(err)
    //     console.log(results)
    //     console.log(fields)

    // })
  }

  res.send('[GET] this is test');
});

router.post('/', (req, res) => {
  res.send('[POST] this is test');
});

export default router;
