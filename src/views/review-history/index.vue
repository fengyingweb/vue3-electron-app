<template>
   <div class="wraper-container">
    {{title}}
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
const {webCache}=useCache('localStorage')

const title = ref('审阅区历史')


</script>

<style lang="scss" scoped>
.wraper-container {
     padding: 14px;
}
</style>
