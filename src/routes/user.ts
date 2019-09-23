import express from 'express';
import { getRepository } from 'typeorm';

import crypto from 'crypto';
import User from '../entity/User';

const router = express.Router();

router.get('/user/list', async (req, res) => {
  res.send(await getRepository(User).find());
});

router.post('/user', (req, res) => {
  const user = new User();
  user.username = 'player1';
  user.password = crypto.createHash('md5').update('1231223').digest('hex');
  // user.test = '222';

  getRepository(User).save(user).then((u) => {
    console.log('#23333 User has been saved. User id is', u.id);

    res.send('ok');
  }).catch((e) => {
    res.send('error');
  });
});


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

export default router;
