<template>
    <div class="tab-bar">
        <template v-for="(item,index) in tabBarData">
            <div 
                @click="tabClick(index,item)" 
                class="tab-bar-item"
                :class="{active:currentIndex===index}"
                >
                <img v-if="currentIndex!==index" :src="loadAssetURL(item.image)" alt="tabbar图标">
                <img v-else :src="loadAssetURL(item.imageActive)" alt="tabbar点中的图标">
                <span class="text">{{ item.text }}</span>
                
            </div>
        </template>
        
    </div>
</template>

<script setup>
import tabBarData from "@/assets/data/tabbar.js"
import loadAssetURL from "@/utils/load_assets"
import {ref} from "vue"
import { useRouter } from "vue-router";

const router = useRouter()
let currentIndex = ref(0)
function tabClick(index,item){
    currentIndex.value = index
    router.push(item.path)

}
</script>
<style lang='less' scoped>

.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;   // or right:0
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px #dad6ca solid;
    .tab-bar-item {
        flex: 1;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 25px;
            height: 20px;
        }

        .text{
            font-size: 12px;
        }

        &.active {
            color:var(--primary-color)
        }
    }
}

</style>