const loadAssetURL = (img)=>{
    // 参数一：从当前路径找到资源的相对路径 
    // 参数二：当前路径的URL
    return new URL(`../assets/img/${img}`,import.meta.url).href
}
export default loadAssetURL