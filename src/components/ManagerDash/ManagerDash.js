import React from "react";
import {Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux'
import {getUserData} from '../../dux/reducer'

import RosterDetail from '../RosterDetail/RosterDetail'
import PatternModify from '../PatternModify/PatternModify'
import ExceptionModify from '../ExceptionModify/ExceptionModify'
import ManagerProfileEdit from '../ManagerProfileEdit/ManagerProfileEdit'
import AddEmployee from '../AddEmployee/AddEmployee'
import EmployeeControl from '../EmployeeControl/EmployeeControl'
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import { Divider, } from "material-ui";

import Avatar from 'material-ui/Avatar'
import LaunchIcon from 'material-ui/svg-icons/action/launch'
import AppBar from 'material-ui/AppBar';
import ManagerRoster from '../ManagerRoster/ManagerRoster'
import ManagerTOReview from "../ManagerTOReview/ManagerTOReview";
import UserProfileView from "../UserProfileView/UserProfileView";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";


class ManagerDash extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            drawerOpen: false,
        }
    }

    componentDidMount(){
        this.props.getUserData()
    }

    handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    handleClose = () => this.setState({drawerOpen: false});

   
    render(){

        let profilePath = this.props.user.mgr ? "manager" : "employee"

        return(
            <div>

                <AppBar 
                    className="manager-app-bar"
                    title="Shift Tango"
                    style={{position:"fixed"}}
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Switch>
                    <Route 
                        path='/manager/' exact  
                        component={ManagerRoster} />

                    <Route 
                        exact
                        path='/manager/myprofile' 
                        component={UserProfileView} />
                        
                    <Route 
                        path='/manager/myprofile/edit' 
                        component={UserProfileEdit} />

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
                    <ListItem 
                        primaryText="My Profile" 
                        onClick={this.handleClose}
                        leftAvatar={<Avatar src={this.props.user.profile_pic}/>}
                        href={`/#/${profilePath}/myprofile`}/>
                    <ListItem 
                        leftIcon={<LaunchIcon />} 
                        primaryText="Log Out" 
                        href={process.env.REACT_APP_LOGOUT}
                        onClick={this.handleClose} 
                    />
                    <Divider />
                    <Subheader>Employees</Subheader>
                    <ListItem
                        primaryText="Employee Roster"
                        href="/#/manager/dash"
                        onClick={this.handleClose}
                        />
                    <ListItem
                        primaryText="Load an Employee"
                        href="/#/manager/addemployee"
                        onClick={this.handleClose}
                        />
                    <Divider />
                    <Subheader>Requests</Subheader>
                    <ListItem
                        primaryText="Time Off"
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

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserData})(ManagerDash);