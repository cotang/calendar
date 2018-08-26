import React, { Component } from 'react';
import moment from 'moment';
import Month from './Month';
import Year from './Year';
import './calendar.css';

class Calendar extends Component {

  constructor(props){
    super(props);
    this.width = props.width || '400px';
    this.style = props.style || {};
    this.state = {
      dateContext: moment(),
      today: moment()
    }
    this.style.width = this.width;
  }

  weekdaysShort = moment.weekdaysShort();


  year = () => {
    return this.state.dateContext.format('Y');
  }
  month = () => {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDay = () => {
    return this.state.today.format('D');
  }
  firstDayOfMonth = () => {
    return moment(this.state.dateContext).startOf('month').format('d')
  }

  changeMonth(newMonth) {
    let dateContext = moment(this.state.dateContext).month(newMonth);
    this.setState({      
      dateContext: dateContext
    })
  }
  changeYear(newYear) {
    let dateContext = moment(this.state.dateContext).year(newYear);
    this.setState({      
      dateContext: dateContext
    })
  }
  showPrevMonth(){
    let dateContext = moment(this.state.dateContext).subtract(1, 'month')
    this.setState({      
      dateContext: dateContext
    })
  }
  showNextMonth(){
    let dateContext = moment(this.state.dateContext).add(1, 'month')
    this.setState({
      dateContext: dateContext
    })
  }

  render() {
    let weekdays = this.weekdaysShort.map((day)=>{
      return (
        <th key={day} className="week-day">{day}</th>
      )
    });

    let startBlanks = [];
    for (let i=0; i < this.firstDayOfMonth(); i++){
      startBlanks.push(<td key={i*10} className="slot empty"></td>)
    }

    let daysInMonth = [];
    for (let j=1; j <= this.daysInMonth(); j++){
      let className = ( 
        j == this.currentDay() && 
        this.month() == moment(this.state.today).format('MMMM') &&
        this.year() == moment(this.state.today).format('Y') ? 'slot day current-day' : 'slot day')
      daysInMonth.push(
        <td key={j} className={className}>
          <span>{j}</span>
        </td>
      )
    }

    let totalSlots = [...startBlanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((day, i) => {
      if (i%7 == 0 && i!=0){
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(day);
      } else {        
        cells.push(day);
      }
      if (i==totalSlots.length-1){
        let insertRow = cells.slice();
        let endBlanks = [];
        for (let i=insertRow.length; i < 7; i++){
          endBlanks.push(<td key={i*100} className="slot empty-slot"></td>)
        }
        insertRow = insertRow.concat(endBlanks)
        rows.push(insertRow);
      }
    })


    let trElems = rows.map((d,i)=>{
      return (
        <tr key={i*100}>{d}</tr>
      )
    })



    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="3">
                <Month currentMonth={this.month()} onGetMonth={this.changeMonth.bind(this)}  />
              </td>
              <td colSpan="2">
                <Year currentYear={this.year()} onGetYear={this.changeYear.bind(this)}  />
              </td>
              <td colSpan="2">
                <span>
                  <button className="reset" onClick={this.showPrevMonth.bind(this)}>&#9668;</button>
                  <button className="reset" onClick={this.showNextMonth.bind(this)}>&#9658;</button>
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="calendar-days">
              {weekdays}
            </tr>
            {trElems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;