import axios from 'axios'
import { sendGet, sendPost, sendPut, sendDelete }
from '../../utils/base'
import actionType from "./actionType";
// 登录
export const login = (params) => sendGet("/user/login", params);
// 获取家庭成员列表
export const getFamily = (dispatch,params) => {
    dispatch({
        type:actionType.getFamilyList,
        payload:new Promise(resolve=>{
            debugger;
            sendGet("/user/getUserList", params)
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                resolve(data)
            })
        })
    })
}
