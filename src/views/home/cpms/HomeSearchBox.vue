<template>
    <div class="home-search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position">
                <span class="text">我的位置</span>
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
        <div class="section hot-suggests">
            <template v-for="(item, index) in hotSuggests" :key="item.tagText.text">
                <div class="hot-item">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { formatMonthDay, getDiffDays } from '@/utils/formatDate'
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia';

// 城市点击
const { currentCity } = useCityStore()
const router = useRouter()
const cityClick = () => {
    router.push("/city")
}

// 日期范围
const nowDate = new Date()  // 今天
const nextDate = new Date()
// 第二天  setDate的返回值是时间戳 这样设置后nextDate表示默认格式的第二天
nextDate.setDate(new Date().getDate() + 1)

const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(nextDate))

// 持续时间
const stayDay = ref(1)

// 日历
const showsCalendar = ref(false)
const onConfirm = (date) => {
    const selectStartDate = date[0]
    const selectEndDate = date[1]
    startDate.value = formatMonthDay(selectStartDate)
    endDate.value = formatMonthDay(selectEndDate)
    showsCalendar.value = false
    stayDay.value = getDiffDays(selectStartDate, selectEndDate)
}

// 获取热门数据
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()  // 获取数据 homeStore更新
const { hotSuggests } = storeToRefs(homeStore)

console.log(hotSuggests.value)

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
        line-height: 1;
    }
}
</style>