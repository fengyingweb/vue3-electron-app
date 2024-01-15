<template>
   <div class="wraper-container">
    <div class="item">
       <span>{{title}}</span>
       <el-button class="btn-item" type="primary" @click="goToNews">查看新闻</el-button>
    </div>
    <div class="item">
       <span class="bold">文件路径：{{filePath}}</span>
       <el-button class="btn-item" type="primary" @click="handleOpenFile">打开文件</el-button>
    </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
import {useOpenByBrowser} from '@/hooks/useOpenByBrowser'

const {webCache} = useCache('localStorage')
const {openByBrowser} = useOpenByBrowser()

const title = ref('审阅区')
const filePath = ref('')

const goToNews = async ()=> {
   const res = await openByBrowser(`${location.origin}/#/news`)
   console.log(res)
}

const handleOpenFile = async ()=> {
   const resPath = await window.electronAPI.openFile()
   filePath.value = resPath
}

</script>

<style lang="scss" scoped>
.wraper-container {
     padding: 14px;
}
.item {
    margin-bottom: 10px;
}
.btn-item {
     margin-left: 15px;
}
.bold {
    font-weight: bold;
}
</style>
