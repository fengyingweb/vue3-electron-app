import { defineStore } from 'pinia'
import { useCache } from '@/hooks/useCache.js'

const { webCache } = useCache('localStorage')

export const useAppStore = defineStore('app', {
  state: ()=> {
    return {
      isCollapse: false,
      breadCrumbList: webCache.get('breadCrumbList') ? webCache.get('breadCrumbList') : [],
      isDarkMode: webCache.get('isDarkMode') ? webCache.get('isDarkMode') : false,
    }
  },
  actions: {
    // 设置主题切换
    setDark(isDark){
      this.isDarkMode = isDark
      webCache.set('isDarkMode', this.isDarkMode)
    },
    // 设置菜单合并
    setCollapse(bool) {
      this.isCollapse = bool
    },
    // 设置面包屑路由展示
    setBreadCrumbList(data, action){
        if(action === 'route'){
            const newData=[...this.breadCrumbList]
            const filterData = newData.map((item)=>{
                if(item.type !== 'route'){
                    return {...item}
                }
            }).filter(item=>item !== undefined)
            this.breadCrumbList=[data, ...filterData]
        }else{
            this.breadCrumbList.push(data)
        }
        webCache.set('breadCrumbList',this.breadCrumbList)
    }
  }
})
