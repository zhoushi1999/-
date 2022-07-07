import request from '@/utils/request'
// 评论接口
/**
 *
 * @param {
 * } * *type评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * source 源id，文章id或评论id
 *  offset获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getComment = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: { type, source, offset, limit }
  })
}
/**
 *点赞评论接口
 * @param {点赞的评论id} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    url: 'comment/likings',
    method: 'POST',
    data: { target }
  })
}
/**
 *取消评论接口
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}
/**
 *评论接口
 * @param {target评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * art_id文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * content评论内容} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    url: 'comments',
    method: 'POST',
    data
  })
}
