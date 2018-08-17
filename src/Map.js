import React, { Component } from "react"
import SideBarContainer from './SideBarContainer'


let map = [];
let infoWindows = [];
class Map extends Component {

  state = {
    zoom: 14,
    mapType: "roadmap",
    markers: [],
    allLocations: "",
    filteredLocations: "",
    map: "",

  }

  componentDidMount() {
    window.initMap = this.initMap;

    this.setState({
      filteredLocations: this.props.locations
    })
  // Loads asynchronously the JS definitions when the page starts loading in the browser.
    this.loadJS(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDAEUd21Zb3JP5a9onPB8aBVyjvLRiJzoQ&libraries=places&callback=initMap'
    );
  }
    

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.343598, lng: -6.260985},
      zoom: this.state.zoom,
      mapTypeId: this.state.mapType,
    });

    this.setState({
      map: map
    })

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

  addLocationMarkers = (map, locations = this.state.filteredLocations) => {
    //let locations = this.state.filteredLocations

    let allLocations = [];
  
    let i = 0;
    locations.forEach((place) => {

      if(!place.marker) {
        let position = place.location;
        let title = place.title;

        let marker = new window.google.maps.Marker({
          position: position,
          title: title,
          animation: window.google.maps.Animation.DROP,
          id: i,
          map: map
        });

        let infoWindow = new window.google.maps.InfoWindow({
          maxWidth: 300
        });

        place.infoWindow = infoWindow

        infoWindows.push(infoWindow)

        window.google.maps.event.addListener(marker, 'click', () => {
          map.setCenter(marker.getPosition())
          // Close all other info windows when the user opens a new one.
          infoWindows.forEach( (infoWindow) => {
            infoWindow.close();
          });

          this.populateInfoWindow(marker, infoWindow);
        });

        place.marker = marker

        i += 1;
      } else {
        place.marker.setMap(map)
      }

      allLocations.push(place)
    })

    if(allLocations) {
      this.setState(prevState => ({
        allLocations: allLocations 
      }))
    }
  }

  populateInfoWindow = (marker, infoWindow) => {

    const {map} = this.state;

    map.setCenter(marker.getPosition())

    infoWindow.open(map, marker); 
    infoWindow.setContent('Fetching location information...');


    let wikiData = fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + marker.title + "&limit=1&redirects=resolve")
    .then(function(response) {
      return response.json()
    }).catch((error) => {
      console.log(error);
    });

    Promise.all([wikiData]).then((wikiResponse) => {
      let wikiResp = wikiResponse[0]
      let wikiTitle = `<strong aria-label="Wiki Title">${wikiResp[1]}</strong><br/>`;
      let wikiDescription = `<p aria-label="Wiki Description">${wikiResp[2]}</p><br/>`;
      let wikiLink = `<a aria-label="Wiki Link" href="${wikiResp[3]}" target="_blank">${wikiResp[3]}</a><br />`

      // Combine the content.
      let content = `<div role="dialog" tabindex="0">${wikiTitle}${wikiDescription}${wikiLink}</div>`;

      infoWindow.setContent(content);
    })
  }


  selectLocation = (location) => {
    let {allLocations} = this.state

    allLocations.forEach((place)=>{
      if (place.title === location){
        infoWindows.forEach( (infoWindow) => {
          infoWindow.close();
        });
        this.populateInfoWindow(place.marker, place.infoWindow);
      }
    })
  }

  updateMarkers = (filterLocations) => {
    let {filteredLocations} = this.state

    //Remove the previous markers from map before adding new ones.
    filteredLocations.forEach(location => {
      location.marker.setMap(null)
    })

    this.setState(prevState => ({
      filteredLocations: filterLocations
    }))

    this.addLocationMarkers(map, filterLocations)
  } 

  render() {
    return (
      <div>
        <SideBarContainer
            locations={this.props.locations} 
            updateDisplay={this.props.updateDisplay} 
            selectLocation={this.selectLocation}
            updateMarkers={this.updateMarkers}/>
        <div id="map" className="map-content map-expand" role="application" aria-label="A map of tourist locations in Dublin, Ireland">
        </div>
      </div> 
    )
  }

  loadJS = (src) => {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

}

export default Map;