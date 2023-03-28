<template>
  <div class="detail top_page" ref="detailRef">
    <tab-control :titles="names" v-if="showTabControl" class="tab" @tabItemClick="tabClick"
      ref="tabControlRef"></tab-control>

    <van-nav-bar title="房屋详情" left-text="首页" left-arrow @click-left="onClickLeft" />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">FlexStay</div>
    </div>



  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from "@/services"
import { ref, computed, watch, onMounted } from 'vue';

import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from './cpns/detail-01-swipe.vue'
import DetailInfos from "./cpns/detail-02-infos.vue"
import DetailFacility from "./cpns/detail-03-facility.vue"
import DetailLandlord from "./cpns/detail-04-landlord.vue"
import DetailComment from "./cpns/detail-05-comment.vue"
import DetailNotice from "./cpns/detail-06-notice.vue"
import DetailMap from "./cpns/detail-07-map.vue"
import DetailIntro from "./cpns/detail-08-intro.vue"
import useScroll from '@/hooks/useScroll';


const router = useRouter()
const route = useRoute()

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// 发送网络请求
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// tabControl相关操作
const detailRef = ref()
const { scrollTop } = useScroll() // 这里是元素滚动，所以要传入元素
// 在这里读取detailRef.value是读取不到的，因为还没有挂载
const showTabControl = computed(() => {
  // console.log(scrollTop.value)
  return scrollTop.value >= 300
})

// 获取detail中每个元素 以便跳转对应位置
/** 
 * 1.1 可以给每一个元素定义一个ref，然后存放在一个对象sectionEls，key为name，value为元素本身
 * 1.2 第一步也可以改成 ref定义为一个方法，传入的参数即为元素本身
 * 2 点击tab时，获取index，再对应到sectionEls中的key，通过key找到对应的元素
 * 3 计算元素的到父级元素的距离
 * 4 用scrollTo滚动到相应的位置
*/
const sectionEls = ref({})
const names = ref([])
const getSectionRef = (value) => {
  // 卸载时 也会调用 要进行一次判断
  if (!value) return
  // console.log(value.$el)
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
  names.value.push(name)
}
let currentDistance = -1
let isClick = false
// 点击tab，滚动到对应位置
const tabClick = (index) => {
  isClick = true
  // console.log(sectionEls.value)
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop - 44
  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
  currentDistance = distance
}
// 获取tabControlRef组件
const tabControlRef = ref()



// 监听scrollTop，滚动到某个位置时，相关的tab处于active状态
watch(scrollTop, (newValue) => {
  if(newValue === currentDistance) isClick=false
  if (isClick) return
  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const tabOffsetTops = els.map(item => item.offsetTop)

  // 2.根据newValue去匹配想要索引
  let index = tabOffsetTops.length - 1
  for (let i = 0; i < tabOffsetTops.length; i++) {
    // 要减去tabControl的高度
    if (newValue < tabOffsetTops[i] - 44) {
      index = i - 1
      break
    }
  }
  // console.log(tabOffsetTops)
  // console.log("new",newValue,"index",index)
  if(index===-1) index=0
  // 修改currentIndex
  // console.log(tabControlRef.value)
  tabControlRef.value?.setCurrentIndex(index)
})



</script>

<style lang='less' scoped>
.tab {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 11;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>