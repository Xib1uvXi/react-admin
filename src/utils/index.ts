import { isString, isArray, trim } from 'lodash'

/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
    let _queryString: { [key: string]: any } = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';


/**
 * 是否为空
 * @param {string|number|array|Object} val
 */
export const isEmpty = (val: string | number | any[] | object | undefined) => {
  if (val === null || val === undefined || val === 'null' || val === 'undefined') return true

  if (isArray(val) && val.length === 0) return true

  if (isString(val) && trim(val) === '') return true

  if (val instanceof Object && JSON.stringify(val) === '{}') return true
  return false
}