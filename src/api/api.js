/**
 * @Author: Created By McChen
 * @Date: 2019/3/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

import axios from 'axios'

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/'

export const api = {
	topics: '/topics',
	topic: '/topic/'
}

export const Axios = axios.create()

Axios.interceptors.response.use(response => {
	return response.data
}, error => {
	alert('网络异常')
	return Promise.reject(error)
})