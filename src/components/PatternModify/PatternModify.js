import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lightGreen800, lightGreen100 } from 'material-ui/styles/colors'
import {Redirect} from 'react-router-dom'

import moment from 'moment'

import './PatternModify.css'



class PatternModify extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            pattern: props.pattern,
            profilePic: '',
            lastName: '',
            firstName: '',
            empId: '',
            errorMessage: [],
            snackbarOpen: false,
            dialogOpen: false,
            redirect: false

         }
    }

    componentDidMount(){
        axios.get(`/api/employee/${this.props.empid}/pattern`)
        .then( empData => {
           let{ sun, mon, tue, wed, thu, fri, sat, profile_pic, last_name, first_name, emp_id } = empData.data[0]
            let empPattern = {sun, mon, tue, wed, thu, fri, sat}

            this.setState({
                pattern: empPattern,
                profilePic: profile_pic,
                lastName:last_name,
                firstName: first_name,
                empId: emp_id

            })
        } )
    }

    checkPattern(pattern){
    
        let evalPattern = pattern.map( (shift, i) => {

        if(shift.isOff){
            return {
                date: shift.date, 
                shift: "OFF"
            }
            
        } else if (shift.inputsShowing) {
            let shiftTimes = {start: shift.timeInputStart, end: shift.timeInputEnd}
            if(shiftTimes.start > shiftTimes.end){
            shiftTimes.end = moment(shiftTimes.end).add(1, "d").toDate()
            }
            return {
                date: shift.date,
                shift: shiftTimes,
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
            }
        }
        })

        
        let errors = evalPattern.map( (evalShift, i, arr) => {

            
            if(evalShift.shift === "OFF"){
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

            axios.post(`/api/employee/${this.state.empId}/pattern`, {pattern: preFlightPattern})
            .then(
                this.setState({
                    snackbarOpen: true
                })
            )
            let htmlMessage = changedScheduleEmail(this.state.lastName, this.state.firstName, excToSend)

            let emailContent = {
                subject: "Your schedule has been changed",
                html: htmlMessage
            }

            axios.post(`api/sendemail/${this.state.empId}`, emailContent)
            .then( response => {

            })
            
        }
    }

    handleSnackbarClose = () => {
        this.setState({
            redirect: true,
        });
      };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
        })
    }
    
    render() {
        
        let { profilePic, lastName, firstName } = this.state 
        return (
            <div className="pattern-modify-container">
                {this.state.redirect && <Redirect to={`/manager/detail/${this.state.empId}/`} />}
                <Dialog
                        title="Errors"
                        actions={[
                                <FlatButton
                                label="Ok"
                                primary={true}
                                keyboardFocused={true}
                                onClick={this.handleDialogClose}
                                />
                            ]}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleDialogClose}
                    >

                    {this.state.errorMessage}

                    </Dialog>
               
                <Paper 
                    zDepth={1} 
                    style={{width:'90%', padding:'20px'}}
                >
                    
                    {/* <Divider /> */}
                    <Schedule 
                        dateLabel={false}
                        pattern={ this.state.pattern }
                        exceptions={ null }
                        baseDate={"2018-04-10"}
                        selection="pattern"
                        checkFunction={(pattern)=>this.checkPattern(pattern)}
                        primaryBtnLabel="save"
                        secondaryBtnLabel="back"
                        secondaryBtnFunction={this.handleSnackbarClose}
                        editable={true}
                    />
                     <Snackbar
                        open={this.state.snackbarOpen}
                        message={ "Pattern saved" }
                        contentStyle={{color: lightGreen800}}
                        bodyStyle={{background:lightGreen100}}
                        autoHideDuration={500}
                        onRequestClose={this.handleSnackbarClose}
                    />
                    
                </Paper>
                
            </div>  
        )
    }
}
 
export default PatternModify;