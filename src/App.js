import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// let map;

// function initMap() {

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 51.5073509, lng: -0.1277582999},
//       zoom: 13
//     });
//   console.log(map);

//   var marker = new google.maps.Marker({position: map.center, map: map});
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
