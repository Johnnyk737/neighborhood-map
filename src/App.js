import React, { Component } from 'react';
import './App.css';
import Map from './Map'


class App extends Component {
  state = {
    locations: [
      {id: 0, title: 'National Leprechaun Museum', location: {lat: 53.347635, lng: -6.266592}},
      {id: 1, title: 'Old Jameson Distillery', location: {lat: 53.348377, lng: -6.277356}},
      {id: 2, title: 'Guinness Storehouse', location: {lat: 53.341811, lng: -6.286718}},
      {id: 3, title: 'National Gallery of Ireland', location: {lat: 53.340906, lng: -6.252502}},
      {id: 4, title: 'National Concert Hall', location: {lat: 53.334717, lng: -6.25923}},
      {id: 5, title: 'Aviva Stadium', location: {lat: 53.335232, lng: -6.228457}}
    ],
  }


  updateDisplay = (modifier) => {
    let header = document.getElementById('header');
    let map = document.getElementById('map');
    if (modifier) {
      header.classList.toggle("header-open");
      map.classList.toggle("map-expand");
      map.classList.toggle("map-close");
    } else {
      header.classList.toggle("header-open");
      map.classList.toggle("map-close");
      map.classList.toggle("map-expand");
    }
  }

  render() {
    return (
      <div id='app'>
            <header id="header">
              <div className="header-title">
                Neighborhood Map
              </div>
            </header>
            <Map 
              locations={this.state.locations}
              addMarkersToState={this.addMarkersToState} 
              updateDisplay={this.updateDisplay} />
      </div>
    ); 
  } 
}

export default App;
