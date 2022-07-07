import request from '@/utils/request'
// 新闻接口
/**
 *
 * @param {文章id} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({ url: `/articles/${article_id}` })
}
// 关注用户
export const addUser = (target) => {
  return request({
    url: 'user/followings',
    method: 'POST',
    data: { target }
  })
}
// 删除用户
export const delUser = (target) => {
  return request({ url: `/user/followings/${target}`, method: 'DELETE', data: { target } })
}
// 收藏
export const addCollect = (target) => {
  return request({
    url: 'article/collections',
    method: 'POST',
    data: { target }
  })
}
// 取消收藏
export const delCollect = (target) => {
  return request({
    url: `article/collections/${target}`,
    method: 'DELETE'
  })
}
