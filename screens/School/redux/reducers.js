import {
    set_school_modir_data,
    set_school_main_data,
    set_school_base_data,
    set_school_coords,
    set_school_location_data,
    set_school_desc_data,
    set_school_images
} from './actions';

const initSchool = {
    schoolModirData: {
        Name: '',
        Melli: '',
        Mobile: '',
    },
    schoolMainData: null,
    schoolData: null,
    schoolCoords: null,
    schoolLocation: null,
    schoolDesc: null,
    schoolImages:{
        first: null,
        second: null,
        third: null
    }
};

export const schoolHandle = (state = initSchool, action)=>{
    switch (action.type) {
        
        case set_school_modir_data:
            return {...state, schoolModirData: action.payload}
        
        case set_school_main_data:
            return {...state, schoolMainData: action.payload}

        case set_school_base_data:
            return {...state, schoolData: action.payload}

        case set_school_coords:
            return {...state, schoolCoords: action.payload}
            
        case set_school_location_data:
            return {...state, schoolLocation: action.payload}
            
        case set_school_desc_data:
            return {...state, schoolDesc: action.payload}

        case set_school_images:
            return {...state, schoolImages: action.payload}
            
        default:
            return state
    }
};
