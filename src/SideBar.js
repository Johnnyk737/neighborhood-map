import React, { Component } from "react";
import escapeRegExp from 'escape-string-regexp'
//import "./SideBar.css";
 
class SideBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterLocations: []
    }
  }

  componentDidMount() {
    this.setState({filterLocations: this.props.locations});
  }

  /**
   * Updates location state and calls into updateMarkers from props
   * @param {string} filter - Query string for the filter  
   */
  updateLocations(filter) {
    console.log(filter)
    if (filter) {
      let filterLocations = this.filterLocations(filter);
      this.props.updateMarkers(filterLocations)
      this.setState({filterLocations: filterLocations})   
    } else {
      this.props.updateMarkers(this.props.locations)
      this.setState({filterLocations: this.props.locations})
    }
  }

  /**
   * Filters the locations based on query 
   * @param {string} filterVal - Query string for the filter  
   */
  filterLocations(filterVal) {

    let { locations } = this.props;
    filterVal = filterVal.trim();

    const match = new RegExp(escapeRegExp(filterVal), 'i') //errors
    let queryResults = locations.filter(location => match.test(location.title))

    return queryResults;
  }

  /**
   * Handler for clicking the location in the sidebar
   * @param {object} location  
   */
  clickLocation(location) {
    this.props.selectLocation(location)
  }

  updateLocationsKey = (keyCode, location) => {
    //Using the enter key
    if (keyCode === 13) {
      this.props.selectLocation(location)
    }
  }

  render() {
    var visibility = "hide";
    let { filterLocations } = this.state
 
    if (this.props.sideBarVisible) {
      visibility = "show";
    }
 
    return (
      <div id="sidebar"
          aria-label="Side bar Window"
           className={visibility}>
        <button
          aria-label="sidebar close"
          tabIndex="0"
          className="sidebar-close"
          onMouseDown={this.props.handleClick}
          onKeyDown={(event) => this.props.handleKeyDown(event)}>X</button>
        <div className="sidebar-container">
          <h2>Dublin Locations</h2>
            <input className="sidebar-filter"
              placeholder="Sight Location"
              id="filterVal"
              role="search"
              name="filter"
              aria-label="filter"
              type="text"
              tabIndex="0"
              onChange={event => this.updateLocations(event.target.value)} />

          <div className="location-list" aria-label="Location List">
            <ol>
              {filterLocations.map((location) => (
                <li key={location.id}
                    aria-label={location.title}
                    tabIndex="0"
                    onMouseDown={() => this.clickLocation(location.title)}
                    onKeyDown={event => this.updateLocationsKey(event.keyCode, location.title)}>
                  {location.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar