import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import crypto from 'crypto';

import User from '../entity/User';
import { successHandler, errorHandler } from '../config/handler';


export default {
  list: async (req: Request, res: Response) => {
    res.send(await getRepository(User).find());
  },

  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = new User();
      if (typeof req.body.username !== 'string') {
        throw new Error('username 数据错误');
      }

      if (typeof req.body.password !== 'string') {
        throw new Error('password 数据错误');
      }

      if (typeof req.body.nickname !== 'string') {
        throw new Error('nickname 数据错误');
      }

      user.username = req.body.username;
      user.password = crypto.createHash('md5').update(req.body.password).digest('hex');
      user.nickname = req.body.nickname;

      getRepository(User).save(user).then((u) => {
        successHandler(res, null, '#23333 User has been saved. User id is ' + u.id);

        // res.send('ok');
      }).catch((err) => {
        // console.log(e);
        // res.send(e);
        errorHandler(err, req, res, next);
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};


// router.get('/user/list', (req, res) => {
//   let params = {
//     name: '',
//     page: 1,
//     pageSize: 20,
//   };

//   params = Object.assign(params, req.query);

//   const where = {
//     username !: {},
//   };

//   if (params.name !== '') {
//     where.username = {
//       [Op.like]: `%${params.name}%`,
//     };
//   } else {
//     delete where.username;
//   }

//   const offset = (params.page - 1) * params.pageSize;
//   const limit = params.pageSize;


//   User.findAndCountAll({
//     where,
//     offset,
//     limit,
//   })
//     .then((result) => {
//       console.log(result.count);
//       console.log(result.rows);

//       res.json(result);
//     });
// });

// router.post('/', (req, res) => {
//   res.send('[POST] this is test');
// });

// export default router;
