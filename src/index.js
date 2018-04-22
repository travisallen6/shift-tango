import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux'
import store from './dux/store'
import {deepOrange600} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({palette: {accent1Color: deepOrange600} })}>
        <App />
    </MuiThemeProvider>    
</Provider>
    , document.getElementById('root'));
