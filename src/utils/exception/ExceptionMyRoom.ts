import Exception from './Exception';

export default class ExceptionMyRoom extends Exception {
  exception = new Map(
    [
      [
        'in_too_many_rooms',
        {
          msg: '一个玩家在多个房间内',
          code: 20001,
        },
      ],
    ],
  )
}
