import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Save from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';

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
            errorMessage: [],
            snackbarOpen: false,
            dialogOpen: false

         }
    }

    componentDidMount(){
        axios.get(`/api/employee/${205301}/pattern`)
        .then( empData => {
           let{ sun, mon, tue, wed, thu, fri, sat, profile_pic, last_name, first_name } = empData.data[0]
            let empPattern = {sun, mon, tue, wed, thu, fri, sat}

            this.setState({
                pattern: empPattern,
                profilePic: profile_pic,
                lastName:last_name,
                firstName: first_name
            })
        } )
    }

    checkPattern(pattern){
    
        let evalPattern = pattern.map( shift => {

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
            let shiftTimes = {
            start: moment(`${shift.date} ${shift.timeValueStart}`, "YYYY-MM-DD hh:mm a").toDate(),
            end: moment(`${shift.date} ${shift.timeValueEnd}`, "YYYY-MM-DD hh:mm a").toDate(),
            }
            if(shiftTimes.start > shiftTimes.end){
            shiftTimes.end = moment(shiftTimes.end).add(1, "d").toDate()
            }
            return {
                date: shift.date,
                shift: shiftTimes,
            }
        }
        })
        let errors = evalPattern
        .map( (evalShift, i, arr) => {
            let compareShift = i === 0 
            ? arr[arr.length - 1]
            : arr[i - 1];

            let weekDay = moment(evalShift.date).format("ddd")
            let compareWeekDay = moment(compareShift.date).format("ddd")

            if(evalShift.shift === "OFF"){
                return
            } 

            let startValid = moment(evalShift.shift.start).isValid()
            let endValid = moment(evalShift.shift.end).isValid()

            if (!startValid || !endValid) {
                let error = <div><strong>{weekDay}:</strong><p>One or more inputs contains an invalid time</p></div>
                return error
            }

            if(compareShift.shift === "OFF"){
                return
            }

            if(evalShift.shift.start < compareShift.shift.end){
                let error = <div><strong>Shift Overlap:</strong><p>{weekDay}(Start) cannot come before {compareWeekDay}(End)</p></div>
                return error
            }

            return
        })
        errors
        let allErrors = errors.filter( error => {
            return error !== undefined
        })

        if (allErrors.length > 0){
            this.setState({
                errorMessage: allErrors,
                dialogOpen: true
            })
        } else {
            this.setState({
                snackbarOpen: true
            })
        }
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false,
        });
      };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }
    
    render() {
        let errMessages = this.state.errorMessage.map(message =>{
            return message
        })
        
        let { profilePic, lastName, firstName } = this.state 
        return (
            <div className="pattern-modify-container">
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
                        // onRequestClose={this.handleDialogClose}
                    >

                    {this.state.errorMessage}

                    </Dialog>
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
                            style={{fontSize:28, textAlign:"center", paddingLeft: 0}}
                            > Schedule Pattern</Subheader>
                        {/* <FloatingActionButton 
                        secondary={true} >
                            <Save />
                        </FloatingActionButton> */}
                    </div>    
                    <Divider />
                    <Schedule 
                        dateLabel={false}
                        pattern={ this.state.pattern }
                        exceptions={ null }
                        baseDate={"2018-04-10"}
                        selection="pattern"
                        checkFunction={(pattern)=>this.checkPattern(pattern)}
                        // callback={()=>this.checkPattern(shifts)}
                    />
                     <Snackbar
                        open={this.state.snackbarOpen}
                        message={ "Pattern saved" }
                            
                        autoHideDuration={4000}
                        onRequestClose={this.handleSnackbarClose}
                    />
                    
                </Paper>
                
            </div>  
        )
    }
}
 
export default PatternModify;