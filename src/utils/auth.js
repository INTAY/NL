import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return window.localStorage.getItem('token');
}
export function getAppKey() {
  return window.localStorage.getItem('appkey');
}
export function getSubSysId() {
  return window.localStorage.getItem('subSysId');
}
export function getUrl() {
  return window.localStorage.getItem('url');
}
export function getlanguage() {
  return window.localStorage.getItem('language');
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
