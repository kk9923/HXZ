/**
 * Created by marno on 2017/1/19
 * Function:JSON转换工具类
 * Desc:
 */

export default class JsonUtil {

    /**
     * JSON对象转字符串
     * @param jsonObj JSON对象
     */
    static jsonToString(jsonObj){
        return JSON.stringify(jsonObj);
    }

    /**
     * 字符串转JSON字符串
     * @param jsonStr JSON字符串
     */
    static stringToJson(jsonStr){
        return JSON.parse(jsonStr);
    }
    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
     */
    static strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }
    /**
     *map转换为json
     */
    static mapToJson(map) {
        return JSON.stringify(this.strMapToObj(map));
    }
    /**
     *对象转换为Map
     */
    static  objToStrMap(obj){
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k,obj[k]);
        }
        return strMap;
    }
    /**
     *json转换为map
     */
    static jsonToMap(jsonStr){
        return  this.objToStrMap(JSON.parse(jsonStr));
    }
}