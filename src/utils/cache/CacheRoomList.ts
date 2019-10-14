import flatCache from 'flat-cache';
import moment from 'moment';

const cacheId = 'cacheId';
const sysLastUpdateKey = 'room_list_last_updated';
const userLastUpdateKeyPrefix = 'room_list_last_updated_';

const cache = flatCache.load(cacheId);

/* 检查是否当前玩家列表数据缓存是否有效 */
export const isEnabled = (userId: number) => {
  // userLastUpdated: 当前玩家对应的房间列表的最后缓存更新时间 (以下简称"玩家时间")
  const userLastUpdated = cache.getKey(userLastUpdateKeyPrefix + userId);

  // 玩家时间不存在 表示失效
  if (typeof userLastUpdated !== 'string' || userLastUpdated === '') {
    return false;
  }

  // sysLastUpdated: 系统的房间列表的最后缓存更新时间 (以下简称"系统时间")
  const sysLastUpdated = cache.getKey(sysLastUpdateKey);

  // 系统时间不存在 表示有效
  if (typeof sysLastUpdated !== 'string' || sysLastUpdated === '') {
    return true;
  }

  // 玩家时间 大于 系统时间 表示有效
  return moment(userLastUpdated).isAfter(moment(sysLastUpdated));
};

/* 更新 当前玩家对应的房间列表的最后缓存更新时间 */
export const updateUserKey = (userId: number) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  cache.setKey(userLastUpdateKeyPrefix + userId, now);
  cache.save(true);
};

/* 更新 系统的房间列表的最后缓存更新时间 */
export const updateSysKey = () => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  cache.setKey(sysLastUpdateKey, now);
  cache.save(true);
};
