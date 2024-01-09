<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>chrome{{versions.chrome}}，electron{{versions.electron}}，node{{versions.node}}</p>
  <div class="item">
    <input class="title-input" type="text" v-model="inputVal">
    <button type="button" @click="clickSetTitle">设置标题</button>
  </div>
  <div class="item">
    <button type="button" @click="clickOpenFile">选择文件</button>
    <span class="bold">{{filePath}}</span>
  </div>
  <div class="item">
    当前主题<span>{{curTheme}}</span>
    <button type="button" @click="clickToggle">切换主题</button>
    <button type="button" @click="clickRest">重置主题</button>
  </div>
  <el-icon size="20" color="#f56">
    <Edit />
  </el-icon>
</template>

<script setup>
import { ref } from 'vue'
console.log(import.meta.env)
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
.item {
  margin: 15px auto;
}
.bold {
  font-weight: bold;
}
.title-input {
  margin-right: 10px;
  border: 1px solid #42b983;
  padding: 0 5px;
  line-height: 30px;
  border-radius: 4px;
}
</style>
