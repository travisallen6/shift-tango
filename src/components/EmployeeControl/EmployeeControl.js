import React, { Component } from 'react';
import axios from 'axios'

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import Snackbar from 'material-ui/Snackbar'
import { grey500, lightGreen800, lightGreen100 } from 'material-ui/styles/colors'

import RosterDetail from '../RosterDetail/RosterDetail'
import ExceptionModify from '../ExceptionModify/ExceptionModify'
import PatternModify from '../PatternModify/PatternModify'
import Loading from '../Loading/Loading'

import './EmployeeControl.css'

class EmployeeControl extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            slideIndex: 0,
            lastName: '',
            firstName: '',
            profilePic: '',
            snackbarOpen: false
         }
    }

        componentDidMount(){
        let { empid } = this.props.match.params
        axios.get(`/api/employee/${empid}/detail`)
        // axios.get(`/api/employee/${this.props.match.params.empid}/detail`)
        .then( empData =>{
            let { profile: { last_name, first_name, profile_pic} } = empData.data

            this.setState({
                lastName: last_name,
                firstName: first_name,
                profilePic: profile_pic,
            })
        })
    }

    handleTabChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };



    snackbar = () => {
        this.setState({
            snackbarOpen: true
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false
        })
    }

    render() {
        if(!this.state.lastName) {
            return <Loading />
        } 
        return ( 
            <div className="emp-control-container">
                <Tabs
                    className="emp-control-tabs"
                    // style={{position:"fixed"}}
                    onChange={this.handleTabChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Profile" value={0} />
                    <Tab label="Schedule" value={1} />
                    <Tab label="Pattern" value={2} />

                </Tabs>
                <div className="emp-control-name-header">
                    <Avatar
                        className="emp-control-avatar"
                        src={this.state.profilePic}
                        size={100}
                        />
                    <div className="emp-control-name"><h1>{`${this.state.lastName}, ${this.state.firstName}`}</h1></div>
                    

                </div>
                    <FlatButton
                        className="emp-control-close-btn"
                        href={"/#/manager/dash"}
                        icon={<CloseIcon color={grey500}/>}
                        style={{position:'absolute', top: 115, right: 0}}
                    />
                                
                <SwipeableViews
                    className="emp-control-swipers"
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}
                >
                    <div>
                        <RosterDetail 
                            empid={this.props.match.params.empid}
                        />
                    </div>
                    <div>
                        <ExceptionModify 
                            empid={this.props.match.params.empid}
                            slideIndex={this.state.slideIndex}
                            snackbar={this.snackbar}
                        />

                    </div>
                    <div>
                        <PatternModify 
                            empid={this.props.match.params.empid}
                            snackbar={this.snackbar}
                        />
                    </div>
                
                </SwipeableViews>
                <Snackbar
                        open={this.state.snackbarOpen}
                        message={ "Done!" }
                        contentStyle={{color: lightGreen800}}
                        bodyStyle={{background:lightGreen100}}
                        autoHideDuration={500}
                        onRequestClose={this.handleSnackbarClose}
                    />


            </div>
         )
    }
}
 
export default EmployeeControl;