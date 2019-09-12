import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  console.log('login');
  console.log(username);
  console.log(password);
  // JSON.parse('{{'); // 抛出异常

  // res.json(11);
  if (typeof username === 'string') {
    res.json('ok');
  } else {
    next(new Error('BROKEN'));
  }
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
