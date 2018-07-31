import React, { Component } from "react";

 
class SideBarButton extends Component {
  render() {
    return (
      <a href="#" className="sidebar-button"
        onClick={this.props.handleClick}>
          <i className="fas fa-bars fa-lg"></i>
      </a>
    );
  }
}

export default SideBarButton