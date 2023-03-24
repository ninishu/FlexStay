<template>
    <div class="home-content">
        <div class="content">
            <h2 class="title">热门精选</h2>
            <div class="list">
                <template v-for="(item, index) in houselist" :key="item.data.houseId">
                    <house-item-v3 v-if="item.discoveryContentType === 3" 
                    :itemData="item.data"
                    @click="itemClick(item.data)"></house-item-v3>
                    <house-item-v9 v-if="item.discoveryContentType === 9" 
                    :itemData="item.data"
                    @click="itemClick(item.data)"></house-item-v9>
                </template>
            </div>
        </div>

    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

const router = useRouter()
const itemClick=(item)=>{
    // console.log(item.houseId)
    router.push("/detail/"+item.houseId)
}
</script>

<style lang='less' scoped>
.content {
    padding: 10px 8px;

    .title {
        font-size: 22px;
        padding: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>