import Axios from "axios";

import { AxiosResponse, AxiosError } from 'axios'
import { getToken, removeToken } from '@/utils/token';

export const isDev = process.env.NEXT_PUBLIC_DEPLOY_MODE === 'development'
export const API_PREFIX = isDev ? 'https://api-beta.dansungbee.com' : 'https://api.dansungbee.com'
// export const API_PREFIX = 'http://192.168.0.237:3071'
// export const API_PREFIX = 'http://192.168.0.237:3070'

// export const API_PREFIX = 'http://192.168.0.143:3071'

/**
 * postRequest()
 * : axios post 요청 + 토큰 제외
 * @param {string} urlPath 요청 주소
 * @param {object} data json 혹은 form 데이터
 * @returns 리턴데이터
 */
export const postRequest = async (urlPath: string, data: object): Promise<any> => {
  const returnValue = await Axios.post(API_PREFIX + urlPath, data)
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * deleteRequest()
 * : axios delete 요청 + 토큰 제외
 * @param {string} urlPath 요청 주소
 * @param {object} data json 혹은 form 데이터
 * @returns 리턴데이터
 */
export const deleteRequest = async (urlPath: string, data: object): Promise<any> => {
  const returnValue = await Axios.delete(API_PREFIX + urlPath, data)
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * getRequest()
 * axios get 요청 + 토큰 제외
 * @param {string} urlPath 요청 주소
 * @returns 리턴데이터
 */
export const getRequest = async (urlPath: string) => {
  const returnValue = await Axios.get(API_PREFIX + urlPath)
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * postRequestWithToken()
 * : axios post 요청 + 토큰 포함
 * @param {string} urlPath 요청 주소
 * @param {object} data json 혹은 form 데이터
 * @param {string} token 토큰값
 * @returns 리턴데이터
 */
export const postRequestWithToken = async (urlPath: string, data: object, token: string): Promise<any> => {
  const returnValue = await Axios.post(API_PREFIX + urlPath,
    data,
    { 'headers': { 'Authorization': "Bearer " + token } }
  )
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * putRequestWithToken()
 * : axios put 요청 + 토큰 포함
 * @param {string} urlPath 요청 주소
 * @param {object} data json 혹은 form 데이터
 * @param {string} token 토큰값
 * @returns 리턴데이터
 */
export const putRequestWithToken = async (urlPath: string, data: object, token: string): Promise<any> => {
  const returnValue = await Axios.put(API_PREFIX + urlPath,
    data,
    { 'headers': { 'Authorization': "Bearer " + token } }
  )
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * deleteRequestWithToken()
 * : axios delete 요청 + 토큰 포함
 * @param {string} urlPath 요청 주소
 * @param {object} data json 혹은 form 데이터
 * @param {string} token 토큰값
 * @returns 리턴데이터
 */
export const deleteRequestWithToken = async (urlPath: string, data: object, token: string): Promise<any> => {
  const returnValue = await Axios.delete(API_PREFIX + urlPath,
    {
      headers: {
        Authorization: "Bearer " + token
      },
      data,
    }
  )
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * getRequestWithToken()
 * : axios get 요청 + 토큰 포함
 * @param {string} urlPath 요청 주소
 * @param {string} token 토큰값
 * @returns 리턴데이터
 */
export const getRequestWithToken = async (urlPath: string, token: string): Promise<any> => {

  const returnValue = await Axios.get(API_PREFIX + urlPath, { 'headers': { 'Authorization': "Bearer " + token } })
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}

/**
 * signCheck()
 * : 토큰으로 올바른 계정인지 확인
 * @returns true, false
 */
export const signCheck = async (recvToken?: string) => {
  const curToken = recvToken !== undefined ? recvToken : getToken()
  if (curToken === '') return false;

  const returnValue = await Axios.get(API_PREFIX + '/oauth/me', { 'headers': { 'Authorization': "Bearer " + curToken } })
    .then(function (response: AxiosResponse) {
      if (response.status === 200) {
        if (response.data.userStatus !== 'ACTIVE') {
          removeToken()
          return false;
        }
        return true;
      }
      return false;
    })
    .catch(function (error: AxiosError) {
      // if (error.response === undefined) {
      //   alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
      // }
      return false
    })

  return returnValue;
}


/**
 * postImageRequestWithToken()
 * : axios post 요청 + image 업로드 + 토큰 포함
 * @param {object} formData json 혹은 form 데이터
 * @param {string} token 토큰값
 * @returns 리턴데이터
 */
export const postImageRequestWithToken = async (formData: object, token: string): Promise<any> => {
  const urlPath = "/images"
  const returnValue = await Axios.post(API_PREFIX + urlPath,
    formData,
    {
      'headers': {
        'Authorization': "Bearer " + token
      }
    }
  )
    .then(function (response: AxiosResponse) {
      return response
    })
    .catch(function (error: AxiosError) {
      if (error.response === undefined) {
        // alert("죄송합니다. 일시적인 서버오류입니다.\n\n" + JSON.stringify(error))
        return null
      }
      return error.response
    })

  return returnValue
}
