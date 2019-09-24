import express from 'express';

import user from '../controller/user';
import auth from '../controller/auth';
// import auth from '../routes/auth';
// import auth from '../routes/auth';

const router = express.Router();

router.post('/login', auth.login);
router.delete('/logout', auth.logout);

router.get('/user/list', user.list);
// router.post('/user/add', user.add);

export default router;

// export default [
//   router,
//   user,
//   auth,
// ];
