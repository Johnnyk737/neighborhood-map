import React, { Component } from "react"
import SideBarContainer from './SideBarContainer'

let markers = [];
let map = [];
let infoWindow;
class Map extends Component {

  state = {
    zoom: 14,
    mapType: "roadmap",
    markers: [],
  }

  componentDidMount() {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.343598, lng: -6.260985},
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

  addLocationMarkers = (map) => {
    let locations = this.props.locations

    //let markers = [];
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
      console.log(markers)
      this.setState(prevState => ({
        markers: markers ///not working properly, I don't think
      }))
    }

    // this.state = {markers: markers};
    

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
    //map.fitBounds(bounds);

    let newZoom = map.getZoom();
    if (newZoom !== this.state.zoom) {
      this.setState(prevState => ({
        zoom: newZoom
      }))
      console.log(this.state.zoom)
    }
  }

  /*
  Functions for handling the click event on the locations in the side bar
  */

  selectLocation = (location) => {
    //center on page, open infowindow with information about the location

    if(infoWindow) {
      infoWindow.close()
    }

    console.log(markers)
    let currMarker;
    markers.forEach(marker => {
      if(marker.title === location) {
        currMarker = marker;
      }
    })

    //center on map
    map.setCenter(currMarker.getPosition());
    //create info window

    infoWindow = this.populateInfoWindow(currMarker);

    infoWindow.open(map, currMarker);
  }

  populateInfoWindow = (marker) => {
    //populates infowindow
    //returns string of stuff

    let infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 300
    });

    let wikiData = this.getWikiAPI(marker.title)
    console.log(wikiData)

    let content = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    `<h1 id="firstHeading" class="firstHeading">${wikiData[0]}</h1>`+
    '<div id="bodyContent">'+
    `<p>${wikiData[2]}</p>`+
    '</div>'+
    '</div>';

    infoWindow.setContent(content);
    return infoWindow
  }
 
  getWikiAPI = (search) => {
    //Get wiki api info about location
    let wikiData;
    fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + search + "&limit=5")
    .then(function(response) {
      return response.json()
    }).then(function(data) {
    console.log(data);
    return data;
    })
    // console.log(wikiData)
    // return wikiData;
  }
/*
  getOtherAPI() {
    //other api to be decided
  }
  */

  render() {
    return (
      <div>
        <SideBarContainer
            locations={this.props.locations} 
            updateDisplay={this.props.updateDisplay} 
            selectLocation={this.selectLocation}/>
        <div id="map" className="map-content map-expand">
        </div>
      </div> 
    )
  }

}

export default Map;