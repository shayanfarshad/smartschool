import React from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";

export function BingRoad({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'bingRoad'}
            tileSize={256}
            tileUrlTemplates={[
                "https://ecn.t0.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t1.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t2.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t3.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill"
            ]}
            minZoomLevel={0}
            maxZoomLevel={19}
        >
            <MapboxGL.RasterLayer
                id={'bingRoadLayer'}
                sourceID={'bingRoad'}
                style={{
                    visibility: currentMap === 'bingRoad' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}
export function BingSat({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'bingSat'}
            tileSize={256}
            tileUrlTemplates={[
                'https://ecn.t0.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
                'https://ecn.t1.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
                'https://ecn.t2.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
                'https://ecn.t3.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
            ]}
            minZoomLevel={0}
            maxZoomLevel={19}
        >
            <MapboxGL.RasterLayer
                id={'bingSatLayer'}
                sourceID={'bingSat'}
                style={{
                    visibility: currentMap === 'bingSat' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}
export function BingSatTag({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'bingSatTag'}
            tileSize={256}
            tileUrlTemplates={[

                "https://ecn.t0.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t1.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t2.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill",
                "https://ecn.t3.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=8122&mkt=en-us&shading=hill"
            ]}
            minZoomLevel={0}
            maxZoomLevel={19}
        >
            <MapboxGL.RasterLayer
                id={'bingSatTagLayer'}
                sourceID={'bingSatTag'}
                style={{
                    visibility: currentMap === 'bingSatTag' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}

export function OSM({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'osm'}
            tileSize={256}
            tileUrlTemplates={["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"]}
            minZoomLevel={0}
            maxZoomLevel={22}
        >
            <MapboxGL.RasterLayer
                id={'osmLayer'}
                sourceID={'osm'}
                style={{
                    visibility: currentMap === 'osm' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}

export function Custom({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'CustomMap'}
            tileSize={256}
            tileUrlTemplates={["http://81.91.156.118:3832/{z}/{x}/{y}.png"]}
            minZoomLevel={0}
            maxZoomLevel={22}
        >
            <MapboxGL.RasterLayer
                id={'CustomMapLayer'}
                sourceID={'CustomMap'}
                style={{
                    visibility: currentMap === 'CustomMap' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}

export function GoogleRoad({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'googleRoad'}
            tileSize={256}
            tileUrlTemplates={["https://mt.google.com/vt/lyrs=m&hl=fa&gl=fa&x={x}&y={y}&z={z}&s=png"]}
            minZoomLevel={0}
            maxZoomLevel={19}
        >
            <MapboxGL.RasterLayer
                id={'googleRoadLayer'}
                sourceID={'googleRoad'}
                style={{
                    visibility: currentMap === 'googleRoad' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}
export function GoogleSat({currentMap}) {
    return (
        <MapboxGL.RasterSource
            id={'googleSat'}
            tileSize={256}
            tileUrlTemplates={["https://mt.google.com/vt/lyrs=s&hl=fa&gl=fa&x={x}&y={y}&z={z}&s=png"]}
            minZoomLevel={0}
            maxZoomLevel={19}
        >
            <MapboxGL.RasterLayer
                id={'googleSatLayer'}
                sourceID={'googleSat'}
                style={{
                    visibility: currentMap === 'googleSat' ? 'visible' : 'none'
                }}
            />
        </MapboxGL.RasterSource>
    )
}

// export function GoogleRoadIran() {
//     return (
//         <MapboxGL.RasterSource
//             id={'googleRoadIran'}
//             tileSize={256}
//             tileUrlTemplates={["http://gis-service.nlho.ir/map/googlemap/{z}/{x}/{-y}.png"]}
//             minZoomLevel={0}
//             maxZoomLevel={19}
//         >
//             <MapboxGL.RasterLayer
//                 id={'googleRoadIranLayer'}
//                 sourceID={'googleRoadIran'}
//             />
//         </MapboxGL.RasterSource>
//     )
// }


// export function BingSatIran() {
//     return (
//         <MapboxGL.RasterSource
//             id={'bingSatIran'}
//             tileSize={256}
//             tileUrlTemplates={["http://gis-service.nlho.ir/map/bingsat/{z}/{x}/{-y}.jpg"]}
//             minZoomLevel={0}
//             maxZoomLevel={19}
//         >
//             <MapboxGL.RasterLayer
//                 id={'bingSatIranLayer'}
//                 sourceID={'bingSatIran'}
//             />
//         </MapboxGL.RasterSource>
//     )
// }