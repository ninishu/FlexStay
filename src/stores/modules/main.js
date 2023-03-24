import { defineStore } from "pinia";
const nowDate = new Date()  // 今天
const nextDate = new Date()
// 第二天  setDate的返回值是时间戳 这样设置后nextDate表示默认格式的第二天
nextDate.setDate(new Date().getDate() + 1)

const useMainStore = defineStore("main",{
    state:()=>({
        token:"",
        isShowLoading:false,
        nowDate,
        nextDate
    }),
    actions:{

    }
})

export default useMainStore