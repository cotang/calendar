import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import './App.css';
import Calendar from './components/calendar/'
import Day from './components/calendar/Day'
import moment from 'moment';


class App extends Component {
  constructor() {
    super();
    this.state = {
      dateContext: moment(),
      today: moment()
    }
  }
  changeContext(newContext){
    this.setState({
      dateContext: newContext
    })
  }


  render() {
    let thisMonthPath = this.state.dateContext.format('MM') +'-'+ this.state.dateContext.format('Y');
    console.log(thisMonthPath);

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <div className="entrance">
                  <h1>Entrance</h1>
                  <div>
                    <Link to={'/'+thisMonthPath}>Go to calendar</Link>
                  </div>
                </div>
              );
            }}/>

            <Route exact path={'/:'+thisMonthPath}
              component={({match}) => <Calendar 
                match={match}
                dateContext={this.state.dateContext}
                today={this.state.today}
                setNewContext={this.changeContext.bind(this)}
              />}
            />

            {/* <Route exact path="/todo" 
              component={({match}) => <ToDo 
                match={match}
                forecastData={this.state.forecastData}
                setUrl={this.getInitialLocation.bind(this)}
                loadLocationForecast={this.setLocation.bind(this)}
              />}
            /> */}
            <Route path='/calendar/:id' component={Day} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
