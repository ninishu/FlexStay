import { defineStore } from "pinia";
import { getHomeHotSuggests, getCategories, getHomeHouseList} from '@/services';

const useHomeStore = defineStore("home",{
    state:()=>({
        hotSuggests:[],
        categories:[],
        houselist:[],
        currentList:1
    }),
    actions:{
        async fetchHotSuggestData(){
           const res = await getHomeHotSuggests()
           this.hotSuggests = res.data
        },

        async fetchCategoriesData(){
            const res = await getCategories()
            this.categories = res.data
        },

        async fetchHouseListData(){
            const res = await getHomeHouseList(this.currentList)
            this.houselist.push(...res.data)
            this.currentList++
        }
    }
})

export default useHomeStore