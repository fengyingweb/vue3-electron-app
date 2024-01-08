<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>chrome{{versions.chrome}}，electron{{versions.electron}}，node{{versions.node}}</p>
  <div>
    <input type="text" v-model="inputVal">
    <button type="button" @click="clickSetTitle">设置标题</button>
  </div>
  <div>
    <button type="button" @click="clickOpenFile">选择文件</button>
    <span class="bold">{{filePath}}</span>
  </div>
  <div>
    当前主题<span>{{curTheme}}</span>
    <button type="button" @click="clickToggle">切换主题</button>
    <button type="button" @click="clickRest">重置主题</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  msg: String
})
const {setTitle, openFile, toggleTheme, systemTheme} = electronAPI
const count = ref(0)
const versions = ref(electronAPI.versions)
const inputVal = ref('')
const filePath = ref('')
const curTheme = ref('System')
const clickSetTitle = ()=> {
  if (inputVal.value.trim()) {
    setTitle(inputVal.value.trim())
  }
}
const clickOpenFile = async ()=> {
  const resPath = await openFile()
  filePath.value = resPath
}
const clickToggle = async ()=> {
  const isDarkMode = await toggleTheme()
  curTheme.value = isDarkMode ? 'Dark' : 'Light'
}
const clickRest = async ()=> {
  await systemTheme()
  curTheme.value = 'System'
}
</script>
<style scoped>
a {
  color: #42b983;
}
.bold {
  font-weight: bold;
}
</style>
