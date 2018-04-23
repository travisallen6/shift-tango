import React, { Component } from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom'
import Login from './components/Login/Login'
import ProfileComplete from './components/ProfileComplete/ProfileComplete'
import ManagerDash from './components/ManagerDash/ManagerDash'
import PatternModify from './components/PatternModify/PatternModify'
import RosterDetail from './components/RosterDetail/RosterDetail';
import EmployeeDash from './components/EmployeeDash/EmployeeDash';
import NotAuthorized from './components/NotAuthorized/NotAuthorized'


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/finishprofile' component={ProfileComplete} />
            <Route path='/manager' component={ManagerDash} />
            <Route path='/employee' component={EmployeeDash} />
            <Route path='/notauthorized' component={NotAuthorized} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
