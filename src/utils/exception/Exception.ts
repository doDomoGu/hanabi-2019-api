import MyError from './MyError';

export default class Exception {
  exception = new Map()

  t = (item: string) => {
    let errContent;
    let errCode;
    if (this.exception.has(item) !== undefined) {
      errContent = this.exception.get(item).msg;
      errCode = this.exception.get(item).code;
    } else {
      errContent = item;
      errCode = 10000;
    }
    const err = new MyError(errContent);
    err.name = 'exception';
    err.errCode = errCode;
    throw err;
  }
}
