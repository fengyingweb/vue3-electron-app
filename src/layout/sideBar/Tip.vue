<template>
    <div class="tip-container">
        <i-ep-Expand v-if="isCollapse" class="mini-icon" @click="handleSetCollapse(false)"></i-ep-Expand>
        <i-ep-Fold v-else class="mini-icon" @click="handleSetCollapse(true)"></i-ep-Fold>
        <div class="wechat-icon" v-if="!isCollapse"></div>
        <span v-if="!isCollapse">13012345678</span>
    </div>
</template>

<script setup>
import {imgLocalUrl} from '@/utils/imgLocalUrl'
import {useAppStore} from "@/store/app";
import {computed} from "vue";
const appStore = useAppStore()
const isCollapse = computed(()=>{
  return appStore.isCollapse
})
const handleSetCollapse=(e)=>{
  appStore.setCollapse(e)
}
</script>

<style lang="scss" scoped>
.tip-container{
  position: absolute;
  left: 25px;
  bottom: 27px;
  display: flex;
  align-items: center;
  .wechat-icon {
    margin-left: 11px;
    margin-right: 6px;
    width: 30px;
    height: 30px;
    background-image: url('@/assets/layout/wechat-bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #fff;
    border-radius: 30px;
    overflow: hidden;
  }
  span{
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  .mini-icon{
    color: #FFFFFF;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
