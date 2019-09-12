import express from 'express';
import { Op } from 'sequelize';
import User from '../models/user';

const router = express.Router();

router.get('/user/list', (req, res) => {
  let params = {
    name: '',
    page: 1,
    pageSize: 20,
  };

  params = Object.assign(params, req.query);

  const where = {
    username !: {},
  };

  if (params.name !== '') {
    where.username = {
      [Op.like]: `%${params.name}%`,
    };
  } else {
    delete where.username;
  }

  const offset = (params.page - 1) * params.pageSize;
  const limit = params.pageSize;


  User.findAndCountAll({
    where,
    offset,
    limit,
  })
    .then((result) => {
      console.log(result.count);
      console.log(result.rows);

      res.json(result);
    });
});

router.post('/', (req, res) => {
  res.send('[POST] this is test');
});

export default router;
