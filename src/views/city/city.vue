<template>
    <div class="city top_page">
        <div class="top">
            <!-- 搜索框 -->
            <van-search shape="round" v-model="searchValue" 
                placeholder="城市/区域/位置" show-action
                @cancel="onCancel" />

            <!-- 标签 国内外 -->
            <!-- value表示国内外两个对象 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>

        <div class="content">
            <template v-for="(value, key, index) in allCities">
                <city-group v-show="key===tabActive" :currentGroup="value"></city-group>
            </template>
        </div>
    </div>
</template> 

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia';
import CityGroup from './cpns/CityGroup.vue'
const router = useRouter()

// 搜索框 
const searchValue = ref("")
const onCancel = () => {
    router.back()
}

// tab的切换
const tabActive = ref()

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// city展示
const currentGroup = computed(()=>allCities.value[tabActive.value])

</script>

<style lang='less' scoped>
.top {
    position: relative;
    z-index: 9;
}
.content {
    height: calc(100vh - 98px);
    overflow-y: auto;
}
 </style>