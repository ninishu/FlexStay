<template>
  <div class="app">
    <!-- 接收router-view里插槽传来的值（是一个对象，这里把传来的值做了解构，取出
    组件本身，这里为home-->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>

    </router-view>


    <tab-bar v-show="!$route.meta.hiddenTab"></tab-bar>
    <!-- <tab-bar></tab-bar> -->
    <loading></loading>
  </div>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue'
// const route = useRoute
</script>

<style lang='less' scoped></style>