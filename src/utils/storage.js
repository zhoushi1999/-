// 方便使用本地存储 简化操作 获取 设置 删除 清除
// 获取
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try { return JSON.parse(res) } catch (err) { return res }
}
// 设置
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *根据参数删除
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 * 清楚所有
 */
export function clearItem () {
  window.localStorage.clearItem()
}
