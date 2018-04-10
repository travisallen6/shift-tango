import React, { Component } from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom'
import Login from './components/Login/Login'
import ProfileComplete from './components/ProfileComplete/ProfileComplete'
import ManagerDash from './components/ManagerDash/ManagerDash'
import PatternModify from './components/PatternModify/PatternModify'
import RosterDetail from './components/RosterDetail/RosterDetail';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/finishprofile' component={ProfileComplete} />
            <Route path='/managerdash' component={ManagerDash} />
            <Route path='/managerdash/:empid/detail/' component={RosterDetail} />
            <Route path='/managerdash/pattern' component={PatternModify}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
