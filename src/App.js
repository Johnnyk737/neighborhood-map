import React, { Component } from 'react';
import './App.css';
import Map from './Map'
//import SideBarContainer from './SideBarContainer'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'


class App extends Component {
  state = {
    locations: [
      {id: 0, title: 'National Leprechaun Museum', location: {lat: 53.347647, lng: -6.266657}},
      {id: 1, title: 'Old Jameson Distillery', location: {lat: 53.349805, lng: -6.26031}},
      {id: 2, title: 'Guinness Storehouse', location: {lat: 53.341811, lng: -6.286718}},
      {id: 3, title: 'Molly Malone Statue', location: {lat: 53.343598, lng: -6.260985}},
      {id: 4, title: 'National Concert Hall', location: {lat: 53.334501, lng: -6.258542}},
      {id: 5, title: 'Aviva Stadium', location: {lat: 53.335232, lng: -6.228457}}
    ],
    markers: []
  }

  addMarkersToState = (marker) => {
    console.log(marker)
    this.setState({ 
      markers: marker //This isn't working
    })
    console.log(this.state)
  }

  render() {
    return (
      <div id='app'>
            <header>
              <div className="header-title">
                Neighborhood Map
              </div>
            </header>
            <Map 
              locations={this.state.locations}
              addMarkersToState={this.addMarkersToState} />

      </div>
    ); 
  } 
}

export default App;
