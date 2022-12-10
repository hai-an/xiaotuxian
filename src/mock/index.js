// 1.下载引入 mock
import Mock from 'mockjs'
import qs from 'qs'
// 2.mock的配置
Mock.setup({
  // 随机延时500-1000毫秒
  timeout: '500-1000'
})
// 4.模拟接口,拦截请求
// 拦截请求,
// 第一个参数:url,使用正则去匹配
// 第二个参数:请求方式
// 第三个参数:生成数据的函数
Mock.mock(/\/my\/test/, 'get', () => {
  // 5.生成随机参数
  const arr = []
  for (let j = 0; j < 15; j++) {
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname',
      count: '@integer(0,7)',
      image: '@image(200x100)'
    }))
  }
  return { msg: '获取数据成功', result: arr }
  // 单个数据
  // Mock.mock('@integer(0,7)')
  // // 对象数据
  // Mock.mock({
  //     id: '@id',
  //     name: '@ctitle(2,4)'
  // })
})
// 模拟 我的收藏
Mock.mock(/\/member\/collect/, 'get', confirg => {
  const queryString = confirg.url.split('?')[1] // 拿到?之后的参数
  const queryObject = qs.parse(queryString) // 把?后面参数体转换成对象
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,300,2,2)',
      // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35, // 商品数据总数
      pageSize: +queryObject.pageSize, // 页面偏移量
      page: +queryObject.page, // 页码
      items // 收藏商品数据
    }
  }
})
