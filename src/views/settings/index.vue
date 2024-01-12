<template>
   <div class="wraper-container">
    {{title}}
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
const {webCache}=useCache('localStorage')

const title = ref('配置管理')


</script>

<style lang="scss" scoped>
.wraper-container {
     padding: 14px;
}
</style>
