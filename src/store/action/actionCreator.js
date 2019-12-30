import axios from 'axios'
import { sendGet, sendPost, sendPut, sendDelete }
from '../../utils/base'
console.log(axios)
let prefix = 'http://121.36.255.210:8080/admin'
// 登录
export const login = (params) => sendGet(prefix+"/user/login", params);
// 获取家庭成员列表
export const getFamily = (params) => sendGet(prefix+"/user/getUserList", params);
