<template>
   <div class="wraper-container">
    {{count}}
   </div>
</template>

<script setup>
import { ref } from 'vue'
import {useCache} from '@/hooks/useCache'
const {wsCache}=useCache('localStorage')

const count = ref('审阅区')


</script>

<style lang="scss" scoped>

</style>
