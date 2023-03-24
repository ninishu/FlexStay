<template>
    <div class="home-categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="房源分类图片">
                <div class="text">{{ item.title }}</div>
            </div>

        </template>
    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia';
const homeStore = useHomeStore()

const { categories } = storeToRefs(homeStore)
// console.log(categories)
</script>

<style lang='less' scoped>
.home-categories {
    display: flex;
    height: 80px;
    margin: 5px 20px;
    overflow-x: auto;
    // 隐藏滚动条 伪元素
    &::-webkit-scrollbar {
        display: none;
    }
    

    .item {
        display: flex;
        flex-direction: column;
        // 注意 flex 内容放不下 默认会缩小（默认是1）
        flex-shrink: 0;
        width: 70px;
        justify-content: center;
        align-items: center;
        img {
            width: 32px;
            height: 32px;
        }

        .text {
            // width: 70px;
            font-size: 12px;
            margin-top: 8px;
            color:#646566;
        }
    }

}
</style>