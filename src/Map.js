import React, { Component } from "react"
import SideBarContainer from './SideBarContainer'


class Map extends Component {

  state = {
    zoom: 13,
    mapType: "roadmap",
    markers: [],
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.349805, lng: -6.26031},
      zoom: this.state.zoom,
      mapTypeId: this.state.mapType,
    });

    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });
    
    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    this.addLocationMarkers(map)
  }

  addLocationMarkers(map) {
    let locations = this.props.locations

    let markers = [];
    let i = 0;
    for (let place of locations) {
      
      let position = place.location;
      let title = place.title;

      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i,
        map: map
      });
      markers.push(marker);
      i += 1; 
    }
    //this.props.addMarkersToState(markers);
    if(markers) {
      this.setState((prevState, markers) => {
        return {markers: markers} ///not
      })
    }
    

    console.log(this.state.markers);

    this.displayMarkers(markers, map);
  }

  displayMarkers(markers, map) {
    var bounds = new window.google.maps.LatLngBounds();
    // Extending the boundaries of the map to fit the markers
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    let newZoom = map.getZoom();
    if (newZoom !== this.state.zoom) {
      this.setState(prevState => ({
        zoom: newZoom
      }))
      console.log(this.state.zoom)
      /* <SideBarContainer
            locations={this.props.locations} /> */
    }
  }

  /*
  Functions for handling the click event on the locations in the side bar

  selectLocation() {
    //center on page, open infowindow with information about the location
    map.setCenter(marker.getPosition());
  }

  populateInfoWindow() {
    //populates infowindow
  }

  getWikiAPI() {
    //Get wiki api info about location
  }

  getOtherAPI() {
    //other api to be decided
  }
  */

  render() {
    return (
      <div>
        <SideBarContainer
            locations={this.props.locations} />
        <div id="map" className="map-content">
        </div>
      </div> 
    )
  }

}

export default Map;