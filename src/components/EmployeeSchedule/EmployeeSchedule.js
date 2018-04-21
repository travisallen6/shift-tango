import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserData} from '../../dux/reducer'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import ForwardIcon from 'material-ui/svg-icons/navigation/chevron-right'
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left'
import DateRangeIcon from 'material-ui/svg-icons/action/date-range'


import Schedule from '../Schedule/Schedule'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'

import './EmployeeSchedule.css'

class EmployeeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            baseDate: moment().format("YYYY-MM-DD"),
            lastName: '',
            firstName: '',
            pattern: {},
            scheduleExceptions: [],
            datePickerShowing: false,
            dateSelectInput: moment().toDate(),
            
        }
    }




    // componentDidMount(){
    //    this.props.getUserData()
    // }

    componentWillReceiveProps(newProps){
            axios.get(`/api/employee/${newProps.user.emp_id}/detail`)
            .then( empData =>{
                let { profile: { last_name, first_name, sun, mon, tue, wed, thu, fri, sat } } = empData.data
                let scheduleExceptions = empData.data.exceptions

                this.setState({
                    lastName: last_name,
                    firstName: first_name,
                    pattern: { sun, mon, tue, wed, thu, fri, sat },
                    scheduleExceptions: scheduleExceptions

                })
            })

        }

    toggleDateClick() {
        this.setState({
            datePickerShowing: !this.state.datePickerShowing
        })
    }

    cycleDate(date){
        let objDate = moment(date).toDate()

        this.setState({
            baseDate: date,
            dateSelectInput: objDate
        })
    }

    render() { 
        let { profilePic, lastName, firstName, pattern, baseDate } = this.state 

        let dateBack = moment(baseDate).subtract(1, "w").format("YYYY-MM-DD")
        let dateForward = moment(baseDate).add(1, "w").format("YYYY-MM-DD")

        let yearStart = moment(this.state.baseDate).startOf("week").format("YYYY")
        let yearEnd = moment(this.state.baseDate).endOf("week").format("YYYY")

        let yearDisplay = yearStart === yearEnd 
            ? yearStart
            : `${yearStart} - ${yearEnd}`        

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'  
        }

        return ( 
            <div className="employee-schedule-container">
                < Paper 
                    style={paperStyles} 
                    zDepth={1} 
                >
                    <Subheader
                        style={{padding: 0, fontSize:32}}
                    >
                        My Schedule
                    </Subheader>
                    <div className="pattern-sub-container">
                        
                        <FlatButton
                            primary={true}
                            icon={<DateRangeIcon />}
                            onClick={ ()=>this.toggleDateClick() }
                        />
                     
                    </div>    
                    <div className="exception-button-container">

                        <FlatButton
                            secondary={true}
                            icon={<BackIcon />}
                            onClick={ ()=>this.cycleDate(dateBack) }
                        />
                        <div className="exception-modify-year">
                            {yearDisplay}
                        </div>

                        <FlatButton
                            secondary={true}
                            icon={<ForwardIcon />}
                            onClick={()=>this.cycleDate(dateForward)}
                        />
                    </div> 
                    {this.state.datePickerShowing &&<div className="exception-date-picker">
                        <DatePicker
                            hintText="Jump to Date"
                            value={this.state.dateSelectInput}
                            onChange={this.handleDateInputChange}
                            firstDayOfWeek={0}
                            autoOk={true}
                            okLabel="Jump"
                        />
                    </div>}       
                    <Divider />
                    <Schedule 
                        dateLabel={true}
                        pattern={ pattern }
                        exceptions={ this.state.scheduleExceptions }
                        baseDate={ baseDate }
                        selection="mixed"
                        checkFunction={(schedule)=>this.checkSchedule(schedule)}
                        primaryBtnLabel="save"
                        // secondaryBtnLabel="back"
                        // secondaryBtnFunction={this.handleRedirect}

                    />
                    
                    
                </Paper>
            </div>
         )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}
 
export default connect(mapStateToProps)(EmployeeSchedule);