<template>
   <div class="wraper-container">
    {{title}}
     <el-button type="success">Success</el-button>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
const {webCache}=useCache('localStorage')

const title = ref('运营管理')


</script>

<style lang="scss" scoped>
.wraper-container {
     padding: 14px;
}
</style>
