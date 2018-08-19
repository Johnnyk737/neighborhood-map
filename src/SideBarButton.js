import React, { Component } from "react";

 
class SideBarButton extends Component {
  render() {
    return (
      <span className="sidebar-button"
        onClick={this.props.handleClick}>
          <i className="fas fa-bars fa-lg"></i>
      </span>
    );
  }
}

export default SideBarButton