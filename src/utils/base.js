import http from './http';
import React from 'react'
import axios from 'axios'
console.log(React)
/**
 * Get请求
 * @param { String } url
 * @param { Object } params
 */
export function sendGet(url, params = {}) {
//   Vue.loading.on();
console.log(url);
  return http.get(url, { params }).then(response => {
    // Vue.loading.off();
    return response.data;
  }).catch(() => {
    // Vue.loading.off();
  });
}
/**
 * Post 请求
 * @param { String } url
 * @param { Object } data
 */
export function sendPost(url, data) {
//   Vue.loading.on()
  return http.post(url, data).then(response => {
    // Vue.loading.off()
    return response.data;
  }).catch((err) => {
    // Vue.loading.off()
  });
}

/**
 * Put 请求
 * @param { String } url
 * @param { Object } data
 */
export function sendPut(url, data) {
  return http.put(url, data).then(response => {
    return response.data;
  });
}

/**
 * Patch 请求
 * @param { String } url
 * @param { Object } data
 */
export function sendPatch(url, data) {
  return http.patch(url, data).then(response => {
    return response.data;
  });
}

/**
 * Delete请求
 * @param { String } url
 * @param { Object } params
 */
export function sendDelete(url, params) {
  return http.delete(url, { params }).then(response => {
    return response.data;
  });
}

/**
 * All 请求
 * @param iterable 是一个可以迭代的参数如数组等
 * @param callback 要等到所有请求都完成才会执行
 */
export function sendAll(iterable, callback) {
  return axios.all(iterable).then(axios.spread(callback));
}