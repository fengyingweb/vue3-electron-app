import {onMounted, ref, watchEffect} from 'vue'
import {routes} from '@/router/index.js'
import router from "@/router/index.js"
import {useAppStore} from "@/store/app";

export const wacthRouter=(location)=>{
    let currenPath=ref('/')
    let menuList = ref([])
    const appStore = useAppStore()

    onMounted(()=>{
        menuList.value=routes.filter((item=>{
            return !item.hidden
        }))
        if(appStore.breadCrumbList.length===0){
            const data={
                title:router?.currentRoute?.value?.meta?.title,
                path:router?.currentRoute?.value?.path,
                showClose:false,
                type:'route'
            }
            appStore.setBreadCrumbList(data,'route')
        }
    })
    watchEffect(()=>{
        // const index=menuList.value[0]?.children?.findIndex((item:any)=>{
        //     return item.path===router?.currentRoute.value.path
        // })
        // if(index!==undefined){
        //     currenPath.value=index
        // }
        if(location==='menu'){
            if(router?.currentRoute.value.path && router?.currentRoute.value.path!=='/news'){
                currenPath.value=router?.currentRoute.value.path
            }
        }else{
            if(router?.currentRoute.value.path){
                currenPath.value=router?.currentRoute.value.path
            }
        }

    })
    return {
        currenPath,
        menuList
    }
}