import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux'
import {getUserData} from '../../dux/reducer'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';

import EmployeeSchedule from '../EmployeeSchedule/EmployeeSchedule'
import { Divider, FlatButton, RaisedButton } from "material-ui";
import EmployeeRequestTO from "../EmployeeRequestTO/EmployeeRequestTO";
import EmployeeRequestDash from "../EmployeeRequestDash/EmployeeRequestDash";
import Avatar from 'material-ui/Avatar'
import LaunchIcon from 'material-ui/svg-icons/action/launch'

import './EmployeeDash.css'
import UserProfileView from "../UserProfileView/UserProfileView";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";

class EmployeeDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            drawerOpen: false,
         }
    }

    componentDidMount(){
        this.props.getUserData()
    }

    handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    handleClose = () => this.setState({drawerOpen: false});


    
    render() { 
        let profilePath = this.props.user.mgr ? "manager" : "employee"    
        
        return ( 
            <div>
                <AppBar 
                    className="employee-app-bar"
                    title="Employee Mode"
                    style={{position:"fixed"}}
                    onLeftIconButtonClick={this.handleToggle}
                />

                 <Switch>
                    <Route 
                        path='/employee/' exact  
                        component={EmployeeSchedule} />

                    <Route
                        exact 
                        path='/employee/myprofile' 
                        component={UserProfileView} />
                    
                   
                    <Route 
                        path='/employee/myprofile/edit' 
                        component={UserProfileEdit} />                    

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
                    <ListItem 
                        primaryText="My Profile" 
                        onClick={this.handleClose}
                        leftAvatar={<Avatar src={this.props.user.profile_pic}/>}
                        href={`/#/${profilePath}/myprofile`}/>
                    <ListItem 
                        leftIcon={<LaunchIcon />} 
                        primaryText="Log Out" 
                        href={process.env.REACT_APP_LOGOUT}
                        onClick={this.handleClose} />
                    <ListItem
                        primaryText="Switch to Manager Mode"
                        href="/#/manager/dash"
                        onClick={this.handleClose}
                        />

                    <Divider />

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

                    {/* <ListItem
                        primaryText="Shift Trades"
                        href="/#/employee/RequestTO"
                        onClick={this.handleClose}
                        /> */}

                    <Divider />

                    </List>
                   
                </Drawer>
            </div>
         )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

 
export default connect(mapStateToProps, {getUserData}) (EmployeeDash);