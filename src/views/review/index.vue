<template>
   <div class="wraper-container">
    <div>
       <span>{{title}}</span>
       <el-button class="btn-item" type="primary" @click="goToNews">查看新闻</el-button>
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

const goToNews = async ()=> {
   const res = await openByBrowser(`${location.origin}/#/news`)
   console.log(res)
}

</script>

<style lang="scss" scoped>
.wraper-container {
     padding: 14px;
}
.btn-item {
     margin-left: 15px;
}
</style>
