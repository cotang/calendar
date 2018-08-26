import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

class Year extends Component {
  constructor(props){
    super(props);
    this.state = {
      editable: false,
    }
  }
  makeEditable = () => {
    this.setState({
      editable: true
    })
  }
  handleClickOutside = () => {
    if (this.state.editable) {
      this.setState({
        editable: false
      })
    }
  }
  setYear(event) {
    this.props.onGetYear(event.target.value);
  }


  render() {
    return (
      <div className="year">
        <input 
          type="number"
          className="year-editor"
          size="4"
          readOnly={!this.state.editable}           
          value={this.props.currentYear}
          onChange={this.setYear.bind(this)}
          onClick={this.makeEditable}
          />
      </div>
    );
  }
}

export default onClickOutside(Year);

