import fetch from './fetch'

export default {
    //获取跟进类型
    getList(param) { //客户类型列表
        return fetch.get("/api/policyholders?code="+param.code, param);
    }

} 