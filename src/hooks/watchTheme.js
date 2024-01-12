import {computed, watchEffect} from 'vue'
import {useAppStore} from '@/store/app.js'
export const watchTheme = () =>{
    const appStore = useAppStore()
    let isDarkMode = computed(()=>{
        return appStore.isDarkMode
    })
    watchEffect(()=>{
        if(isDarkMode.value){
            console.log('223')
            document.body.classList.add('dark')
        }else{
            console.log('323213')
            document.body.classList.remove('dark')
        }
        console.log(isDarkMode.value)
    })
    window.electronAPI?.setTheme(isDarkMode.value ? 'dark' : 'light')
}
