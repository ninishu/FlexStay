<template>
    <div class="tab-bar">

        <van-tabbar v-model="currentIndex" active-color="#ff9854" :route="true">
            <template v-for="(item, index) in tabBarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex!==index" :src="loadAssetURL(item.image)" alt="tabbar图标">
                        <img v-else :src="loadAssetURL(item.imageActive)" alt="tabbar选中时的图标">
                    </template>


                </van-tabbar-item>
            </template>

        </van-tabbar>

        <!-- <template v-for="(item,index) in tabBarData">
            <div 
                @click="tabClick(index,item)" 
                class="tab-bar-item"
                :class="{active:currentIndex===index}"
                >
                <img v-if="currentIndex!==index" :src="loadAssetURL(item.image)" alt="tabbar图标">
                <img v-else :src="loadAssetURL(item.imageActive)" alt="tabbar点中的图标">
                <span class="text">{{ item.text }}</span>
                
            </div>
        </template> -->

    </div>
</template>

<script setup>
import tabBarData from "@/assets/data/tabbar.js"
import loadAssetURL from "@/utils/load_assets"
import { ref,watch } from "vue"
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
let currentIndex = ref(0)
const route = useRoute()

// 监听路由变化 找到对应的索引
watch(route,(newValue)=>{
    const index = tabBarData.findIndex(item=>item.path===newValue.path)
    console.log(index)
    // city不在tabbar 是-1
    if(index!==-1){  
        currentIndex.value = index
    }
})


</script>
<style lang='less' scoped>
.tab-bar {
    img {
        width: 30px;
        height: 25px;
    }
}
</style>