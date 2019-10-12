export default class MyError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MyError.prototype);
  }

  errCode = 0;
}
