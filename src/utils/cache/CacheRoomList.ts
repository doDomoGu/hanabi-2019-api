import flatCache from 'flat-cache';
import moment from 'moment';
import state from '../../config/state';

const cacheId = 'cacheId';
const sysLastUpdateKey = 'room_list_last_updated';
const userLastUpdateKeyPrefix = 'room_list_last_updated_';

/* 检查是否需要给当前玩家重新读取列表数据 */
export const isNoUpdate = () => {
  const cache = flatCache.load(cacheId);
  // userLastUpdated: 当前玩家对应的房间列表的最后缓存更新时间
  const userLastUpdated = cache.getKey(userLastUpdateKeyPrefix + state.userId);

  // 当前玩家的最后缓存更新时间 不存在 需要更新数据
  if (typeof userLastUpdated !== 'string' || userLastUpdated === '') {
    return false;
  }

  // 系统的房间列表的最后缓存更新时间
  const sysLastUpdated = cache.getKey(sysLastUpdateKey);

  if (typeof sysLastUpdated !== 'string' || sysLastUpdated === '') {
    return true;
  }

  // 当前玩家的最后缓存更新时间 小于 系统的最后缓存更新时间 需要更新数据
  return moment(userLastUpdated).isAfter(moment(sysLastUpdated));
};

export const updateUserKey = () => {
  const cache = flatCache.load(cacheId);
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  cache.setKey(userLastUpdateKeyPrefix + state.userId, now);
  cache.save(true);
};

export const updateSysKey = () => {
  const cache = flatCache.load(cacheId);
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  cache.setKey(sysLastUpdateKey, now);
  cache.save(true);
};
