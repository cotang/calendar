import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Month from './Month';
import Year from './Year';
import './calendar.css';

class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  weekdaysShort = moment.weekdaysShort();


  year = () => {
    return this.props.dateContext.format('Y');
  }
  month = () => {
    return this.props.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.props.dateContext.daysInMonth();
  }
  currentDay = () => {
    return this.props.today.format('D');
  }
  firstDayOfMonth = () => {
    return moment(this.props.dateContext).startOf('month').format('d')
  }

  changeMonth(newMonth) {
    let dateContext = moment(this.props.dateContext).month(newMonth);
    this.props.setNewContext(dateContext);
  }
  changeYear(newYear) {
    let dateContext = moment(this.props.dateContext).year(newYear);
    this.props.setNewContext(dateContext);

  }
  showPrevMonth(){
    let dateContext = moment(this.props.dateContext).subtract(1, 'month')
    this.props.setNewContext(dateContext);
  }
  showNextMonth(){
    let dateContext = moment(this.props.dateContext).add(1, 'month')
    this.props.setNewContext(dateContext);
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
        this.month() == moment(this.props.today).format('MMMM') &&
        this.year() == moment(this.props.today).format('Y') ? 'slot day current-day' : 'slot day');
      let dayString = (j<10?'0'+j:j)+'-'+this.props.dateContext.format('MM')+'-'+ this.year();
      daysInMonth.push(
        <td key={j} className={className}>
          <span>
            <Link to={'/calendar/'+dayString} >{j}</Link>
          </span>
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

    let prevMonth = moment(this.props.dateContext).subtract(1, 'month')
    let prevMonthPath = prevMonth.format('MM') +'-'+ prevMonth.format('Y');
    let nextMonth = moment(this.props.dateContext).add(1, 'month')
    let nextMonthPath = nextMonth.format('MM') +'-'+ nextMonth.format('Y');

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="3">
                <Month 
                  currentMonth={this.month()} 
                  currentYear={this.year()} 
                  onGetMonth={this.changeMonth.bind(this)} />
              </td>
              <td colSpan="2">
                <Year 
                  currentYear={this.year()} 
                  onGetYear={this.changeYear.bind(this)} />
              </td>
              <td colSpan="2">
                <span>
                  <Link to={'/'+prevMonthPath} onClick={this.showPrevMonth.bind(this)}>&#9668;</Link>
                  <Link to={'/'+nextMonthPath} onClick={this.showNextMonth.bind(this)}>&#9658;</Link>
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