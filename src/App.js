import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import SideBarContainer from './SideBarContainer'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'


class App extends Component {
  state = {
    locations: [
      {title: 'National Leprechaun Museum', location: {lat: 53.347647, lng: -6.266657}},
      {title: 'Old Jameson Distillery', location: {lat: 53.349805, lng: -6.26031}},
      {title: 'Guinness Storehouse', location: {lat: 53.341811, lng: -6.286718}},
      {title: 'Molly Malone Statue', location: {lat: 53.343598, lng: -6.260985}},
      {title: 'National Concert Hall', location: {lat: 53.334501, lng: -6.258542}},
      {title: 'Aviva Stadium', location: {lat: 53.335232, lng: -6.228457}}
    ],
  }

  render() {
    return (
      <div id='app'>
        <SideBarContainer
          locations={this.state.locations} />
        <div>
          <main>
            <header>
              {/* <a href="">
                <div className="side-bars">
                  <i className="fas fa-bars fa-lg"></i>
                </div>
              </a> */}
              <div className="header-title">
                Neighborhood Map
              </div>
            </header>
            <Map 
              locations={this.state.locations}/>
          </main>
        </div>
      </div>
    ); 
  } 
}

export default App;
