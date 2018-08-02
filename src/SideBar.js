import React, { Component } from "react";
import { escapeRegExp } from 'escape-string-regexp'
import serializeForm from 'form-serialize'
//import "./SideBar.css";
 
class SideBar extends Component {

  state = {
    filterLocations: [],
    filterVal: ''
  }

  // componentDidUpdate() {
  //   console.log(this.props.locations)
  //   this.setState(prevState => ({
  //     locations: this.props.locations
  //   }))
  // }

  filterLocations(e) {

    e.preventDefault();
    //need to change state for the locations.
    //filter down 
    let { locations } = this.props;
    let queryResults = [];
    let filterVal = document.forms["myForm"].filterVal.value
    this.setState({filterVal: filterVal.trim()})

    if (filterVal) {
      const match = new RegExp(escapeRegExp(this.state.filterVal), 'i') //errors
      let queryResults = locations.filter(location => match.test(locations.title))
    } else {
      queryResults = locations;
    }
    console.log(queryResults);
  }

  render() {
    var visibility = "hide";
    console.log(this.state.locations)
 
    if (this.props.sideBarVisible) {
      visibility = "show";
    }
 
    return (
      <div id="sidebar"
          //  onMouseDown={this.props.handleClick} 
           className={visibility}>
        <a href="#"
          className="sidebar-close"
          onMouseDown={this.props.handleClick}>X</a>
        <div className="sidebar-container">
          <h2>Dublin Locations</h2>
          <form id="myForm" 
            onSubmit={event => this.filterLocations(event)}>
            <input className="sidebar-filter"
              placeholder="Sight Location"
              id="filterVal"
              name="filter"
              type="text" />
            <button className="filter-button"
              type="submit">Filter</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SideBar