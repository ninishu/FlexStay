import axios from 'axios'
import {BASE_URL, TIMEOUT} from './config.js'
import useMainStore from "@/stores/modules/main.js"

const mainStore = useMainStore()

class myRequest{
    constructor(baseURL, timeout=0){
        this.instance = axios.create({
            baseURL,
            timeout
        })

        this.instance.interceptors.request.use(config=>{
            mainStore.isShowLoading = true
            return config
        },err=>{
            mainStore.isShowLoading = true
            return err
        })

        this.instance.interceptors.response.use(res=>{
            mainStore.isShowLoading = false
            return res
        },err=>{
            mainStore.isShowLoading = false
            return err
        })
    }

    request(config){
        return new Promise((resolve,reject)=>{
            this.instance.request(config).then(res=>{
                // axios请求的数据在res.data中
                // 这里写了拦截后，不用每次都写res.data
                resolve(res.data)  
            }).catch(err=>{
                reject(err)
            })
        })
    }

    get(config){
        return this.request({...config,method:"get"})
    }

    post(config){
        return this.request({...config,method:"post"})
    }

}

// 别忘了导出
export default new myRequest(BASE_URL,TIMEOUT)