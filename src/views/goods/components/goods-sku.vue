<!-- eslint-disable no-return-assign -->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt >{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
        <img  @click="clickSpecs(item,val)" v-if="val.picture" :class="{selected:val.selected,disabled:val.disabled}" :src="val.picture" :title="val.name">
        <span :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
      </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set'
const spliter = '★'
// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  // 1. 过滤出有库存有效的sku
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算当前有库存的sku子集
      // 例如:[1,2,3] => [[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
      // 可选值数组
      const valueArr = sku.specs.map(val => val.valueName)
      console.log(valueArr)

      // 可选值数组 子集
      const valueArrPowerSet = getPowerSet(valueArr)
      console.log(valueArrPowerSet)

      // 遍历子集,往pathMap插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据arr得到字符串的key,约定key是:['蓝色','美国']
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  console.log(pathMap)

  return pathMap
}
// 得到当前选中规格数组
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(spec => {
    const selectVal = spec.values.find(val => val.selected)
    selectedArr.push(selectVal ? selectVal.name : undefined)
  })
  return selectedArr
}
// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效的值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // 设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
// 默认选中
const inDefaultSelected = (goods, skuId) => {
  // 1.找出sku的信息
  // 2.遍历每一个按钮,按钮的值和 sku记录的值相同,就选中
  const sku = goods.skus.find(sku => sku.id === skuId)
  console.log('goods', goods)
  console.log('goods.specs', goods.specs)
  console.log('goods.skus', goods.skus[0].id)
  console.log('sku', sku)
  console.log('skuId', skuId)

  goods.specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    // 初始化时  根据skuId,初始化默认选中
    if (props.skuId) {
      console.log('props.skuId', props.skuId)
      inDefaultSelected(props.goods, props.skuId)
    }
    //  ☆ 组件初始化: 更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    const clickSpecs = (item, val) => {
      // 如果是禁用状态不作处理
      if (val.disabled) return false
      // 1.选中时,再次点击该选项,取消选中
      // 2.当前项选中时,点击同一规格的其他 属性时,取消当前选中,给 点击目标 添加选中
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(p => { p.selected = false })
        val.selected = true
      }
      // ☆ 点击按钮时,更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 将你选择的sku信息通知父组件{skuId,price,oldPrice,inventory,specsText}
      // 1.选择完整的sku组合按钮,才可以拿到这些信息,提知父组件
      // 2.不是完整的sku组合按钮,提交对象父组件
      const validSelectedValues = getSelectedArr(props.goods.specs).filter(v => v)
      if (validSelectedValues.length === props.goods.specs.length) {
        console.log('完整')
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        console.log('skuIds', skuIds)
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名:属性名 属性值 属性名1 属性值1
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, '').trim()
        })
        console.log(sku.specs.reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, ''))
      } else {
        console.log('不完整')
        // 父组件需要判断是否规格选择完整,不完整不能加购物车
        emit('change', {})
      }
    }
    return { clickSpecs, pathMap }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
