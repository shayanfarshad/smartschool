import store from '../../../store/store';

export const set_User_Loc_Visible = 'set_User_Loc_Visible';
export const set_Base_Map = 'set_Base_Map';
export const select_Map_Object = 'select_Map_Object';
export const active_Attach_File = 'active_Attach_File';
export const set_toc_data = 'set_toc_data';

export function setUserLocIcoVis(command){
    store.dispatch({type: set_User_Loc_Visible, data: command})
}

export function changeBaseMap(command){
    store.dispatch({type: set_Base_Map, data: command})
}

export function setSelectedMapObject(obj){
    store.dispatch({type: select_Map_Object, data: obj})
}

export function setAttachingActive(command){
    store.dispatch({type: active_Attach_File, data: command})
}

export function SetTocData(data){
    store.dispatch({type: set_toc_data, data: data})
}