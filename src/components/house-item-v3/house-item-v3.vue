<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ itemData.location }}</span>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="new"> ¥{{ itemData.finalPrice }}</div>
          <div class="old"> ¥{{ itemData.productPrice }}</div>
          <div v-if="itemData.priceTipBadge" class="tip">
            {{ itemData.priceTipBadge.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {

    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }



    .info {
      padding: 8px 10px;
      font-size: 12px;
      color: #666;

      .location {
        display: flex;
        align-items: center;

        img {
          width: 12px;
          height: 12px;
        }

        span {
          margin-left: 2px;
        }
      }

      .name {
        margin: 5px 0;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        align-items: center;
        margin: 8px 0;
        .new {
          color: #ff9645;
          font-size: 14px;
        }

        .old {
          margin: 0 3px;
          text-decoration: line-through;
          color: #999;
        }

        .tip {
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 0 6px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
