// stores/app.ts
import { defineStore } from 'pinia'
import { login, register } from '@/http/api.js'

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            loginSetting:{
                autoLogin:false,
                rememberPassword:false,
            }
        }
    },
    actions: {
        setLoginSetting(e) {
            const bol = this.loginSetting[e]
            this.loginSetting[e] = !bol
            console.log(this.loginSetting)
        },
        async goLogin(userInfo) {
          const params = {
            ...userInfo
          }
          try {
            const res = await login(params)
            return res
          } catch (err) {
            console.log(err)
          }
        },
        async goRegister(userInfo) {
          const params = {
            ...userInfo
          }
          try {
            const res = await register(params)
            return res
          } catch (err) {
            console.log(err)
          }
        }
    },
})
