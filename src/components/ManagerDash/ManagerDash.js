import React from "react";
import {Switch, Route} from 'react-router-dom';

import RosterDetail from '../RosterDetail/RosterDetail'
import PatternModify from '../PatternModify/PatternModify'
import ExceptionModify from '../ExceptionModify/ExceptionModify'

import AppBar from 'material-ui/AppBar';
import ManagerRoster from '../ManagerRoster/ManagerRoster'
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';



class ManagerDash extends React.Component {

   
    render(){

        return(
            <div>

                <AppBar 
                    title="Dash"
                    
                />
                
                <Switch>
                    <Route 
                        path='/managerdash' exact 
                        component={ManagerRoster} />
                    
                    <Route 
                        path='/managerdash/:empid/detail/' 
                        component={RosterDetail} />

                    <Route 
                        path='/managerdash/:empid/pattern'
                        component={PatternModify} />
                    <Route 
                        path='/managerdash/:empid/schedule'
                        component={ExceptionModify} />

                </Switch>
                
            </div>
        )
    }
}

export default ManagerDash;