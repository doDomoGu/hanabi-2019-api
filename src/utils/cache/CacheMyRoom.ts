import flatCache from 'flat-cache';

const cacheId = 'cacheId';
const userRoomInfoEnabledKeyPrefix = 'room_info_enabled_';

const cache = flatCache.load(cacheId);

/* 缓存是否有效 */
export const isEnabled = (userId: number) => cache
  .getKey(userRoomInfoEnabledKeyPrefix + userId) === true;

/* 设置为true */
export const set = (userId: number) => {
  cache.setKey(userRoomInfoEnabledKeyPrefix + userId, true);
  cache.save(true);
};

/* 清空 */
export const clear = (userId: number) => {
  cache.removeKey(userRoomInfoEnabledKeyPrefix + userId);
  cache.save(true);
};
