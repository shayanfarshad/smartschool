import React from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";

export function VectorLayer({layerId, url, scheme, onPress, layerStyle ,hasOverlay, contractCondition, overlayCondition, overlayStyle}){
    return(
        <MapboxGL.VectorSource
              id={layerId}
              tileUrlTemplates={url} 
              scheme={scheme}
              onPress={onPress? onPress : ()=>{}}
          >
            <MapboxGL.FillLayer
                id={layerId}
                sourceID={layerId}
                sourceLayerID={layerId}
                style={layerStyle ? layerStyle:{
                    fillColor: "blue",
                    fillOutlineColor:"#000"    
                }}
            />
            {/* <MapboxGL.FillLayer
                id={layerId + '-over1'}
                sourceID={layerId}
                sourceLayerID={layerId}
                filter={contractCondition}
                style={{
                    fillColor: 'rgba(21, 56, 224, 0.55)',
                    fillOutlineColor:"#1538e0"
                }}
            /> */}
            {
                hasOverlay? 
                    <MapboxGL.FillLayer
                        id={layerId + '-over'}
                        sourceID={layerId}
                        sourceLayerID={layerId}
                        filter={overlayCondition}
                        style={overlayStyle ? overlayStyle:{
                        fillColor: "blue",
                        fillOutlineColor:"#000"    
                        }}
                /> : null
            }
        </MapboxGL.VectorSource>
    )
}


export function TileLayer({layerId, tileSize, url, onPress,layerStyle}){
    return(
            <MapboxGL.RasterSource
                id={'raster' + layerId}
                tileSize={tileSize? tileSize: 256}
                tileUrlTemplates={url}
                minZoomLevel={0}
                maxZoomLevel={19}
            >
                <MapboxGL.RasterLayer 
                  id={'raster'+ layerId}
                  sourceID={'raster' + layerId}
                  layerStyle={[layerStyle? layerStyle : {}]}
                 />
            </MapboxGL.RasterSource>
    )
}


export function WMSLayer(){

}

export function PointLayer(){

}

export function MapMarker(){

}

export function MakersLayer(){
    
}