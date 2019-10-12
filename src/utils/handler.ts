import { Request, Response, NextFunction } from 'express';
import MyError from './exception/MyError';

export const successHandler = (
  res: Response,
  data?: {} | null,
  msg?: string | null,
) => {
  res.status(200).json({
    code: 0,
    data,
    msg,
  });
};

export const errorHandler = (
  err: Error | MyError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof MyError) {
    console.log('exception handler');
    // console.log(err);
    res.status(200).json({
      code: err.errCode, // todo errcode
      data: null,
      msg: err.message,
    });
  } else {
    console.log('error handler');
    // #TODO 记录错误日志
    // console.log(err);
    res.status(500).json({
      code: 1000, // todo errcode
      data: null,
      msg: err.message,
    });
  }
};

// export const exceptionHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log('exception handler');
//   console.log(err);
//   res.status(200).json({
//     code: 1001,
//     data: null,
//     msg: 'exception',
//   });
// };

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('404 not found handler');
  res.status(404).json({
    code: 1001,
    data: null,
    msg: '404 NOT FOUND',
  });
};
