import React, { Component } from 'react';

import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import Snackbar from 'material-ui/Snackbar'
import Paper from 'material-ui/Paper'
import { Subheader, RaisedButton } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'

import './EmployeeRequestTO.css'
import { lightGreen100 } from 'material-ui/styles/colors';
import { lightGreen800 } from 'material-ui/styles/colors';

class EmployeeRequestTO extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            singleDateInput:  null,
            startDateInput: null,
            endDateInput: null,
            requestTypeInput: null,
            requestReasonInput: "",
            dateRange: false,
            snackbarOpen: false,
            redirect: false
         }

    }

 
    
    disableSingleRange = (date) => {
      return moment(date) <= moment() || moment(date) >= moment().add(6,"months")
    }

    disableStartRange = (date) => {
      return moment(date) <= moment() 
    }
   
    disableEndRange = (date) => {
      return moment(date) >= moment().add(6,"months") || moment(date) <= moment(this.state.startDateInput)
    }

    clearInputs = () => {
        this.setState({
            singleDateInput:  null,
            startDateInput: null,
            endDateInput: null,
            requestTypeInput: null,
            requestReasonInput: "",
            dateRange: false
        })
    }

    handleRadio = (value) => {
        if(value){
            this.setState({
                dateRange: value,
                singleDateInput: null,
                requestTypeInput: null,
                requestReasonInput: ""
            })
        } else {
            this.setState({
                dateRange: value,
                startDateInput: null,
                endDateInput: null,
                requestTypeInput: null,
                requestReasonInput: ""
            })

        }
    }

    handleDateInput = (event, value, key) => {
        this.setState({[key]: value})
    }

    handleSelectChange = (event, i, val) => {
        this.setState({
            requestTypeInput: val
        })
    }

    handleRequestReasonInput = (event) => {
        if(event.target.value.length < 140)
        this.setState({
            requestReasonInput: event.target.value
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false,
            redirect: true
        })
    }

    handleSubmit = () =>{
        let preFlightTORequest
        let {emp_id} = this.props
        let {startDateInput, endDateInput, requestTypeInput, requestReasonInput, singleDateInput, dateRange} = this.state
        if(dateRange){
            preFlightTORequest = {
                startDate: startDateInput,
                endDate: endDateInput,
                requestType: requestTypeInput,
                requestReason: requestReasonInput
            }
        } else {
            preFlightTORequest = {
                startDate: singleDateInput,
                endDate: singleDateInput,
                requestType: requestTypeInput,
                requestReason: requestReasonInput
            }
        }

        axios.post(`/api/timeoff/${emp_id}/request`, preFlightTORequest)
        .then( this.setState({snackbarOpen: true}) )
        .catch(err => console.log(err))
    }

    render() { 
        // let paperStyles = {
        //     margin: '8px', 
        //     width: '90vw', 
        //     padding: '20px',
        //     position: 'relative'  
        // }

        let { dateRange, singleDateInput, startDateInput, endDateInput, requestTypeInput, requestReasonInput } = this.state
        

        let dateInputsFilled = singleDateInput || ( endDateInput && startDateInput )

        let allInputsFilled = dateInputsFilled && requestTypeInput && requestReasonInput

        let {redirect} = this.state

        return ( 
            <div className="emp-rto-container">
                <div className="emp-rto-content-container">
                
                {redirect && <Redirect to="/employee/requestdash" /> }
                <h1 
                    className="request-to-headline super-header"
                    style={{fontSize: 24}}>Request Time Off</h1>
                {/* <Subheader 
                    className="request-to-headline"
                    style={{fontSize: 24}}>Request Time Off</Subheader> */}
                < Paper
                    className='employee-request-to-paper'
                    // style={paperStyles} 
                    zDepth={1} 
                >
                <Subheader style={{fontSize: 18}}>I would like to request:</Subheader>
                <RadioButtonGroup 
                    name="Multiple days" 
                    defaultSelected={false}
                    onChange={(event, value)=>this.handleRadio(value)}
                >
                    <RadioButton
                        value={false}
                        label="One day off"
                    />
                    <RadioButton
                        value={true}
                        label="A range of days off"
                    />
                </RadioButtonGroup>



                { !dateRange && <DatePicker 
                    hintText="Request Date" 
                    name="singleDateInput"
                    onChange={(event,value)=>this.handleDateInput(event, value, "singleDateInput")}
                    shouldDisableDate={this.disableSingleRange} 
                    value={this.state.singleDateInput}
                /> }

                { dateRange && <div className="emp-rto-range-group">
                <DatePicker 
                    hintText="Request Start Date" 
                    name="startDateInput"
                    onChange={(event,value)=>this.handleDateInput(event, value, "startDateInput")}
                    shouldDisableDate={this.disableStartRange}
                    value={this.state.startDateInput}
                    style={{width: "45%", overflow: "hidden"}}
                    
                    />

                <DatePicker 
                    hintText="Request End Date" 
                    name="endDateInput"
                    shouldDisableDate={this.disableEndRange}
                    disabled={!this.state.startDateInput}
                    onChange={(event,value)=>this.handleDateInput(event, value, "endDateInput")}
                    style={{width: "45%", overflow: "hidden"}}
                    
                    />
                </div>}

        { (singleDateInput || (startDateInput && endDateInput) ) &&  <SelectField
                    floatingLabelText="Type of Request"
                    value={this.state.requestTypeInput}
                    onChange={this.handleSelectChange}
                >
                    <MenuItem value={null} primaryText="" />
                    <MenuItem value={"UTO"} primaryText="Unpaid Time Off" />
                    <MenuItem value={"VAC"} primaryText="Vacation" />
                    <MenuItem value={"SICK"} primaryText="Sick Time" />
        </SelectField> }

        {requestTypeInput && <TextField
                    floatingLabelText="Reason for Request"
                    onChange={this.handleRequestReasonInput}
                    multiLine={true}
                    rows={1}
                    rowsMax={5}
                    value={this.state.requestReasonInput}
                />}
        <div className="emp-rto-btn-container">
            <RaisedButton 
                default={true}
                label="clear"
                onClick={this.clearInputs}
                />
            <RaisedButton 
                secondary={true}
                disabled={!allInputsFilled}
                label="submit"
                onClick={this.handleSubmit}
                />
        </div>
                </Paper>
                </div>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={ "Request Submitted" }
                    contentStyle={{color: lightGreen800}}
                    bodyStyle={{background: lightGreen100}}
                    autoHideDuration={500}
                    onRequestClose={this.handleSnackbarClose}
                />
            </div>
         )
    }
}

function mapStateToProps(state){
    return{
        emp_id: state.user.emp_id
    }
}
 
export default connect(mapStateToProps)(EmployeeRequestTO);