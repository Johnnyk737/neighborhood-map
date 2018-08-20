import React, { Component } from "react";

 
class SideBarButton extends Component {
  render() {
    return (
      <span className="sidebar-button"
        tabIndex="0"
        aria-label="sidebar open"
        onClick={this.props.handleClick}
        onKeyDown={(event) => this.props.handleKeyDown(event)}>
          <i className="fas fa-bars fa-lg"></i>
      </span>
    );
  }
}

export default SideBarButton