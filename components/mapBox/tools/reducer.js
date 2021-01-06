import {set_toc_data, set_User_Loc_Visible, set_Base_Map, active_Attach_File, select_Map_Object} from './actions';

const maptoolsInit = {
    tocData: [],
    isLocating : false,
    baseMap: 'googleRoad',
    mapSelectedObj : {},
    isFileAttaching: false
}

export const handleMapTools = (state = maptoolsInit, action) =>{
    switch (action.type) {
        case set_toc_data:
            return {...state, tocData: action.data}

        case set_User_Loc_Visible:
            return {...state, isLocating: action.data}

        case set_Base_Map:
            return {...state, baseMap: action.data}

        case select_Map_Object:
            return {...state, mapSelectedObj: action.data}

        case active_Attach_File:
            return {...state, isFileAttaching: action.data}
            
        default:
            return state
    }
}

