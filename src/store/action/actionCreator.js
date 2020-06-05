// import axios from 'axios'
// import React,{Component,Fragment} from 'react';
import { sendGet, sendPost, sendPut, sendDelete }
from '../../utils/base'
// import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// import { history } from 'react-router'
import actionType from "./actionType";
// 登录
export const login = (params) => sendPost("/admin/user/login", params);
/************************家庭管理****** */
// 获取家庭成员列表
export const getFamily = (dispatch, params) => {
    dispatch({
        type: actionType.getFamilyList,
        payload: new Promise(resolve => {
            sendGet("/admin/user/getUserList", params)
                .then((res) => {
                    if (res.ok) {
                        resolve(res)
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
                    if (res.ok) {
                        resolve(res)
                    }
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
                    if (res.ok) {
                        resolve(res);
                        getFamily(dispatch);
                    }
                })
        })
    })
};
//家庭成员删除
export const deleteFamily = (params) => sendPost("/admin/user/del", params);
// 新增成员
export const addFamily = (params) => sendPost("/admin/user/add", params);

/*********************分类管理*****************/
//获取大类列表
export const getBig = (params) => sendPost('/admin/type/getBillTypes', params);
//新增大类
export const addBig = (params) => sendPost('/admin/type/add', params);
//修改大类
export const updateBig = (params) => sendPost('/admin/type/update', params);
//删除大类
export const deleteBig = (params) => sendPost('/admin/type/del', params);
//获取小类列表
export const getSmall = (params) => sendPost('/admin/type/getTypeAndCategoryList', params);
//新增小类
export const addSmall = (params) => sendPost('/admin/category/add', params);
//删除小类
export const deleteSmall = (params) => sendPost('/admin/category/del', params);
//修改小类
export const updateSmall = (params) => sendPost('/admin/category/update', params);
//根据大类id获取小类
export const getSmallByBig = (params) => sendPost('/admin/category/getCategoryListByTypeId', params);

/*******************************账单管理*****************/
//获取账单列表
export const getBillList = (params) => sendPost('/admin/bill/list', params);
//根据billId获取账单详情
export const billDetails = (params) => sendPost('/admin/bill/getBillByBillId', params);
//删除账单
export const deleteBill = (params) => sendPost('/admin/bill/del', params);
//新增账单
export const addBill = (params) => sendPost('/admin/bill/add', params);
//修改账单
export const updateBill = (params) => sendPost('/admin/bill/update', params);