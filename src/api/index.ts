import { isAwaitKeyword } from 'typescript'
import { get,post,del,put } from '../utils/api'
import {setToken,getToken,removeToken} from '../utils/auths.js'

// #region account
//用户注册
export const accountRegister = async (params:any) => {
    const data:any = await post('/account/register', params)
    return data
}
//用户登录
export const accountLogin = async (params:any) => {
    removeToken("sessionid")
    const data:any = await post('/account/login', params)
    return data
}
//用户登出
export const accountLogout = async (params:any) => {
    const data:any = await get('/account/logout')
    removeToken("sessionid")
    removeToken("csrftoken")
    return data
}
//根据id查询用户信息
export const queryAccountInfo = async (params:any) => {
    const data:any = await get('/account/info',params)
    return data
}
//查询当前用户信息
export const queryAccountSelfInfo = async (params:any) => {
    const data:any = await get('/account/self-info')
    return data
}
// #endregion

// #region science
//综合查询文献
export const queryScienceWorks = async (params:any) => {
    const data:any = await get('/science/works',params)
    return data
}
//综合查询科研人员
export const queryScienceAuthors = async (params:any) => {
    const data:any = await get('/science/authors',params)
    return data
}
//查询机构信息
export  const queryScienceInsitutions = async (params:any) => {
    const data:any = await get('/science/institutions',params)
    return data
}
//根据id查询文献详情
export const queryScienceWorkDetail = async (params:any) =>{
    const data:any = await get('/science/work',params)
    return data
}
//高级查询文献
export const queryScienceWorks_Advanced = async (params:any) => {
    const data:any = await post('/science/works/advanced',params)
    return data
}
//查询领域
export const queryScienceConcepts = async (params:any) => {
    const data:any = await get('/science/concepts',params)
    return data
}
//查询门户
export const queryScienceResearchers = async (params:any) => {
    const data:any = await get('/science/researchers',params)
    return data
}
//获取热门领域/期刊会议/学者/机构
export const queryScienceHot = async (params:any) => {
    const data:any = await get('/science/hot',params)
    return data
}
// #endregion
//获取门户信息
export const getScholarData = async (params: any) => {
    const data:any = await get('/science/researchers', params)
    return data
}
export const getApplication = async (params :any)=>{
    const data:any =await get('/admin/portal/applications/get',params)
    return data
}
export const getCurrentUserInfo = async () =>{
    const data:any = await get('/account/self-info')
    return data
}
//门户认领
export const claimSubmit = async (params: any) => {
    const data:any = await post('/portal/claim', params, { 'Content-type': 'multipart/form-data'})
    return data
}
export const getPaperAndRelated = async (params: any) => {
    const data:any = await get('/science/researchers/related', params)
    return data
}
//获取期刊信息
export const getJournalData = async (params: any) => {
    const data:any = await get('/science/sources', params)
    return data
}
//获取领域信息
export const getFieldDate = async (params: any) => {
    const data:any = await get('/science/concepts', params)
    return data
}

export const processApplication = async(params:any)=>{
    const data:any = await put('/admin/portal/applications/update',params)
    return data
}
export const getApplicationList = async () =>{
        const data:any = await get('/admin/portal/applications/list')
        return data
}

export const updateIntro = async (params:any)=>{
    const data:any =await put('/account/update-intro',params)
    return data
}
export const getAccountFollowList = async ()=>{
    const data:any = await get('/account/follow-list')
    return data
}
export const getAccountWorkCollection = async () =>{
    const data:any = await get('/account/works/collection')
    return data
}
//取消订阅
export const unFollow = async (params:any) =>{
    const data:any = await put('/portal/unfollow',params)
    return data
}
//订阅门户
export const followScholarPage = async (params : any)=>{
    const data:any = await put('/portal/follow',params)
    return data
}
//收藏文献
export const starWork = async (params:any)=>{
    const data:any = await get('/account/works/collect',params)
    return data
}
//取消收藏
export const unStarWork = async (params:any)=>{
    const data:any = await get('/account/works/collect/cancel',params)
    return data
}
export const getPatent = async (params:any)=>{
    const data:any = await get('/additional/patent/id',params)
    return data
}
export const getAward = async (params:any)=>{
    const data:any = await get('/additional/reward/id',params)
    return data
}
export const getProject = async (params:any)=>{
    const data:any = await get('/additional/project/id',params)
    return data
}
export const removeStar = async (params:any) => {
    const data:any = await get('/account/works/collect/cancel',params)
    return data
}
export const addStar = async (params:any) => {
    const data:any = await get('/account/works/collect',params)
    return data
}
export const getStar = async (params:any)=>{
    const data:any = await get('/account/works/collected',params)
    return data
}
export const followScholar = async (params:any) => {
    const data:any = await put('/portal/follow',params)
    return data
}
export const unfollowScholar = async (params:any) => {
    const data:any = await put('/portal/unfollow',params)
    return data
}
export const whoAmI = async (params:any) => {
    const data:any = await get('/account/self-info')
    return data
}
export const getMessage = async () => {
    const data:any = await get('/message/messages/list')
    return data
}
export const hasReadMessage = async(params:any)=>{
    const data:any = await put('/message/messages/update-status',params)
    return data
}
export const handlePatent = async(params:any)=>{
    const data:any = await put('/additional/patents/process_trans',params)
    return data
}
export const handleReward= async(params:any)=>{
    const data:any = await put('/additional/rewards/process_trans',params)
    return data
}
export const handleProject= async(params:any)=>{
    const data:any = await put('/additional/projects/process_trans',params)
    return data
}