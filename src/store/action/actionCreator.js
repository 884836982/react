import axios from 'axios'
import { sendGet, sendPost, sendPut, sendDelete }
from '../../utils/base'
import actionType from "./actionType";
// 登录
export const login = (params) => sendPost("/admin/user/login", params);
// 获取家庭成员列表
export const getFamily = (dispatch,params) => {
    dispatch({
        type:actionType.getFamilyList,
        payload:new Promise(resolve=>{
            sendGet("/api/ding/user/groups", params)
            // .then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                // console.log(data);
                // resolve(data)
            })
        })
    })
}
