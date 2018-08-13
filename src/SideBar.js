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
      this.setState({filterLocations: filterLocations})   
    } else {
      this.setState({filterLocations: this.props.locations})
    }
  }


  filterLocations(filterVal) {

    //need to change state for the locations.
    //filter down 
    let { locations } = this.props;
    filterVal = filterVal.trim();

    const match = new RegExp(escapeRegExp(filterVal), 'i') //errors
    let queryResults = locations.filter(location => match.test(location.title))

    return queryResults;
  }

  clickLocation(location) {
    console.log(location)
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
          //  onMouseDown={this.props.handleClick} 
           className={visibility}>
        <a href="#"
          className="sidebar-close"
          onMouseDown={this.props.handleClick}>X</a>
        <div className="sidebar-container">
          <h2>Dublin Locations</h2>
            <input className="sidebar-filter"
              placeholder="Sight Location"
              id="filterVal"
              name="filter"
              type="text"
              tabIndex="0"
              onChange={event => this.updateLocations(event.target.value)} />

          <div className="location-list">
            <ol>
              {filterLocations.map((location) => (
                <li key={location.id}
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