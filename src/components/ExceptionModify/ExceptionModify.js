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
            empId: '',
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
            let { profile: { last_name, first_name, emp_id, profile_pic, sun, mon, tue, wed, thu, fri, sat } } = empData.data
            let scheduleExceptions = empData.data.exceptions

            this.setState({
                lastName: last_name,
                firstName: first_name,
                empId: emp_id,
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
    
        let evalSchedule = schedule.map( (shift, i) => {
        
        

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

        
        let errors = evalSchedule.map( (evalShift, i, arr) => {

            
            if(evalShift.shift === "OFF" ){
                return null
            } 
            
            let startValid = moment(evalShift.shift.start).isValid()
            let endValid = moment(evalShift.shift.end).isValid()
            
            let weekDay = moment(evalShift.date).format("ddd")
            if (!startValid || !endValid) {
                let error = <div><strong>{weekDay}:</strong> One or more inputs contains an invalid time</div>
                return error
            }

            let compareShift

            
            if(i === 0 ){
                // Get the day before the first day of the current display schedule for comparison
                let firstCompareDate = moment(evalShift.date).subtract(1,"d").format("YYYY-MM-DD")
                
                

                // Search for a matching exception
                let matchingCompareException = this.state.scheduleExceptions.filter( excShift =>{
                    return excShift.date === firstCompareDate
                })

                // If an exception matches, use that shift, if not use the pattern shift for that day
                let firstCompareSchedule = matchingCompareException.length > 0 
                    ? { 
                        date: matchingCompareException.date,
                        shift: matchingCompareException.shift,
                        type: matchingCompareException.type
                    }
                    : {
                        date: firstCompareDate,
                        shift: this.state.pattern.sat,
                        type: "pattern"
                    }
                
                // No errors if the comparison shift is off
                if(firstCompareSchedule.shift === "OFF") return null

                else {
                    let { date, shift, type } = firstCompareSchedule

                    let parsedShift = shift.split("-")
                    
                    let start = parsedShift[0]

                    let end = parsedShift[1]

                    let momentStart = moment(`${date} ${start}, YYYY-MM-DD HHmm`).toDate()
                    let momentEnd = moment(`${date} ${end}, YYYY-MM-DD HHmm`).toDate()

                    if(momentEnd < momentStart){
                        momentEnd = moment(momentEnd).add(1,"d").toDate()
                    }

                    compareShift = {
                        date: date,
                        shift: {
                            start: momentStart,
                            end: momentEnd
                        },
                        type: type
                    }
                }
            } else if(i === 6) {
                // Get the day after the last day of the current display schedule for comparison
                let lastCompareDate = moment(evalShift.date).add(1,"d").format("YYYY-MM-DD")
                
                

                // Search for a matching exception
                let matchingCompareException = this.state.scheduleExceptions.filter( excShift =>{
                    return excShift.date === lastCompareDate
                })

                // If an exception matches, use that shift, if not use the pattern shift for that day
                let lastCompareSchedule = matchingCompareException.length > 0 
                    ? { 
                        date: matchingCompareException.date,
                        shift: matchingCompareException.shift,
                        type: matchingCompareException.type
                    }
                    : {
                        date: lastCompareDate,
                        shift: this.state.pattern.sun,
                        type: "pattern"
                    }
                
                // No errors if the comparison shift is off
                if(lastCompareSchedule.shift === "OFF") return null

                else {
                    let { date, shift, type } = lastCompareSchedule

                    let parsedShift = shift.split("-")
                    
                    let start = parsedShift[0]

                    let end = parsedShift[1]

                    let momentStart = moment(`${date} ${start}, YYYY-MM-DD HHmm`).toDate()
                    let momentEnd = moment(`${date} ${end}, YYYY-MM-DD HHmm`).toDate()

                    if(momentEnd < momentStart){
                        momentEnd = moment(momentEnd).add(1,"d").toDate()
                    }

                    compareShift = {
                        date: date,
                        shift: {
                            start: momentStart,
                            end: momentEnd
                        },
                        type: type
                    }
                }

            } else {
                compareShift = {...arr[i-1]}
            }

            if( compareShift.shift.end > evalShift.shift.start ) {
                let compareShiftDate = moment(compareShift.date)
                    .format("MM/DD/YY")
                let firstCompareEnd = moment(compareShift.shift.end)
                    .format("hh:mm a")
               
                    let evalShiftDate = moment(evalShift.date)
                    .format("MM/DD/YY")
                let evalShiftStart = moment(evalShift.shift.start)
                    .format("hh:mm a")
               
                    // Shift overlap: Sat 12/31/18 end: 05:00 am conflicts with Sun 01/01/19 start: 04:00 am 

                let error = <div><strong>Shift Overlap:</strong> {compareShiftDate}end: { firstCompareEnd } conflicts with { evalShiftDate } start: { evalShiftStart }</div>
            
                return error
            }


            return null
        })

        let allErrors = errors.filter( error => {
            return error !== null
        })

        let excToSend = evalSchedule.filter( exception => {
            return exception.inputsShowing === true
        })

        // let excErrors = excToSend.map( exception => {
        //     let currExcMatch = this.state.exceptions.filter( exc =>{
        //         return exc.date === exception.date
        //     })

        //     if(currExcMatch.length > 0){
        //         let exceptionDisplayDate = moment(exception.date).format("MM/DD/YY")
        //         let error = <div><strong>Exception Conflict:</strong> An exception already exists for { exceptionDisplayDate }. Submitting anyway will </div>
        //     }

        //     return null
        // })

        
        if (allErrors.length > 0){
            this.setState({
                errorMessage: allErrors,
                dialogOpen: true
            })

        } else {
            let preFlightExceptions = excToSend.map( exception => {
                let excType = exception.typeInput.length > 0 
                    ? exception.typeInput
                    : "?"

                if(exception.shift === "OFF"){
                    return {
                        date: exception.date,
                        type: excType,
                        shift: "OFF" 
                    }
                } else {
                    let excStart = moment(exception.shift.start).format("HHmm")  
                    let excEnd = moment(exception.shift.end).format("HHmm")  
                    let excShift = `${excStart}-${excEnd}`

                    return {
                        date: exception.date,
                        type: excType,
                        shift: excShift
                    }
                }
            })

            axios.post(`/api/employee/${this.state.empId}/exception`, {exceptions: preFlightExceptions})
            .then( postExceptionResponse => {

                axios.get(`/api/employee/${this.state.empId}/exception`)
                .then( returnedExceptions =>{
                    
                    this.setState({ scheduleExceptions: returnedExceptions.data })
                })
            })

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