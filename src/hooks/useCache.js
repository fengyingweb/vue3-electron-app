import WebStorageCache from 'web-storage-cache'
export const useCache = (type = 'sessionStorage') => {
  const webCache = new WebStorageCache({
    storage: type
  })

  return {
    webCache
  }
}
