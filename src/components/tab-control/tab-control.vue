<template>
    <div class="tab-control">
        <template v-for="(item, index) in titles" key="item">
            <div class="item" 
            :class="{ active: index === currentIndex }" @click="itemClick(index)">
                <span>{{ item }}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    titles: {
        type: Array,
        default: () => []
    }
})

defineExpose({
    setCurrentIndex,
})
const emit = defineEmits(["tabItemClick"])

const currentIndex = ref(0)
const itemClick = (index) => {
    currentIndex.value = index
    emit("tabItemClick",index)
}
function setCurrentIndex(index){
    // console.log(currentIndex)
    currentIndex.value = index
}

</script>

<style lang='less' scoped>
.tab-control {
    display: flex;
    height: 44px;
    text-align: center;
    align-items: center;
    background: #fff;

    .item {
        flex: 1;

        &.active {
            color: var(--primary-color);
            font-weight: 700;

            span {
                padding: 8px;
                border-bottom: 3px solid var(--primary-color);
            }

        }
    }
}
</style>