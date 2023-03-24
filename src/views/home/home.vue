<template>
    <div class="home" ref="homeRef">
        <!-- 标题 -->
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>

        <!-- 搜索框 -->
        <home-search-box></home-search-box>

        <!-- 分类 -->
        <home-categories></home-categories>
        

        <!-- 搜索框 -->
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar></search-bar>
        </div>

        
        <!-- 热门精选 -->
        <home-content></home-content>

        <!-- <button @click="getMore">加载更多</button> -->



    </div>
</template>
<script>

</script>
<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/modules/home';
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import useScroll from '@/hooks/useScroll'
import SearchBar from '@/components/search-bar/search-bar.vue'
import { watch, computed,ref,onActivated } from 'vue';

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()  // 获取数据 homeStore更新
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// const getMore = ()=>{
//     homeStore.fetchHouseListData()
// }
const homeRef = ref()
// 监听窗口滚动
const { isReachBottom, scrollTop } = useScroll(homeRef)
// 监听数据变化 在template中可以直接监听，在js中要用watch
watch(isReachBottom, (newValue) => {
    if (newValue) {
        // console.log("发送网络请求")
        // console.log(isReachBottom.value)
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false
        })
    }

})

// 监听搜索框是否显示
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 300
})

// console.log(isReachBottom)

// 切换回来时 保证在之前的位置
onActivated(()=>{
    homeRef.value?.scrollTo({
        top:scrollTop.value
    })
})
</script>

<style lang='less' scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;  // 不然下面的50px也属于home ->滚动条出错
    padding-bottom: 50px;
}

.banner img {
    width: 100%;
}

.search-bar{
    position: fixed;
    padding: 16px 16px 10px;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    background: #fff;
    z-index: 9;
}
</style>