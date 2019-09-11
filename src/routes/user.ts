import express from "express"
import User from "../models/user"
import { Op } from "sequelize"

const router = express.Router();

router.get('/user/list', (req, res) => {
  let params = {
    name: '',
    page: 1,
    pageSize: 20
  }

  params = Object.assign(params,req.query);

  const where = {
    username !: {}
  }
  
  if(params.name!=='') {
    where.username = {
      [Op.like]: '%'+params.name+'%'
    }
  }else{
    delete where.username
  }
  
  const offset = ( params.page - 1 ) * params.pageSize
  const limit = params.pageSize


  User.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);

    res.json(result);
  });
  
});

router.post('/', function(req, res) {
  res.send('[POST] this is test');
});

export default router;
