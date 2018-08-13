import React, { Component } from 'react'
import SideBarButton from './SideBarButton'
import SideBar from './SideBar'
import './SideBar.css'

//Had to refactor this to be a part of the Map component.  Couldn't figure out how to get the click actions to work properly
//in my head.  Need to help the map display now

class SideBarContainer extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      sideBarVisible: false
    };
 
    this.handleClick = this.handleClick.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState(prevState => ({
      sideBarVisible: !this.state.sideBarVisible
    }));

    let modifier = this.state.sideBarVisible ? false : true;
    this.props.updateDisplay(modifier);
  }

  handleClick(e) {
    this.toggleSideBar();

    e.preventDefault();
  }

  render() {
    return (
      <nav>
        <SideBarButton 
          handleClick={this.handleClick}
          locations={this.props.locations} />
        <SideBar handleClick={this.handleClick}
          sideBarVisible={this.state.sideBarVisible}
          locations={this.props.locations}
          selectLocation={this.props.selectLocation} />
      </nav>
    )
  }
}

export default SideBarContainer;