import Qs from 'qs'

export const convertParam = (params:any) => {
    return Qs.stringify(params,{arrayFormat : 'repeat'})
}