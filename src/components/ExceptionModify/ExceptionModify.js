import React, { Component } from 'react';
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import ForwardIcon from 'material-ui/svg-icons/navigation/chevron-right'
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left'
import DateRangeIcon from 'material-ui/svg-icons/action/date-range'

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
            dateSelectInput: moment().toDate(),
            datePickerShowing: false

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
        let objDate = moment(date).toDate()

        this.setState({
            baseDate: date,
            dateSelectInput: objDate
        })
    }

    handleDateInputChange = (event, value) => {
        let stringDate = moment(value).format("YYYY-MM-DD")

        this.setState({
            baseDate: stringDate,
            dateSelectInput: value
        })
    }

    toggleDateClick() {
        this.setState({
            datePickerShowing: !this.state.datePickerShowing
        })
    }


    checkSchedule(schedule){
    
        let evalPattern = schedule.map( (shift, i) => {
        
        

        if(shift.isOff){
            return {
                date: shift.date, 
                shift: "OFF",
                inputsShowing: shift.inputsShowing,
                type: shift.type,
                typeInput: shift.typeInput
            }
            
        } else if (shift.inputsShowing) {
            let shiftTimes = {
                start: shift.timeInputStart, 
                end: shift.timeInputEnd
            }

            if(shiftTimes.start > shiftTimes.end){
            shiftTimes.end = moment(shiftTimes.end).add(1, "d").toDate()
            }
            return {
                date: shift.date,
                shift: shiftTimes,
                inputsShowing: shift.inputsShowing,
                type: shift.type,
                typeInput: shift.typeInput
            } 
            
        } else {
            let defaultShiftStart = moment(`${shift.date} ${shift.timeValueStart}`, "YYYY-MM-DD hh:mm a").toDate()
            let defaultShiftEnd = moment(`${shift.date} ${shift.timeValueEnd}`, "YYYY-MM-DD hh:mm a").toDate()

            let defaultShiftTimes = {
                start: defaultShiftStart,
                end: defaultShiftEnd,
            }

            if(defaultShiftTimes.start > defaultShiftTimes.end){
                defaultShiftTimes.end = moment(defaultShiftTimes.end).add(1, "d").toDate()
            }

            return {
                date: shift.date,
                shift: defaultShiftTimes,
                inputsShowing: shift.inputsShowing,
                type: shift.type,
                typeInput: shift.typeInput
            }
        }
        })

        
        let errors = evalPattern.map( (evalShift, i, arr) => {

            
            if(evalShift.shift === "OFF" && shift.!inputsShowing){
                return null
            } 
            
            let startValid = moment(evalShift.shift.start).isValid()
            let endValid = moment(evalShift.shift.end).isValid()
            
            let weekDay = moment(evalShift.date).format("ddd")
            if (!startValid || !endValid) {
                let error = <div><strong>{weekDay}:</strong> One or more inputs contains an invalid time</div>
                return error
            }
            
            if(i === 0 ){
                let firstCompareShift = {...arr[6]}
                let firstWeekDay = moment(evalShift.date).format("ddd")
                let firstCompareWeekDay = moment(firstCompareShift.date).format("ddd")

                if(firstCompareShift.shift === "OFF"){
                    return null
                }
                
                if(evalShift.shift.start < moment(firstCompareShift.shift.end).subtract(7, "days")){
                    let error = <div><strong>Shift Overlap:</strong> {firstWeekDay}(start) cannot come before {firstCompareWeekDay}(end)</div>
                    return error
                }
                
                return null

               

            } else {
                let otherCompareShift = {...arr[i - 1]}
                let otherWeekDay = moment(evalShift.date).format("ddd")
                let otherCompareWeekDay = moment(otherCompareShift.date).format("ddd")
                
                if(otherCompareShift.shift === "OFF"){
                    return null
                }
                
                if(evalShift.shift.start < otherCompareShift.shift.end){
                    let error = <div><strong>Shift Overlap:</strong> {otherWeekDay}(start) cannot come before {otherCompareWeekDay}(end)</div>
                    return error
                }
                
                return null
            }
        })

        let allErrors = errors.filter( error => {
            return error !== null
        })

        if (allErrors.length > 0){
            this.setState({
                errorMessage: allErrors,
                dialogOpen: true
            })
        } else {

            let preFlightPattern = evalPattern.map( patternShift =>{
                if(patternShift.shift ==="OFF" ){
                    return "OFF"
                } else {
                    let start = moment(patternShift.shift.start).format('HHmm')
                    let end = moment(patternShift.shift.end).format('HHmm')
                    return `${start}-${end}`
                }
            })

            // axios.post(`/api/employee/${this.state.empId}/pattern`, {pattern: preFlightPattern})
            // .then(
            //     this.setState({
            //         snackbarOpen: true
            //     })
            // )
        }
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
                        


                        <Subheader
                            style={{
                                fontSize:28, 
                                textAlign:"center", 
                                paddingLeft: 0
                            }}
                        > 
                            Schedule
                        </Subheader>

                    </div>    
                    <div className="exception-modify-year">
                        {yearDisplay}
                    </div>
                    <div className="exception-button-container">

                        <FlatButton
                            secondary={true}
                            icon={<BackIcon />}
                            onClick={ ()=>this.cycleDate(dateBack) }
                        />

                        <FlatButton
                            primary={true}
                            icon={<DateRangeIcon />}
                            onClick={ ()=>this.toggleDateClick() }
                        />
                            
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