import React, { Component } from 'react';

import Paper from 'material-ui/Paper'
import { Subheader } from 'material-ui';
import Toggle from 'material-ui/Toggle'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'

import './EmployeeRequestTO.css'

class EmployeeRequestTO extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDateInput: null,
            endDateInput: null,
            dateRange: true,
         }
    }
    
    disableSingleRange = (date) => {
      return moment(date) <= moment() || moment(date) >= moment().add(6,"months")
    }

    disableStartRange = (date) => {
      return moment(date) <= moment() 
    }
   
    disableEndRange = (date) => {
      return moment(date) >= moment().add(6,"months") 
    }

    handleRadio = (value) => {
        this.setState({dateRange: value})
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



                <DatePicker 
                    hintText="Date" 
                    shouldDisableDate={this.disableSingleRange} 
                />

                <DatePicker 
                    hintText="Start Date" 
                    shouldDisableDate={this.disableSingleRange} 
                />

                <DatePicker 
                    hintText="Start Date" 
                    shouldDisableDate={this.disableSingleRange} 
                />


                

                </Paper>
            </div>
         )
    }
}
 
export default EmployeeRequestTO;