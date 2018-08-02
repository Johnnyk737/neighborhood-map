import React, { Component } from "react"


class Map extends Component {

  state = {
    zoom: 13,
    mapType: "roadmap",
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
      i += 1; //need to fix this
    }
    this.props.addMarkersToState(markers);
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
    }
  }

  render() {
    return (
      <div id="map"
        className="map-content"></div>
    )
  }

}

export default Map;