import React, { Component } from "react"
//import { GoogleApiWrapper } from "google-maps-react"

import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react"
 
export class MapComponent extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Map</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyBsMNv1oIY3lW06M-kyzfBDb6sMjqu9Q8U")
})(MapComponent)