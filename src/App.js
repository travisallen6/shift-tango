import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
          </Switch>

        </HashRouter>
      </div>
    );
  }
}

export default App;
