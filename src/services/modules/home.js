import myrequest from "../request"
export function getHomeHotSuggests(){
    return myrequest.get({
        url:"/home/hotSuggests"
    })
}

export function getCategories(){
    return myrequest.get({
        url:"/home/categories"
    })
}

export function getHomeHouseList(currentList){
    return myrequest.get({
        url:"/home/houselist",
        params:{
            page:currentList
        }
    })
}