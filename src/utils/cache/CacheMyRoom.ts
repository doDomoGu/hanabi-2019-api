import flatCache from 'flat-cache';

const cacheId = 'cacheId';
const userRoomInfoNoUpdateKeyPrefix = 'room_info_no_update_';

const cache = flatCache.load(cacheId);

/* 检查是否有更新 */
export const isNoUpdate = (userId: string) => cache
  .getKey(userRoomInfoNoUpdateKeyPrefix + userId) === true;

/* 设置为true */
export const set = (userId: string) => {
  cache.setKey(userRoomInfoNoUpdateKeyPrefix + userId, true);
  cache.save(true);
};

/* 清空 */
export const clear = (userId: string) => {
  cache.removeKey(userRoomInfoNoUpdateKeyPrefix + userId);
  cache.save(true);
};
