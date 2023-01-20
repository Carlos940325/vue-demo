import { serve } from "./service";
const GaodeKey = '0fc9b34be1a122d305f2f4005764be9d'
export async function getWeather(params){
    return serve.get(`restapi.amap.com/v3/weather/weatherInfo?key=${GaodeKey}&city=${params}&extensions=all`)
}