import React from "react";
import {Switch, Route} from 'react-router-dom';

import RosterDetail from '../RosterDetail/RosterDetail'
import PatternModify from '../PatternModify/PatternModify'
import ExceptionModify from '../ExceptionModify/ExceptionModify'
import ManagerProfileEdit from '../ManagerProfileEdit/ManagerProfileEdit'
import AddEmployee from '../AddEmployee/AddEmployee'
import EmployeeControl from '../EmployeeControl/EmployeeControl'

import AppBar from 'material-ui/AppBar';
import ManagerRoster from '../ManagerRoster/ManagerRoster'
import ManagerTOReview from "../ManagerTOReview/ManagerTOReview";
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';



class ManagerDash extends React.Component {

   
    render(){

        return(
            <div>

                <AppBar 
                    title="Dash"
                    className="manager-app-bar"
                    
                />
                
                <Switch>
                    <Route 
                        path='/manager/' exact  
                        component={ManagerRoster} />
                    <Route 
                        path='/manager/dash' 
                        component={ManagerRoster} />
                    
                    <Route
                        path='/manager/control/:empid'
                        component={EmployeeControl}
                    />
                    
                    <Route 
                        path='/manager/detail/:empid' 
                        component={RosterDetail} />

                    <Route 
                        path='/manager/addemployee' 
                        component={ AddEmployee } />
                    
                    <Route 
                        path='/manager/edit/:empid' 
                        component={ ManagerProfileEdit } />

                    <Route 
                        path='/manager/pattern/:empid'
                        component={PatternModify} />
                    <Route 
                        path='/manager/schedule/:empid'
                        component={ExceptionModify} />
                    <Route 
                        path='/manager/timeoff/review'
                        component={ManagerTOReview} />

                </Switch>
                
            </div>
        )
    }
}

export default ManagerDash;