const isDev = process.env.REACT_APP_DEPLOY_MODE === 'development'
export const DAT = isDev ? 'DAT_Beta' : 'DAT'

/**
 * getToken()
 * : 토큰 저장한것 가져오는 
 * @returns 토큰값 
 */
 export const getToken = () => {
    let tokenFromLS = localStorage.getItem(DAT)
    let tokenFromSS = sessionStorage.getItem(DAT)
    let returnToken = ""

    if (tokenFromLS !== null) {
        returnToken = tokenFromLS
    } else {
        if (tokenFromSS !== null) {
            returnToken = tokenFromSS
        } else {
            returnToken = ""
        }
    }

    return returnToken;
}

/**
 * setToken()
 * : 토큰 저장하는 함수
 * @param {string} tokenFromSS 토큰값
 * @returns X
 */
export const setToken = (tokenFromSS: any, isSignMaintain?: boolean) => {
    removeToken()
    if (isSignMaintain !== undefined && isSignMaintain === true) {
        localStorage.setItem(DAT, tokenFromSS);
    } else {
        sessionStorage.setItem(DAT, tokenFromSS);
    }
}

/**
 * removeToken()
 * : 토큰을 삭제하는 함수
 * @returns X
 */
export const removeToken = () => {
    localStorage.removeItem(DAT);
    sessionStorage.removeItem(DAT);
}
