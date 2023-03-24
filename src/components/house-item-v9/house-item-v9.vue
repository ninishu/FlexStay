<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate v-model="itemScore" color="#fff" :size="12" readonly allow-half/>
          <div class="new">¥{{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';


const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})


const itemScore = computed(() => {
  return Number(props.itemData.commentScore)
})

</script>

<style lang="less" scoped>
.house-item {

  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }

      .name {
        display: -webkit-box;
        margin: 5px 0;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;

      }

      .price {
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: space-between;
      }
    }
  }

}
</style>
