import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import AppBar from 'material-ui/AppBar'

import EmployeeSchedule from '../EmployeeSchedule/EmployeeSchedule'

class EmployeeDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stuff: ''
         }
    }
    render() { 
        return ( 
            <div>
                <AppBar 
                    title="Employee Dashboard"
                    
                />

                 <Switch>
                    <Route 
                        path='/employee/' exact  
                        component={EmployeeSchedule} />
                    <Route 
                        path='/employee/dash' 
                        component={EmployeeSchedule} />
                </Switch>   
            </div>
         )
    }
}


 
export default EmployeeDash;