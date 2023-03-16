import myrequest from "../request"
export function getHomeHotSuggests(){
    return myrequest.get({
        url:"/home/hotSuggests"
    })
}