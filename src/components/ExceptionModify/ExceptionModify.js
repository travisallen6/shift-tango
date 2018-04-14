import React, { Component } from 'react';
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import ForwardIcon from 'material-ui/svg-icons/navigation/chevron-right'
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left'

// import {Redirect} from 'react-router-dom'

import Schedule from '../Schedule/Schedule'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'

import './ExceptionModify.css'


class ExceptionModify extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            baseDate: moment().format("YYYY-MM-DD"),
            lastName:'',
            firstName: '',
            profilePic: '',
            pattern: {},
            scheduleExceptions: [],

        }
    }

    componentDidMount(){
        axios.get(`/api/employee/${205301}/detail`)
        // axios.get(`/api/employee/${this.props.match.params.empid}/detail`)
        .then( empData =>{
            let { profile: { last_name, first_name, profile_pic, sun, mon, tue, wed, thu, fri, sat } } = empData.data
            let scheduleExceptions = empData.data.exceptions

            this.setState({
                lastName: last_name,
                firstName: first_name,
                profilePic: profile_pic,
                pattern: { sun, mon, tue, wed, thu, fri, sat },
                scheduleExceptions: scheduleExceptions

            })
        })
    }
    
    cycleDate(date){
        this.setState({
            baseDate: date
        })
    }
    
    render() {
        let { profilePic, lastName, firstName, pattern, baseDate } = this.state 
        let dateBack = moment(baseDate).subtract(1, "w").format("YYYY-MM-DD")
        let dateForward = moment(baseDate).add(1, "w").format("YYYY-MM-DD")

        return ( 
            <div className="exception-container">
                <div className="pattern-name-header">
                    <Avatar
                        src={profilePic}
                        size={100}
                        style={{marginRight:'18px'}}
                        />
                    <div><h1>{`${lastName}, ${firstName}`}</h1></div>
                </div>
                <Paper 
                    zDepth={1} 
                    style={{width:'90%', padding:'20px'}}
                >
                    <div className="pattern-sub-container">
                        <FlatButton
                            secondary={true}
                            icon={<BackIcon />}
                            onClick={ ()=>this.cycleDate(dateBack) }
                        />


                        <Subheader
                            style={{
                                fontSize:28, 
                                textAlign:"center", 
                                paddingLeft: 0
                            }}
                        > 
                            Schedule
                        </Subheader>

                        <FlatButton
                            secondary={true}
                            icon={<ForwardIcon />}
                            onClick={()=>this.cycleDate(dateForward)}
                        />

                    </div>    
                    <Divider />
                    <Schedule 
                        dateLabel={true}
                        pattern={ pattern }
                        exceptions={ this.state.scheduleExceptions }
                        baseDate={ baseDate }
                        selection="mixed"
                        // checkFunction={(pattern)=>this.checkPattern(pattern)}
                    />
                     {/* <Snackbar
                        open={this.state.snackbarOpen}
                        message={ "Pattern saved" }
                        contentStyle={{color: lightGreen800}}
                        bodyStyle={{background:lightGreen100}}
                        autoHideDuration={500}
                        onRequestClose={this.handleSnackbarClose}
                    /> */}
                    
                </Paper>
                
            </div> 
        )
    }
}



 
export default ExceptionModify;