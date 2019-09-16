import express from 'express';

export const successHandler = (res: express.Response, data: {}) => {
  res.status(200).json({
    code: 0,
    data,
    msg: null,
  });
};

export const errorHandler = (
  err: Error,
  req:express.Request,
  res:express.Response,
  next:express.NextFunction,
) => {
  console.log('error handler');
  // #TODO 记录错误日志
  // console.log(err);
  res.status(500).json({
    code: 1000,
    data: null,
    msg: err.message,
  });
};

export const notFoundHandler = (
  req:express.Request,
  res:express.Response,
  next:express.NextFunction,
) => {
  console.log('404 not found handler');
  res.status(404).json({
    code: 1001,
    data: null,
    msg: '404 NOT FOUND',
  });
};
