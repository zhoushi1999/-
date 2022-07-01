import request from '@/utils/request'
// 设置频道接口
export const getMyChannels = () => {
  return request({ url: 'user/channels' })
}
// /文章列表接口/
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({ url: 'articles', params: { channel_id, timestamp } })
}
// 获取所有的频道接口
export const getAllArticleList = () => {
  return request({ url: 'channels' })
}
// 频道数据持久化
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data:
      { channels }
  })
}
