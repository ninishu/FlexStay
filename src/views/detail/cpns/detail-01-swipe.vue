<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData" :key="index">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>

            <!-- 作用域插槽，这里对子组件传来的值进行了解构 -->
            <template #indicator="{ active, total }">
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup">
                        <span class="item" :class="{ active: swipeData[active]?.title === key }">
                            <span class="text">
                                {{ getName(key) }}
                            </span>
                            <span class="count" v-if="swipeData[active]?.title === key">
                                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                            </span>
                        </span>
                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})

// 轮播数据分组
const swipeGroup = {}
for (let item of props.swipeData) {
    if (!swipeGroup[item.title]) {
        swipeGroup[item.title] = []
        swipeGroup[item.title].push(item)
    }
    swipeGroup[item.title].push(item)
}
// console.log(swipeGroup)

// 分组名称处理
const nameReg = /【(.*?)】/i
const getName = (name) => {
  // return name.replace("：", "").replace("】", "").replace("【", "")
  const results = nameReg.exec(name)
  return results[1]
}


// 获取分组中的索引
const getCategoryIndex = (item) => {
    // 找到对应的组
    // console.log(item)
    const valueArray = swipeGroup[item.title]
    // 在对应的组中找到索引
    return valueArray.findIndex(data => data === item) + 1
}
</script>

<style lang='less' scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;
        &.active {
          padding: 0px 3px 1px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>