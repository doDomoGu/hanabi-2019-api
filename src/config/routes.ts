import express from 'express';

// import user from '../controller/user';
import auth from '../controller/auth';
import room from '../controller/room';
import myRoom from '../controller/myRoom';

const router = express.Router();

/* ----------------- 鉴权 ---------------- */
// 玩家登录
router.post('/login', auth.login);

// 玩家登出
router.delete('/logout', auth.logout);

// 检查token, 获取玩家信息 （用于使用前端储存的token,实现自动登录,)
router.get('/auth', auth.checkToken);

/* ----------------- 房间 ---------------- */
// 获取列表
router.get('/room/list', room.list);

/* --------------- 我的房间 ---------------- */
// 进入
router.post('/my-room/enter', myRoom.enter);

// 退出
router.post('/my-room/exit', myRoom.enter);

// 获取所在房间信息
router.get('/my-room/info', myRoom.info);

// 客机玩家准备操作
router.post('/my-room/do-ready', myRoom.doReady);


/* --------------- 我的游戏 ---------------- */

// router.get('/user/list', user.list);
// router.post('/user/add', user.add);

export default router;
