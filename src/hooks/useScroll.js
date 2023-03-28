import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

export default function useScroll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    // 滚动监听  使用节流进行优化
    const scrollListenerHandler = throttle(() => {
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight  // 视口高度
            // console.log("test",clientHeight)
            scrollTop.value = document.documentElement.scrollTop  // 滚动出去的距离
            scrollHeight.value = document.documentElement.scrollHeight  // 总高度
        }else{
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
            // console.log("clientHeight",clientHeight.value,"scrollTop",scrollTop.value ,"scrollHeight",scrollHeight.value)
        }

        

        if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
            // console.log("----到达底部----")
            isReachBottom.value = true
        }
    }, 100)

    onMounted(() => {
        if (elRef) el = elRef.value
        // console.log(el)
        el.addEventListener('scroll', scrollListenerHandler)
    })

    onUnmounted(() => {
        el.removeEventListener('scroll', scrollListenerHandler)
    })

    return { isReachBottom, clientHeight, scrollTop, scrollHeight }

}



