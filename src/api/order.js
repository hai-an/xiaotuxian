import request from '@/utils/request'

/**
 * 获取结算信息(购物车不需要传id) ,生成订单
 */
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}
/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}
/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = (address) => {
  return request('/member/address', 'put', address)
}

/**
 *提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}
/**
 * 获取 再次购买 的 订单结算信息
 * @param {String} id - 订单ID
 * @returns
 */
export const findOrderRepurchase = (id) => {
  return request(`/member/order/repurchase/${id}`, 'get')
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}
/**
 * 获取我的订单列表
 * @param {integer} page - 页码
 * @param {integer} pageSize - 页尺寸
 * @param {integer} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * 已付款 模拟发货
 * http://pcapi-xiaotuxian-front-devtest.itheima.net/member/order/consignment/
 * @param {number} id - 订单ID
 */
export const simulateShipment = (id) => {
  return request('/member/order/consignment/' + id, 'get')
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = ({ orderId, cancelReason }) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}
/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const delteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}
/**
 * 订单确认收货
 * @param {string} id - 订单id
 * @returns
 */
export const confirmOrder = (id) => {
  return request(`/member/order/${id}/receipt`, 'put')
}
/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
