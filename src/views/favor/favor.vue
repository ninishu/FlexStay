<template>
    <div class="favor" ref="favorRef" @scroll="scrollEvent">
      <nav-bar left-text="旅途">
        <template #title>
          <van-tabs v-model:active="active" type="card" shrink>
            <van-tab v-for="item in titles" :title="item"></van-tab>
          </van-tabs>
        </template>
      </nav-bar>
      <!-- 我的收藏 -->
      <div v-if="active === 0" class="favor-list" @scroll="scrollEvent">
        <van-tabs v-model:active="activeName">
          <van-tab title="房屋" name="house">
            <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
            <div class="content" :style="{ transform: getTransform }">
              <template v-for="(item, index) in visibleData" 
              :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }">
                <search-list-item :item-data="item"></search-list-item>
              </template>
            </div>
          </van-tab>
          <van-tab title="房东" name="landlord">
            <div class="content">
              <!-- 内容 -->
              <div v-if="landlordlist.length" class="list"></div>
  
              <div v-else class="no-data">
                <img
                  class="icon-no-data"
                  src="@/assets/img/favor/empty_favorite.44731802.png"
                  alt=""
                />
                <div class="name">暂无收藏</div>
                <div class="desp">
                  点击
                  <img src="@/assets/img/favor/favor.png" alt="" />
                  即可收藏对应的房东
                </div>
                <button class="btn" @click="handleBtnClick">随便去逛逛</button>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
  
      <!-- 浏览历史 -->
      <div v-if="active === 1" class="history">
        <div class="content">
          <template v-for="(item, index) in historylist">
            <search-list-item :item-data="item"></search-list-item>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import NavBar from "@/components/nav-bar/index.vue";
  import SearchListItem from "@/components/search-list-item/index.vue";
  import { ref,computed,onMounted } from "vue";
  import { getFavorList, getHistoryList } from "@/services";
  import { useRouter } from "vue-router";
  import useScroll from "@/hooks/useScroll"
  const router = useRouter();
  const titles = ["我的收藏", "浏览历史"];
  const active = ref(0);
  const activeName = ref("house");
  const itemSize = 336 
  const favorlist = ref([]);
  const historylist = ref([]);
  const landlordlist = ref([]);
  
  getFavorList().then((res) => {
    favorlist.value = res.data.data.items || [];
  });
  getHistoryList().then((res) => {
    historylist.value = res.data.data.items || [];
  });
  
  const handleBtnClick = () => {
    router.push("/");
  };

  const favorRef = ref()
  const clientHeight = ref()
  const start = ref(0)
  const  startOffset = ref(0)
  onMounted(()=>{
    clientHeight.value = document.documentElement.clientHeight
  })
  

  // 列表总长度
  const listHeight = computed(()=>{
    return favorlist.value.length* itemSize
  })

  // 可显示的列表项数
  const visibleCount = computed(()=>{
    return Math.ceil(clientHeight.value/itemSize)
  })

  // 偏移量对应的style
  const getTransform = computed(()=>{
    return `translate3d(0,${startOffset.value}px,0)`
  })

  // 获取真实显示列表数据
  const visibleData = computed(()=>{
    return favorlist.value.slice(start.value,Math.min(end.value
    ,favorlist.value.length))
  })
  
  //  结束索引
  const end = computed(()=>{
    return start.value + visibleCount.value
  })

  // 滚动事件
  const scrollEvent = ()=>{
    let scrollTop = favorRef.value.scrollTop
    start.value = Math.floor(scrollTop/itemSize)
    // 此时的偏移量
    startOffset.value = scrollTop - (scrollTop%itemSize)
    console.log(startOffset.value)
  }
  </script>
  
  <style scoped lang="less">
  .favor {
    height: 100vh;
  overflow-y: auto;
  position: relative;

  .infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
  }
  .content {
    padding: 10px 20px 55px 20px;
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-no-data {
        width: 100%;
      }
      .name {
        color: #333;
        font-size: 18px;
        font-weight: 500;
        line-height: 27px;
      }
      .desp {
        color: #666;
        line-height: 18px;
        font-size: 14px;
        margin: 7px auto 36px;
  
        img {
          position: relative;
          top: 4px;
          width: 12px;
        }
      }
      .btn {
        padding: 0 38px;
        height: 40px;
        line-height: 40px !important;
        font-size: 16px;
        color: #fff;
        background: var(--primary-color);
        border-radius: 20px;
        border: none;
        outline: none;
      }
    }
  }
  </style>
  