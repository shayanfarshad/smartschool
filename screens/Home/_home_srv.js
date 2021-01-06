import {ajax} from '../../utils/ajax';

export const getSchoolsList = () =>{
    return ajax('tokenJson', '/api/Mobile/GetAllSchoolByManagerMobile', 'POST', false)
}