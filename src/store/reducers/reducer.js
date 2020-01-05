import actionType from "../action/actionType"
// import React,{Component,Fragment} from 'react';
// import { Fragment } from "react"
const defaultState = {
    data: [],
    familyNickName: '',
    familyBalance: null,
    Detail:{
        name:'',
        sex:'',
        passWord:'',
        birthday:'',
        phone:'',
        mark:''
    },
}
export default (state = defaultState, action) => {
    switch (action.type) {
        //获取家庭成员列表
        case `${actionType.getFamilyList}_FULFILLED`:
            let data = {...state };
            data.familyBalance = action.payload.data1.familyBalance;
            data.familyNickName = action.payload.data1.familyNickName;
            data.data = action.payload.data;
            return data;
        // //删除家庭成员
        // //修改家庭成员
        case `${actionType.detailFamily}_FULFILLED`:
            let detail = {...state};
            detail.Detail = action.payload.data;
            return detail;
            
    }
    return state
}