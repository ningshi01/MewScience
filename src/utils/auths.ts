import Cookies from "js-cookie";
 
 
export function getToken(id:any) {
  return Cookies.get(id); //获取键名为Admin-Token的值
}
 
export function setToken(id:any,token:any) {
  return Cookies.set(id, token); //设置键名Admin-Token，值为token
}
 
export function removeToken(id:any) {
  return Cookies.remove(id); //移除键名为Admin-Token的值
}