import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from '@kepler.gl/components';
import {createAction} from 'redux-actions';


import {addDataToMap, wrapTo} from '@kepler.gl/actions';
import config2 from './configurations/config2';
import {processCsvData} from 'kepler.gl/processors';
import dataset1 from './data/kepdata';
import { fontFamily, fontSize } from 'kepler.gl/dist/styles/base';





const MAPBOX_TOKEN =
  "pk.eyJ1Ijoicm9oaW5waHVrYW4iLCJhIjoiY2xjd29meTdhMHI3dzN2bzc2Mjk2M2g3bSJ9.9zyBupgAmNwhh8_XVhvgzQ";
// extra actions plugged into kepler.gl reducer (store.js)
const hideAndShowSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');

const myStyle = {
  fontSize: '40px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  color: '#cfd7dd',
  height: '50px',
  textAlign: 'center',
  
};


class App extends Component {
  state = {
    currentConfig: config2,
    name: 'unknown',

 
    
  };

 




  

  componentDidMount() {
    this.props.dispatch(
      wrapTo(
        'map1',
        addDataToMap({
          datasets: dataset1,
          config: config2
        })
      )
    );
  }

  _toggleSidePanelVisibility = () => {
    this.props.dispatch(wrapTo('map1', hideAndShowSidePanel()));
  };

  setName=(nameValue)=>{
    this.setState({name:nameValue});
  }


  



  updateMap = () => {
   
    // Replace with your own new config
    
    const newConfig = {
      version: "v1",
      config: {
        visState: {
          filters: [
            {
              dataId: "rohin",
              id: "pk8adw9om",
              name: ["Country of origin"],
              type: "multiSelect",
              value: [this.state.name.toString()],
              enlarged: false,
              plotType: "histogram",
              animationWindow: "free",
              yAxis: null,
              speed: 1,
            },
          ],
          layers: [
            {
              id: "1onebpr",
              type: "point",
              config: {
                dataId: "rohin",
                label: "origin",
                color: [255, 203, 153],
                highlightColor: [252, 242, 26, 255],
                columns: { lat: "lat", lng: "long", altitude: null },
                isVisible: true,
                visConfig: {
                  radius: 10,
                  fixedRadius: false,
                  opacity: 0.8,
                  outline: true,
                  thickness: 2,
                  strokeColor: [245, 113, 65],
                  colorRange: {
                    name: "ColorBrewer Purples-6",
                    type: "singlehue",
                    category: "ColorBrewer",
                    colors: [
                      "#f2f0f7",
                      "#dadaeb",
                      "#bcbddc",
                      "#9e9ac8",
                      "#756bb1",
                      "#54278f",
                    ],
                  },
                  strokeColorRange: {
                    name: "Global Warming",
                    type: "sequential",
                    category: "Uber",
                    colors: [
                      "#5A1846",
                      "#900C3F",
                      "#C70039",
                      "#E3611C",
                      "#F1920E",
                      "#FFC300",
                    ],
                  },
                  radiusRange: [0, 50],
                  filled: true,
                },
                hidden: false,
                textLabel: [],
              },
              visualChannels: {
                colorField: { name: "Year", type: "integer" },
                colorScale: "quantile",
                strokeColorField: null,
                strokeColorScale: "quantile",
                sizeField: null,
                sizeScale: "linear",
              },
            },
            {
              id: "on4t6xh",
              type: "arc",
              config: {
                dataId: "rohin",
                label: "Country of Origin->Asylum",
                color: [146, 38, 198],
                highlightColor: [252, 242, 26, 255],
                columns: {
                  lat0: "lat",
                  lng0: "long",
                  lat1: "Latitude",
                  lng1: "Longitude",
                },
                isVisible: true,
                visConfig: {
                  opacity: 0.8,
                  thickness: 2,
                  colorRange: {
                    name: "ColorBrewer Blues-6",
                    type: "singlehue",
                    category: "ColorBrewer",
                    colors: [
                      "#eff3ff",
                      "#c6dbef",
                      "#9ecae1",
                      "#6baed6",
                      "#3182bd",
                      "#08519c",
                    ],
                  },
                  sizeRange: [2, 10],
                  targetColor: null,
                },
                hidden: false,
                textLabel: [
                  {
                    field: null,
                    color: [255, 255, 255],
                    size: 18,
                    offset: [0, 0],
                    anchor: "start",
                    alignment: "center",
                  },
                ],
              },
              visualChannels: {
                colorField: {
                  name: "Refugees under UNHCRs mandate",
                  type: "integer",
                },
                colorScale: "quantile",
                sizeField: {
                  name: "Refugees under UNHCRs mandate",
                  type: "integer",
                },
                sizeScale: "linear",
              },
            },
          ],
          interactionConfig: {
            tooltip: {
              fieldsToShow: {
                rohin: [
                  { name: "Year", format: null },
                  { name: "Country of origin", format: null },
                  { name: "Country of asylum", format: null },
                  { name: "Refugees under UNHCRs mandate", format: null },
                ],
              },
              compareMode: false,
              compareType: "absolute",
              enabled: true,
            },
            brush: { size: 0.5, enabled: false },
            geocoder: { enabled: false },
            coordinate: { enabled: false },
          },
          layerBlending: "normal",
          splitMaps: [],
          animationConfig: { currentTime: null, speed: 1 },
        },
        mapState: {
          bearing: 0,
          dragRotate: false,
          latitude: 20.99087011392356,
          longitude: 51.18520018337793,
          pitch: 0,
          zoom: 2.6419756514718338,
          isSplit: false,
        },
        mapStyle: {
          styleType: "dark",
          topLayerGroups: { label: true },
          visibleLayerGroups: {
            label: true,
            road: false,
            border: false,
            building: true,
            water: true,
            land: true,
            "3d building": false,
          },
          threeDBuildingColor: [
            9.665468314072013, 17.18305478057247, 31.1442867897876,
          ],
          mapStyles: {},
        },
      },
    };
      // your config
    
    this.setState({currentConfig: newConfig});
    this.props.dispatch(
      wrapTo(
        'map1',
        addDataToMap({
          datasets: dataset1,
          config: newConfig
        })
      )
    );
  };

  render() {
    const { text, filteredOptions } = this.state;
    return (
      // <div className = "main" style={{ position: 'absolute',width: '100%', height: '100%', backgroundColor: 'white'}}>
      //   <h1 style={{...myStyle}}>Follow the journeys of those seeking safety.</h1>
      
      //   <input type="text" placeholder= "type a country..." onChange={e=>this.setName(e.target.value)}/>
       
       
      //   <button onClick={this.updateMap}>Update Map</button>
      //   <AutoSizer>
      //     {({height, width}) => (
      //       <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map1" width={width} height={height} />
      //     )}
      //   </AutoSizer>
        
        
      // </div>
      <div className="main" style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#2A303C' }}>
        <h1 style={{ ...myStyle }}>Follow the journeys of 
        <span style={{color: '#EB5E55'}}> the people </span> 
        seeking safety.</h1>
        
      
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="text" placeholder="type a country..."
                onChange={e => this.setName(e.target.value)}
                style={{ 
                  padding: '10px', 
                  fontSize: '20px', 
                  border: '2px solid #cfd7dd', 
                  backgroundColor: '#2A303C', 
                  color: '#cfd7dd',
                  width: '250px', 
                  marginRight: '-2px',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px'
                }}
          />
          <button onClick={this.updateMap}
                  style={{
                    padding: '10px',
                    backgroundColor: '#cfd7dd',
                    color: '#2A303C',
                    border: '2px solid #cfd7dd',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    
                    cursor: 'pointer',
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px'
                  }}
          >
            Update Map
          </button>
        </div>

         


        




        <div style={{ height: '80%', overflow: 'auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map1" width={width} height={height} />
            )}
          </AutoSizer>
        </div>
      </div>

         


    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
