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

  // componentDidUpdate() {
  //   console.log(this.props.locations)
  //   this.setState(prevState => ({
  //     locations: this.props.locations
  //   }))
  // }
  componentDidMount() {
    this.setState({filterLocations: this.props.locations});
  }

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


  filterLocations(filterVal) {

    //need to change state for the locations.
    //filter down 
    //let { filterLocations } = this.state;
    let { locations } = this.props;
    filterVal = filterVal.trim();

    const match = new RegExp(escapeRegExp(filterVal), 'i') //errors
    let queryResults = locations.filter(location => match.test(location.title))

    return queryResults;
  }

  clickLocation(location) {
    this.props.selectLocation(location)
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
          className="sidebar-close"
          onMouseDown={this.props.handleClick}>X</button>
        <div className="sidebar-container">
          <h2>Dublin Locations</h2>
            <input className="sidebar-filter"
              placeholder="Sight Location"
              id="filterVal"
              role="Filter"
              name="filter"
              type="text"
              tabIndex="0"
              onChange={event => this.updateLocations(event.target.value)} />

          <div className="location-list" aria-label="Location List">
            <ol>
              {filterLocations.map((location) => (
                <li key={location.id}
                    aria-label={location.title}
                    onMouseDown={() => this.clickLocation(location.title)}>
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