import axiosInstance from './request';

export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

export async function get<T>(url: string, params?: any,headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, { params,headers:headers });
  return response.data;
}

export async function post<T>(url: string, data?: any,headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.post<ApiResult<T>>(url, data,{headers:headers});
  return response.data;
}

export async function put<T>(url: string, data?: any,headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.put<ApiResult<T>>(url, data,{headers:headers});
  return response.data;
}

export async function del<T>(url: string, params?: any,headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params,headers:headers });
  return response.data;
}

