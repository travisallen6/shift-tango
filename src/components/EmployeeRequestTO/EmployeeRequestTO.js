import React, { Component } from 'react';

import Paper from 'material-ui/Paper'
import { Subheader, RaisedButton } from 'material-ui';
import Toggle from 'material-ui/Toggle'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'

import './EmployeeRequestTO.css'

class EmployeeRequestTO extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            singleDateInput:  null,
            startDateInput: null,
            endDateInput: null,
            requestTypeInput: null,
            requestReasonInput: "",
            dateRange: false
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

    render() { 
        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'  
        }

        let toggleLabel = this.state.dateRangeToggle 
            ? "Multiple Days off" 
            : "One Day Off"

        let { dateRange, singleDateInput, startDateInput, endDateInput, requestTypeInput, requestReasonInput } = this.state

        let dateInputsFilled = singleDateInput || endDateInput && startDateInput

        let allInputsFilled = dateInputsFilled && requestTypeInput && requestReasonInput

        return ( 
            <div>
                <Subheader style={{fontSize: 24}}>Request Time Off</Subheader>
                < Paper 
                    style={paperStyles} 
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

        { (singleDateInput || startDateInput && endDateInput) &&  <SelectField
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
            <RaisedButton 
                secondary={true}
                disabled={!allInputsFilled}
                label="submit"
            />
            <Subheader>{`You have completed${trueCount}/${fieldCount}`}</Subheader>
            <RaisedButton 
                default={true}
                label="clear"
            />


                

                </Paper>
            </div>
         )
    }
}
 
export default EmployeeRequestTO;