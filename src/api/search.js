import request from '@/utils/request'
// 建议接口
export const getSuggestList = (q) => { return request({ url: 'suggestion', params: { q } }) }

/**
 *搜素结果接口
 * @param {*} page//当前页面,默认为1
 * @param {*} per_page//每页显示
 * @param {*} q//搜素关键字
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
