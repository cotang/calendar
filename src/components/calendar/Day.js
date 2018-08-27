import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Day extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div className="day">
        <h1>{this.props.match.params.id}</h1>
        <div>
          <Link to={'/calendar'}>Back to calendar</Link>
        </div>
      </div>
    );
  }
}

export default Day;

