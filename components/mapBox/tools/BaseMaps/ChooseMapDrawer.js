import React from 'react';
import DrawerItem from '../../../Drawers/drawerItem';
import {changeBaseMap} from '../actions';
import {openCloseDrawer} from '../../../Drawers/actions';
import {connect} from 'react-redux';
import ToggleView from '../../../ui/toggleView';

function ChooseMapInDrawer(props){
    function change(name){
        changeBaseMap(name);
        openCloseDrawer(false);
    }
    function checkActive(name){
        if(name === props.mapName){
            return true
        }else{
            return false
        }
    }
    return(
        <ToggleView
            noPadding
            title="انتخاب نقشه پایه"
            RightIcon="map"
            RightIconType="entypo"
        >
            <DrawerItem onPress={()=>{change('mapbox')}} Active={checkActive('mapbox')} Label="مپ باکس" RightIcon={{name: "mapbox", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('googleRoad')}} Active={checkActive('googleRoad')} Label="گوگل" RightIcon={{name: "google-maps", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('googleSat')}} Active={checkActive('googleSat')} Label="گوگل هوایی" RightIcon={{name: "google-maps", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('bingRoad')}} Active={checkActive('bingRoad')} Label="بینگ" RightIcon={{name: "bing", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('bingSat')}} Active={checkActive('bingSat')} Label="بینگ هوایی" RightIcon={{name: "bing", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('bingSatTag')}} Active={checkActive('bingSatTag')} Label="بینگ هوایی با تگ" RightIcon={{name: "bing", type: "material-community"}}/>
            <DrawerItem onPress={()=>{change('osm')}} Active={checkActive('osm')} Label="OpenStreetMap" RightIcon={{name: "map", type: "entypo"}}/>
            <DrawerItem onPress={()=>{change('CustomMap')}} Active={checkActive('CustomMap')} Label="فقط ایران" RightIcon={{name: "map", type: "material-community"}}/>
        </ToggleView>
    )
}

const mapStateToProps = state =>{
    return{
        mapName: state.handleMapTools.baseMap
    }
}
export default connect(mapStateToProps)(ChooseMapInDrawer);