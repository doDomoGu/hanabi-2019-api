import express from 'express';
import bodyParser from 'body-parser'; // 解析,用req.body获取post参数
import routes from './config/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// 加载路由
app.use('/', routes);

const errorHandler = (
  err: Error,
  req:express.Request,
  res:express.Response,
  next:express.NextFunction,
) => {
  console.log('error handler');
  // #TODO 记录错误日志
  console.log(err);
  res.status(500).send('error');
};

const notFoundHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  console.log('404 not found handler');
  res.status(404).send('404 Not Found');
};

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});
