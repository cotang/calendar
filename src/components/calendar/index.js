import React, { Component } from 'react';
import moment from 'moment';


class Calendar extends Component {

  constructor(props){
    super(props);
    this.width = props.with || '400px';
    this.style = props.style || {};
    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false
    }
    this.style.width = this.width;
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format('Y');
  }
  month = () => {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDate = () => {
    return this.state.dateContext.get('date');
  }
  currentDay = () => {
    return this.state.dateContext.format('D');
  }
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d')
    return firstDay;
  }


  render() {
    let weekdays = this.weekdaysShort.map((day)=>{
      return (
        <th key={day} className="week-day">{day}</th>
      )
    });

    let blanks = [];
    for (let i=0; i < this.firstDayOfMonth(); i++){
      blanks.push(<td key={i} className="empty-slot"></td>)
    }

    let daysInMonth = [];
    for (let j=1; j <= this.daysInMonth(); j++){
      let className = ( j == this.currentDay() ? 'day current-day' : 'day')
      daysInMonth.push(
        <td key={j*10} className={className}><span>{j}</span></td>
      )
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((day, i) => {
      if ((i%7) !== 0){
        cells.push(day);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(day);
      }
      if (i==totalSlots.length-1){
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    })
    // console.log('days: ', totalSlots)

    let trElems = rows.map((d,i)=>{
      // console.log(d, i)
      return (
        <tr key={i*100}>{d}</tr>
      )
    })



    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              {weekdays}
            </tr>
          </thead>
          <tbody>
            {trElems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;