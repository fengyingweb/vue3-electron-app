/**
 * 脱离客户端 使用浏览器打开窗口
 */
export const useOpenByBrowser=()=>{
    const openByBrowser= async (url)=>{
        const res = await window.electronAPI.openByBrowser(url)
        return res
    }
    return {
        openByBrowser
    }
}
