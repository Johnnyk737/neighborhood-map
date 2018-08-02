import React, { Component } from 'react'
import SideBarButton from './SideBarButton'
import SideBar from './SideBar'
import './SideBar.css'

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
  }

  handleClick(e) {
    this.toggleSideBar();

    console.log("side bar button clicked");
    e.stopPropagation();
  }

  render() {
    return (
      <nav>
        <SideBarButton 
          handleClick={this.handleClick}
          locations={this.props.locations} />
        <SideBar handleClick={this.handleClick}
          sideBarVisible={this.state.sideBarVisible}
          locations={this.props.locations} />
      </nav>
    )
  }
}

export default SideBarContainer;