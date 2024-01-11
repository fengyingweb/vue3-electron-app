<template>
<!--  <TopHeader />-->
  <div class="wraper-container-no-drag">
    <div class="layout-container">
      <Siderbar></Siderbar>
      <div class="layout-right">
        <div class="layout-navbar">
          <Navbar></Navbar>
        </div>
        <div :class="['layout-content',isCollapse?'layout-content-collapse':'']" >
          <AppMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import TopHeader from './navBar/TopHeader.vue'
import Siderbar from "./sideBar/Sidebar.vue";
import Navbar from "./navBar/Navbar.vue";
import AppMain from './AppMain.vue'
import {useAppStore} from '@/store/app.js'
import {watchTheme} from  '@/hooks/watchTheme.js'
const appStore = useAppStore()
const isCollapse = computed(()=>{
  return appStore.isCollapse
})
watchTheme()
</script>

<style lang="scss" scoped>
.layout-container{
  display: flex;
  .layout-right:not(.layout-content-collapse){
    width: calc(100vw - #{$sideBarWidth});
  }
  .layout-right{
    width: calc(100vw - #{$sideBarExpandWidth});
  }
  .layout-content{
    //min-height: calc(100vh);
    background: #ffffff;
  }
}
</style>
