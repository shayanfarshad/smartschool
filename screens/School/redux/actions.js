export const set_school_modir_data = 'set_school_modir_data';
export const set_school_main_data = 'set_school_main_data';
export const set_school_base_data = 'set_school_base_data';
export const set_school_coords = 'set_school_coords';
export const set_school_location_data = 'set_school_location_data';
export const set_school_desc_data = 'set_school_desc_data';
export const set_school_images = 'set_school_images';

export const setSchoolModirData = (data) => ({
    type: set_school_modir_data, payload: data
  });
  
export const setSchoolMainData = (data) => ({
    type: set_school_main_data, payload: data
  });
export const setSchoolData = (data) => ({
    type: set_school_base_data, payload: data
  });
export const setSchoolCoords = (data) => ({
    type: set_school_coords, payload: data
  });
  
export const setSchoolLocationData = (data) => ({
    type: set_school_location_data, payload: data
  });
  
export const setSchoolDescData = (data) => ({
    type: set_school_desc_data, payload: data
});
  
export const setSchoolImages = (data) => ({
   
    type: set_school_images, payload: data
});
  
  