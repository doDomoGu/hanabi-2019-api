import express from 'express';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser'; // 解析,用req.body获取post参数
import routes from './config/routes';
import { errorHandler, notFoundHandler } from './config/handler';

createConnection().then((_) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));

  // 加载路由
  app.use('/', routes);

  // 错误处理
  app.use(errorHandler);

  // 404处理
  app.use(notFoundHandler);

  app.listen(3000, () => {
    console.log('Example app listening on port 3000');
  });
});
