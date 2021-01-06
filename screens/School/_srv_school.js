import {ajax} from '../../utils/ajax';


export const getOstan = () =>{
    return ajax('tokenJson', `/api/Mobile/GetAllOstanName`, 'POST', false)
}
export const getShahrestan = (amarcode) =>{
    return ajax('tokenJson', `/api/Mobile/GetAllShahrestanName?amarcode=${amarcode}`, 'GET', false)
}
export const getBakhsh = (amarcode) =>{
    return ajax('tokenJson', `/api/Mobile/GetAllBakhshName?amarcode=${amarcode}`, 'GET', false)
}
export const getDehestan = (amarcode) =>{
    return ajax('tokenJson', `/api/Mobile/GetAllDehestanName?amarcode=${amarcode}`, 'GET', false)
}
export const getAbadi = (amarcode) =>{
    return ajax('tokenJson', `/api/Mobile/GetAllAbadiName?amarcode=${amarcode}`, 'GET', false)
}

export const getAllCity = (amarcode) =>{
    return ajax('tokenJson', `/api/Mobile/GetAllCityName?amarcode=${amarcode}`, 'GET', false)
}


export const getSchoolData = (mainCode,data) =>{
    var item = new Object();
    item.pcode = data
    return ajax('tokenJson', `/api/Mobile/GetSchoolByMainCode`, 'POST', true,item)
}


export const saveForm = (form) =>{
    return ajax('tokenFormData', '/api/Mobile/SaveForm', 'POST', true, form)
}
