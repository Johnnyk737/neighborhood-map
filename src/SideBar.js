import React, { Component } from "react";
//import "./SideBar.css";
 
class SideBar extends Component {

  filterLocations() {
    //need to change state for the locations.
    //filter down 
  }

  render() {
    var visibility = "hide";
 
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
          <input className="sidebar-filter"
            placeholder="Sight Location" />
          <button className="filter-button"
            onSubmit="">Filter</button>
        </div>
      </div>
    );
  }
}

export default SideBar