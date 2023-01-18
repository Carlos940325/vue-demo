import { serve } from "./service";

export async function getExpressDetail(params){
    return serve.get(`api.vvhan.com/api/kuaidi`,{
        params: {
            ...params
        }
    })
}