<template>
  <div class="app">
    <router-view></router-view>

    <!-- <tab-bar v-if="!route.meta.hiddenTab"></tab-bar> -->
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import tabBar from './components/tab-bar/tab-bar.vue';
// const route = useRoute
</script>

<style lang='less' scoped></style>