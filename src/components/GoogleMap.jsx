import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import apiKey from './key_creds.js'

const mapStyle = {
    // height:" 40%"
}

class GoogleMap extends Component {
    render(){
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
                  lat: 40.854885,
                  lng: -88.081807 
                }}
    
               // {/* CONTROL ZOOM OF MAP */}
                zoom={4}
            >   


            </Map>
        </div>         
        )
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey,
  })(GoogleMap);