<template>
    <div class="loading" 
    v-show="mainStore.isShowLoading"
    @click="loadingClick"
    >
        <div class="bg">
            <img src="@/assets/img/home/full-screen-loading.gif" alt="">
        </div>
    </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main.js"

const mainStore = useMainStore()
// console.log(mainStore.isShowLoading)

const loadingClick = ()=>{
    mainStore.isShowLoading = false
}
</script>

<style lang='less' scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.2);

    .bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background: url(@/assets/img/home/loading-bg.png) 0 0  / 100% 100%;

        img {
            margin-bottom: 10px;
            width: 70px;
            height: 70px;
        }
    }
}
</style>