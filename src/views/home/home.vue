<template>
    <div class="home">
        <!-- 标题 -->
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>

        <!-- 搜索框 -->
        <home-search-box></home-search-box>
    </div>
</template>

<script setup>
import HomeNavBar from './cpms/HomeNavBar.vue';
import HomeSearchBox from './cpms/HomeSearchBox.vue'


</script>

<style lang='less' scoped>
.banner img{
    width: 100%;
}
</style>