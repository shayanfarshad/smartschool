import React from 'react';
import {
    BingRoad,
    BingSat,
    BingSatTag,
    OSM,
    Custom,
    GoogleRoad,
    GoogleSat
}from './generator';

import {connect} from 'react-redux';

function RenderBaseMaps(props){
    return(
        <>
            <GoogleRoad currentMap={props.baseMapName}/>
            <GoogleSat currentMap={props.baseMapName}/>
            <BingRoad currentMap={props.baseMapName}/>
            <BingSat currentMap={props.baseMapName}/>
            <BingSatTag currentMap={props.baseMapName}/>
            <OSM currentMap={props.baseMapName}/>
            <Custom currentMap={props.baseMapName}/>
        </>
    )
}

const mapStateToProps = state =>{
    return{
        baseMapName : state.handleMapTools.baseMap
    }
}
export default connect(mapStateToProps)(RenderBaseMaps);
