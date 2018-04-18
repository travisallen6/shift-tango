import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';

import EmployeeSchedule from '../EmployeeSchedule/EmployeeSchedule'
import { Divider } from "material-ui";
import EmployeeRequestTO from "../EmployeeRequestTO/EmployeeRequestTO";

class EmployeeDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            drawerOpen: false,
         }
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() { 
        return ( 
            <div>
                <AppBar 
                    title="Employee Dashboard"
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
                </Switch>   

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(boolIn) => this.setState({drawerOpen: boolIn})}
                >
                    <List>
                    <Subheader>My Schedule</Subheader>

                    <ListItem
                        primaryText="Time Off Request"
                        href="/#/employee/RequestTO"
                        onClick={this.handleClose}
                    />

                    <ListItem
                        primaryText="Shift Trade"
                        href="/#/employee/RequestTO"
                        onClick={this.handleClose}
                    />

                    <Divider />
                   
                    </List>
                    
                    
                    
                    
                    
                    {/* <MenuItem
                        href='/#/employee/timeoff' 
                        onClick={this.handleClose}
                    >
                        Request Time Off
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Trade Shifts</MenuItem> */}
                </Drawer>
            </div>
         )
    }
}


 
export default EmployeeDash;