<template>
   <div class="wraper-container">
    {{title}}
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
const {wsCache}=useCache('localStorage')

const title = ref('审阅区历史')


</script>

<style lang="scss" scoped>

</style>
