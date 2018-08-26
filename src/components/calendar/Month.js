import React, { Component } from 'react';
import moment from 'moment';
import onClickOutside from "react-onclickoutside";

class Month extends Component {
  constructor(props){
    super(props);
    this.state = {
      shownPopup: false,
    }
  }
  showPopup = () => {
    this.setState({
      shownPopup: !this.state.shownPopup
    })
  }
  chooseMonth(m) {
    this.props.onGetMonth(m);
    this.setState({
      shownPopup: false
    })
  }
  handleClickOutside = () => {
    if (this.state.shownPopup) {
      this.setState({
        shownPopup: false
      })
    }
  }



  months = moment.months();

  render() {
    let liMonths = this.months.map((m)=>{
      return (
        <li key={m}>
          <button type="button" className="reset" onClick={this.chooseMonth.bind(this, m)}>
            {m}
          </button>
        </li>
      )
    })


    return (
      <div className="month">
        <button type="button" className="reset" onClick={this.showPopup}>{this.props.currentMonth}</button>
          { (this.state.shownPopup) &&
            <ul className="month-popup">
              {liMonths}
            </ul>                 
          }
      </div>
    );
  }
}

export default onClickOutside(Month);

