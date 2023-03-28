<template>
    <div class="city-group">
        <!-- groupItem表示国内(or 外)所有的国家  -->
        <van-index-bar :index-list="indexList">
            <!-- 热门区域 -->
            <van-index-anchor index="热门" />
            <div class="hot-list">
                <template v-for="hotCity in currentGroup.hotCities" :key="hotCity.cityId">
                    <div class="hot-city" @click="cityClick(hotCity)">
                        {{ hotCity.cityName }}
                    </div>
                </template>
            </div>

            <!-- 所有城市列表 -->
            <template v-for="groupItem in currentGroup?.cities" :key="groupItem.group">
                <van-index-anchor :index="groupItem.group" />
                <!-- cityItem 表示A(or 别的组)所有的国家 -->
                
                <template v-for="cityItem in groupItem.cities" :key="cityItem.cityId">
                    <div class="city">
                        <van-cell :title="cityItem.cityName" @click="cityClick(cityItem)"/>
                    </div>
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import useCityStore from '@/stores/modules/city'
import { useRouter } from 'vue-router';

const props = defineProps({
    currentGroup: {
        type: Object,
        default: () => ({})
    }
})

// 这里不能直接拿到currentGroup
const indexList = computed(() => {
    const list = props.currentGroup.cities.map(item => item.group)
    list.unshift('#')
    return list

})

// 城市点击
const cityStore = useCityStore()
const router = useRouter()
const cityClick = (city)=>{
    router.push("/home")
    cityStore.currentCity = city
}



</script>

<style lang='less' scoped>
.city-group {
    --van-index-anchor-sticky-text-color: var(--primary-color);
    --van-index-bar-index-active-color:#ff9854;
    .hot-list {
        display: flex;

        flex-wrap: wrap;
        padding: 10px 0;

        .hot-city {
            margin: 6px 10px;
            width: 70px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            background-color: #fff4ec;
            border-radius: 10px;
            font-size: 12px;
        }

    }
}
</style>