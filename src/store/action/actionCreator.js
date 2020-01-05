import axios from 'axios'
import { sendGet, sendPost, sendPut, sendDelete }
from '../../utils/base'
import actionType from "./actionType";
// 登录
export const login = (params) => sendPost("/admin/user/login", params);
// 获取家庭成员列表
export const getFamily = (dispatch, params) => {
    dispatch({
        type: actionType.getFamilyList,
        payload: new Promise(resolve => {
            sendGet("/admin/user/getUserList", params)
                .then((res) => {
                    if (res.ok) {
                        resolve(res)
                    } else {
                        console.log(this)
                        this.props.history.push({ path: '/login' })
                    }

                })
        })
    })
};
// 获取家庭成员详情
export const detailFamily = (dispatch, params) => {
    dispatch({
        type: actionType.detailFamily,
        payload: new Promise(resolve => {
            sendPost("/admin/user/getUserInfoByUserId", params)
                .then((res) => {
                    resolve(res)
                })
        })
    })
};
// 修改家庭成员信息
export const updateFamily = (dispatch, params) => {
    dispatch({
        type: actionType.updateFamily,
        payload: new Promise(resolve => {
            sendPost("/admin/user/update", params)
                .then((res) => {
                    console.log(res);
                    if (res.ok) {
                        getFamily(dispatch);
                        resolve(res);
                    }
                })
        })
    })
};
//家庭成员删除
export const deleteFamily = (params) => sendPost("/admin/user/del", params);
// 新增成员
export const addFamily = (params) => sendPost("/admin/user/add", params);