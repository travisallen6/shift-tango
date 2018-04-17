import React, { Component } from 'react';
import axios from 'axios'

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { grey500 } from 'material-ui/styles/colors'

import RosterDetail from '../RosterDetail/RosterDetail'
import ExceptionModify from '../ExceptionModify/ExceptionModify'
import PatternModify from '../PatternModify/PatternModify'

import './EmployeeControl.css'

class EmployeeControl extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            slideIndex: 0,
            lastName: '',
            firstName: '',
            profilePic: '',
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

    render() { 
        return ( 
            <div>
                <Tabs
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
                    
                    <FlatButton
                        className="emp-control-close-btn"
                        href={"/#/manager/dash"}
                        icon={<CloseIcon color={grey500}/>}
                        style={{position:'absolute', top: -14, right: -4}}
                    />

                </div>
                                
                <SwipeableViews
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
                        />

                    </div>
                    <div>
                        <PatternModify 
                            empid={this.props.match.params.empid}
                        />
                    </div>
                
                </SwipeableViews>


            </div>
         )
    }
}
 
export default EmployeeControl;