import React from "react";
import {Switch, Route} from 'react-router-dom';

import RosterDetail from '../RosterDetail/RosterDetail'
import PatternModify from '../PatternModify/PatternModify'
import ExceptionModify from '../ExceptionModify/ExceptionModify'
import ManagerProfileEdit from '../ManagerProfileEdit/ManagerProfileEdit'
import AddEmployee from '../AddEmployee/AddEmployee'
import EmployeeControl from '../EmployeeControl/EmployeeControl'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import { Divider, FlatButton, RaisedButton } from "material-ui";


import AppBar from 'material-ui/AppBar';
import ManagerRoster from '../ManagerRoster/ManagerRoster'
import ManagerTOReview from "../ManagerTOReview/ManagerTOReview";
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';



class ManagerDash extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            drawerOpen: false,
        }
    }

    handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    handleClose = () => this.setState({drawerOpen: false});

   
    render(){

        return(
            <div>

                <AppBar 
                    className="manager-app-bar"
                    onLeftIconButtonClick={this.handleToggle}
                    
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

                <Drawer
                    
                    docked={false}
                    width={200}
                    open={this.state.drawerOpen}
                    onRequestChange={(boolIn) => this.setState({drawerOpen: boolIn})}
                >
                    
                    <List>

                    <Subheader>Manage Schedules</Subheader>
                    <ListItem
                        primaryText="Employee Roster"
                        href="/#/manager/dash"
                        onClick={this.handleClose}
                        />
                    <ListItem
                        primaryText="Review Time Off Requests"
                        href="/#/manager/timeoff/review"
                        onClick={this.handleClose}
                        />
                    
                  

                    <Divider />
                  
                        
                   
                    </List>
                    
                    
                    
                    
                    
                    
                   
                </Drawer>
                
            </div>
        )
    }
}

export default ManagerDash;