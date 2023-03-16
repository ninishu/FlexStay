import axios from 'axios'
import {BASE_URL, TIMEOUT} from './config.js'

class myRequest{
    constructor(baseURL, timeout=0){
        this.instance = axios.create({
            baseURL,
            timeout
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