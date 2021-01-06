import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Text } from 'react-native';
import proj4 from 'proj4';
import MapboxGL from "@react-native-mapbox-gl/maps";
import RenderBaseMaps from '../../components/mapBox/tools/BaseMaps/renderBaseMaps';
import marker from '../../assets/img/marker.png'
import { connect } from 'react-redux'

MapboxGL.setAccessToken("sk.eyJ1IjoiYW1pcmhzb2JoaSIsImEiOiJjazJxb2d2MjYwaDZ4M2pxZXRoa2czbWl2In0.3L3q0NG8ytr_76-1uBsG9A");
// MapboxGL.setAccessToken("sk.asd");

proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

var _Map = React.createRef();
var _Camera = React.createRef();
const HackMarker = ({ children }) =>
  Platform.select({
    ios: children,
    android: (
      <Text
        style={{
          lineHeight: 70, // there is some weird gap, add 40+ pixels
          backgroundColor: 'transparent',
          textAlignVertical: 'center',
          padding: 0,
          margin: 0,
        }}>
        {children}
      </Text>
    ),
  })
class MapBox extends Component {
  constructor(props) {
    super(props)
   
  }

  async componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (
      <MapboxGL.MapView
        sourceId="base"
        sourceLayerId="base"
        style={styles.map}
        logoEnabled={false}
        attributionEnabled={false}
        ref={ref => _Map = ref}
        rotateEnabled={false}
        compassEnabled={false}
        // styleURL="Google"
        onPress={(e) => this.props.getCoords(e)}
      >
        <MapboxGL.Camera
          ref={ref => _Camera = ref}
          centerCoordinate={this.props.selectedCoords ? this.props.selectedCoords : [53.5, 32]}
          zoomLevel={this.props.zoom ? this.props.zoom : 3.6}
          minZoomLevel={3.6}

        />
        {
          this.props.selectedCoords !== null ?
            <MapboxGL.MarkerView
              coordinate={this.props.selectedCoords}
              anchor={{ x: 0.5, y: 1 }}
              id="marker"
            >
                <Image
                  source={marker}
                  style={{ width: 40, height: 40 }}
                  // pointerEvents="none"
                  id={"marker"}
                />
            </MapboxGL.MarkerView> : null
          // <MapboxGL.PointAnnotation
          //   coordinate={this.props.selectedCoords}
          //   anchor={{ x: 0.5, y: 1 }}
          //   ref={(ref)=>this.point = ref}
          //   id={"marker"}
          //   pointerEvents="none"
          // >
          //   <HackMarker>
          //     <Image
          //       source={marker}
          //       style={{ width: 40, height: 40 }}
          //       pointerEvents="none"
          //       id={"marker"}
          //     />
          //   </HackMarker>

          // </MapboxGL.PointAnnotation> : null
        }
        {/* {
          this.props.selectedCoords !== null ? 
          <MapboxGL.MarkerView anchor={{ x: 0.5, y: 1 }} coordinate={this.props.selectedCoords} id="marker"/> : null
        } */}

        {/* <RenderBaseMaps /> */}
        {this.props.children}
        {/* <MapboxGL.UserLocation
          visible={true}
        /> */}
      </MapboxGL.MapView>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLocating: state.handleMapTools.isLocating
  }
}
export default connect(mapStateToProps)(MapBox);

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: '#fff'
  }
});


export function resetZoom(coords, zoom) {
  _Camera.setCamera({
    centerCoordinate: coords ? coords : [53.5, 32],
    zoomLevel: zoom ? zoom : 3.6,
    animationDuration: 1000,
  })
}


export function SetExtent({ Xmin, Ymin, Xmax, Ymax }) {
  var p1 = proj4('EPSG:3857', 'EPSG:4326', [Xmin, Ymin]);
  var p2 = proj4('EPSG:3857', 'EPSG:4326', [Xmax, Ymax]);
  _Camera.fitBounds(p1, p2, 0, 1000);
}

export async function getMapBounds() {
  return await _Map.getVisibleBounds();
}

export function ConvertTo3857(bound1, bound2) {
  var p1 = proj4('EPSG:4326', 'EPSG:3857', bound1);
  var p2 = proj4('EPSG:4326', 'EPSG:3857', bound2);
  return {
    Xmin: p1[0],
    Ymin: p1[1],
    Xmax: p2[0],
    Ymax: p2[1]
  }
}