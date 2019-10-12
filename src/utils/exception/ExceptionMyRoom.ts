import Exception from './Exception';

class ExceptionMyRoom extends Exception {
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

export default new ExceptionMyRoom();
