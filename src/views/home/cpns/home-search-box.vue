<template>
    <div class="home-search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position">
                <span class="text" @click="myPositionClick">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="定位图标">
            </div>
        </div>

        <!-- 日期 -->
        <div class="section date-range bottom-gray-line" @click="showsCalendar = true">
            <div class="start">
                <span class="text">入住</span>
                <span class="data">{{ startDate }}</span>
            </div>
            <div class="stay">
                {{ stayDay }}晚
            </div>
            <div class="end">
                <span class="text">离店</span>
                <span class="data">{{ endDate }}</span>
            </div>
            <!-- 人数 床数 -->
            <div class="filter">
                人数/床数
            </div>
        </div>

        <!-- 日历 -->
        <van-calendar v-model:show="showsCalendar" type="range" @confirm="onConfirm" color="#ff9854" title="请选择入住离开日期" />

        <!-- 关键词 -->
        <div class="section keywords bottom-gray-line ">
            关键词/位置/民俗名
        </div>

        <!-- 热门建议 -->
        <div class="section hot-suggests ">
            <template v-for="(item, index) in hotSuggests" :key="item.tagText.text">
                <div class="hot-item">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="section search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import { ref,isReactive } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { formatMonthDay, getDiffDays } from '@/utils/formatDate'
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main'

// 城市点击
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)  // 这里没加storeToRefs也有响应式？
const router = useRouter()
const cityClick = () => {
    router.push("/city")
}

// 我的位置点击
const myPositionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        // 获取的结果是经纬度
        console.log("获取位置成功", res)
    }, err => {
        console.log("获取位置失败", err)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    })
}

// 日期范围
// 1. 拿到mainStore中的起始时间
const mainStore = useMainStore()
const {nowDate,nextDate} = storeToRefs(mainStore)
// 2. 起始时间格式化
const startDate = ref(formatMonthDay(nowDate.value))
const endDate = ref(formatMonthDay(nextDate.value))

// 持续时间
const stayDay = ref(1)

// 日历
const showsCalendar = ref(false)
const onConfirm = (date) => {
    // 3. 拿到日历中设置的起始时间
    const selectStartDate = date[0]
    const selectEndDate = date[1]

    // 4.日历中的时间传回mainStore中
    nowDate.value = selectStartDate
    nextDate.value = selectEndDate

    // 5.把设置的时间格式化
    startDate.value = formatMonthDay(selectStartDate)
    endDate.value = formatMonthDay(selectEndDate)
    showsCalendar.value = false
    stayDay.value = getDiffDays(selectStartDate, selectEndDate)
}

// 获取热门数据
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// console.log("currentCity",isReactive(currentCity))

// 搜索按钮点击
const searchBtnClick = () => {
    router.push({
        path:"/search",
        query:{
            startDate: startDate.value,
            endDate:endDate.value,
            currentCity: currentCity.cityName
        }
    })
}

</script>

<style lang='less' scoped>
.location {
    display: flex;
    margin: 0 20px;
    height: 44px;
    align-items: center;

    .city {
        flex: 1;
        font-size: 15px;
        color: #333;
        padding-right: 10px;
        font-weight: 600;
    }

    .position {
        display: flex;
        align-items: center;

        .text {
            margin-top: 3px;
            margin-right: 8px;
            font-size: 12px;
            color: #666;
        }

        img {
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 20px;
    color: #999;
}

.date-range {
    height: 44px;

    .start,
    .end {
        display: flex;
        flex-direction: column;

        .text {
            font-size: 12px;
            color: #999;
        }

        .data {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }

    .end {
        padding-right: 30px;
    }

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }


    .filter {
        font-size: 12px;
        color: #666;
    }
}

.keywords {
    height: 44px;
}

.bottom-gray-line {
    border-bottom: 1px dotted var(--line-color);
}

.hot-suggests {
    .hot-item {
        font-size: 12px;
        padding: 4px 8px;
        margin: 3px;
        border-radius: 14px;
        color: #3f4954;
        background-color: #f1f3f5;
        // line-height: 1;
    }
}

.search-btn {
    margin-top: 20px;
    .btn {
        width: 324px;
        height: 38px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }

}
</style>