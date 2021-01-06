import {ajax} from '../../utils/ajax';

export const getCaptcha = (uuid) =>{
    return ajax(null, `/api/Mobile/Captcha?uuid=${uuid}`,'GET',false)
}

export const authorize = (data) =>{
    return ajax(null, '/api/Mobile/CheckExistMobile','POST',true,data)
}

export const login = (data) =>{
    return ajax(null, '/api/Mobile/Authentication','POST',true,data)
}