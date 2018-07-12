import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
// import apiKey from './key_creds.js';
import InfoWindowDiv from './InfoWindowDiv';

const mapStyle = {
    // height:" 40%"
}

class GoogleMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false
        }
    }

    componentDidMount(){

    }

    onMarkerClick(props, marker, e){

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    render(){

        let markerList = this.props.events.map((element, index) => {

            return (
                <Marker
                    key={index}
                    onClick={(e)=>{this.onMarkerClick(e)}}
                    name={<InfoWindowDiv selectedPlace={element} />}
                    position={{lat: element.lat, lng: element.lng}}
                />
            )
        })


        return(
            
        <div style={mapStyle} className="mapBody">
            {/* DISPLAY THE MAP */}
            
            <Map className="mapReal"
            //{/*  SIZE OF MAP COMPARE TO SCREEN*/}
              style={{
                height: "100%",  
                width: "100%",
                }}
                google={this.props.google}
                //{/* INTIALIZE CENTER OF MAP */}
                initialCenter={{
                  lat: 33.9519347,
                  lng: -83.537385
                }}
    
               // {/* CONTROL ZOOM OF MAP */}
                zoom={7}
            >   

                {markerList}

                {/* <div className="map1"> */}
                    <InfoWindow
                        position = {this.state.selectedPlace.position}
                        marker = {this.state.activeMarker}
                        visible = {this.state.showingInfoWindow}
                    >
                        <div className="map2">
                            {this.state.selectedPlace.name}
                        </div>
                    </InfoWindow>
                {/* </div> */}
            </Map>
        </div>         
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_apiKey,
  })(GoogleMap);