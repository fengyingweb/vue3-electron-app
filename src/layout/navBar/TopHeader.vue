<template>
 <div class="header-container wraper-container-drag">
   <div class="action-box_left wraper-container-no-drag">
     <img :src="isDark?homeDark:home"/>
     <img :src="isDark?shuaxinDark:shuaxin"/>
     <p class="time">{{currentTime}}</p>
   </div>
   <div class="action-box_right wraper-container-no-drag">
     <!-- <img :src="isDark?topUtilsDark:topUtils"  class="action-img"/> -->
     <img :src="isDark?topVoiceDark:topVoice"  class="action-img"/>
     <img :src="isDark?topInfoDark:topInfo"  class="action-img"/>
     <img :src="isDark?topThemeDark:topTheme"  class="action-img" @click="handleChangeTheme"/>
     <img :src="isDark?topMiniDark:topMini"  class="action-img" @click="handleChangeScreen('miniScreen')"/>
     <img :src="isDark?topExpandDark:topExpand"  class="action-img" @click="handleChangeScreen('fullScreen')"/>
     <img :src="isDark?topCloseDark:topClose"  class="action-img no-margin" @click="handleChangeScreen('closeScreen')"/>
<!--     <i-ep-SemiSelect class="mini-icon" @click="handleChangeScreen('miniScreen')"></i-ep-SemiSelect>-->
<!--     <i-ep-FullScreen class="mini-icon" @click="handleChangeScreen('fullScreen')"></i-ep-FullScreen>-->
<!--     <i-ep-CloseBold class="mini-icon no-margin" @click="handleChangeScreen('closeScreen')"></i-ep-CloseBold>-->
   </div>
 </div>
</template>

<script setup>
import {computed, ref, onBeforeUnmount } from 'vue'
import {imgLocalUrl} from '@/utils/imgLocalUrl'
import {useAppStore} from '@/store/app'
import moment from 'moment'

const appStore = useAppStore()

let timer = null
const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
const isDark = computed(()=>{
  return appStore.isDarkMode
})
// 引入icon
const home=imgLocalUrl('@/assets/layout/home.png')
const shuaxin=imgLocalUrl('@/assets/layout/shuaxin.png')
const topClose=imgLocalUrl('@/assets/layout/top-close.png')
const topExpand=imgLocalUrl('@/assets/layout/top-expand.png')
const topMini=imgLocalUrl('@/assets/layout/top-mini.png')
const topVoice=imgLocalUrl('@/assets/layout/top-voice.png')
const topTheme=imgLocalUrl('@/assets/layout/top-theme.png')
const topUtils=imgLocalUrl('@/assets/layout/top-utils.png')
const topInfo=imgLocalUrl('@/assets/layout/top-info.png')

const homeDark=imgLocalUrl('@/assets/layout/top-home-dark.png')
const shuaxinDark=imgLocalUrl('@/assets/layout/top-refresh-dark.png')
const topCloseDark=imgLocalUrl('@/assets/layout/top-close-dark.png')
const topExpandDark=imgLocalUrl('@/assets/layout/top-expand-dark.png')
const topMiniDark=imgLocalUrl('@/assets/layout/top-mini-dark.png')
const topVoiceDark=imgLocalUrl('@/assets/layout/top-voice-dark.png')
const topThemeDark=imgLocalUrl('@/assets/layout/top-theme-dark.png')
// const topUtilsDark=imgLocalUrl('@/assets/layout/top-utils-dark.png')
const topInfoDark=imgLocalUrl('@/assets/layout/top-info-dark.png')

const handleChangeScreen=(value)=>{
    window.electronAPI.setScreen(value)
}
const handleChangeTheme= async ()=>{
  const res = await window.electronAPI?.toggleTheme()
  appStore.setDark(res)
}

timer = setInterval(()=> {
  currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
}, 1000)

onBeforeUnmount(()=> {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.header-container{
  width: 100%;
  height: $topHeaderHeight;
  background: var(--top-header-back-color);
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 24px;
  .action-box_left{
    display: flex;
    align-items: center;
    .mini-icon{
      color: #191919;
      font-size: 16px;
      margin-right:28px;
      cursor: pointer;
    }
    img{
      width: 20px;
      height: 20px;
      display: block;
      margin-right: 28px;
      cursor: pointer;
    }
    img:hover{
      opacity: .6;
    }
    .time{
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: var(--top-header-time-color);
    }
  }
  .action-box_right{
    display: flex;
    align-items: center;
    //.mini-icon{
    //  color: #191919;
    //  font-size: 16px;
    //  margin-right:30px;
    //  cursor: pointer;
    //}
    .action-img{
      width: 20px;
      height: 20px;
      display: block;
      margin-right:30px;
      cursor: pointer;
    }
    .action-img:hover{
      opacity: .6;
    }
    .no-margin{
      margin-right: 0;
    }
  }

}
</style>
