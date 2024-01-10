import request from './request'

// 注册
export function register(params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: params
  })
}

// 登录
export function login(params) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: params
  })
}
