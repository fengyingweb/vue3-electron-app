<template>
   <div class="load-container">
     <img :src="close" class="close-btn"/>
     <div class="load-main">
       <img :src="logo" class="logo-img"/>
       <div class="title">
         <p>新闻信息终端</p>
         <p>丰富 · 实时 · 高效 · 智能</p>
       </div>
     </div>
     <div class="load-process-box">
       <span>开始启动...</span>
       <span>{{progress}}%</span>
     </div>
   </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { useCache } from '@/hooks/useCache'
import { imgLocalUrl } from '@/utils/imgLocalUrl'

const { webCache } = useCache('localStorage')
// 引入icon
const logo = ref(imgLocalUrl('@/assets/logo.png'))
const close = ref(imgLocalUrl('@/assets/load/close.png'))
const progress = ref(0)
let timer = null
onMounted(()=>{
  clearInterval(timer)
  timer = setInterval(()=> {
    if (progress.value === 100) {
      clearInterval(timer)
      if (window.electronAPI) {
        if(!webCache.get('login')){
          window.electronAPI.isShowLogin(true)
        }else{
          window.electronAPI.isShowLogin(false)
        }
      }
      return
    }
    progress.value += 1
  }, 100)
})
</script>

<style lang="less" scoped>
.load-container{
  width: 100%;
  height: 100vh;
  background: #F44311;
  box-shadow: 0px 4px 14px 0px rgba(0,0,0,0.15);
  border-radius: 2px 2px 2px 2px;
  position: relative;
  .close-btn{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
  }
  .close-btn:hover{
    opacity: .8;
  }
  .load-main{
    display: flex;
    align-items: center;
    position: absolute;
    left: 110px;
    top: 98px;
    .logo-img{
      width: 58px;
      height: 58px;
      margin-right: 16px;
      display: flex;
    }
    .title{
      width: 180px;
      p:nth-child(1){
        font-size: 30px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
      p:nth-child(2){
        font-size: 15px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255,255,255,0.9);
      }
    }
  }
  .load-process-box{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 14px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #E6E6E6;
    }
  }
}
</style>
