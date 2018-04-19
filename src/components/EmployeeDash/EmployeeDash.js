import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';

import EmployeeSchedule from '../EmployeeSchedule/EmployeeSchedule'
import { Divider, FlatButton, RaisedButton } from "material-ui";
import EmployeeRequestTO from "../EmployeeRequestTO/EmployeeRequestTO";
import EmployeeRequestDash from "../EmployeeRequestDash/EmployeeRequestDash";

import './EmployeeDash.css'

class EmployeeDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            drawerOpen: false,
         }
    }

    handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    handleClose = () => this.setState({drawerOpen: false});

    render() { 
        return ( 
            <div>
                <AppBar 
                    title="Employee Dashboard"
                    className="employee-app-bar"
                    onLeftIconButtonClick={this.handleToggle}
                    
                />

                 <Switch>
                    <Route 
                        path='/employee/' exact  
                        component={EmployeeSchedule} />
                    <Route 
                        path='/employee/dash' 
                        component={EmployeeSchedule} />
                    <Route 
                        path='/employee/requestto' 
                        component={EmployeeRequestTO} />
                    <Route 
                        path='/employee/requestdash' 
                        component={EmployeeRequestDash} />
                </Switch>   

                <Drawer
                    
                    docked={false}
                    width={200}
                    open={this.state.drawerOpen}
                    onRequestChange={(boolIn) => this.setState({drawerOpen: boolIn})}
                >
                    
                    <List>

                    <Subheader>Schedule</Subheader>
                    <ListItem
                        primaryText="My Schedule"
                        href="/#/employee/dash"
                        onClick={this.handleClose}
                        />
                    
                    <Divider />
                    <Subheader>Requests</Subheader>

                    <ListItem
                        primaryText="Time Off"
                        href="/#/employee/requestdash"
                        onClick={this.handleClose}
                        />

                    <ListItem
                        primaryText="Shift Trades"
                        href="/#/employee/RequestTO"
                        onClick={this.handleClose}
                        />

                    <Divider />
                  
                        
                   
                    </List>
                    
                    
                    
                    
                    
                    
                   
                </Drawer>
            </div>
         )
    }
}


 
export default EmployeeDash;