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
                document.body.className = 'dark';
                // document.documentElement.style.setProperty('--dark-bg-color','red')
              }else{
                console.log('323213')
                document.body.className = '';
                // document.documentElement.style.setProperty('--dark-bg-color','red')
              }
            console.log(isDarkMode.value)
    })
}