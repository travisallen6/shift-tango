import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import {lightGreen800, lightGreen100} from 'material-ui/styles/colors'

import './AddEmployee.css'

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lastNameInput: '',
            firstNameInput: '',
            employeeIdInput: '',
            doeInput: null, 
            positionInput: '',
            managerInput: false,
            googleInput: '',
            errors: [],
            dialogOpen: false,
            redirect: false,
            redirectPath: "/failed"
         }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    closeDialog = () => {
        this.setState({
            dialogOpen: false
        })
    }

    handleDateInputChange = (event, date) => {
        this.setState({
          doeInput: date,
        });
    };


    handleManagerChange = (event, index, value) => {
        this.setState({managerInput: value})
    };

    handleSave = ( ) =>{

        let errors = []

        let { 
            firstNameInput, lastNameInput, positionInput, managerInput, empIdInput, doeInput, googleInput 
        } = this.state

        if(!lastNameInput){
            let error = <div><strong>Last Name</strong> is required and cannot be blank</div>
            errors.push(error)
        }

        if(!firstNameInput){
            let error = <div><strong>First Name</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!googleInput){
            let error = <div><strong>Google Account Username</strong> is required and cannot be blank</div>
            errors.push(error)
        }
       
        if(!empIdInput){
            let error = <div><strong>Employee ID</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!doeInput){
            let error = <div><strong>Date of Entry (DOE) </strong> is required and cannot be blank</div>
            errors.push(error)
        }

        if(!positionInput){
            let error = <div><strong>Position</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if (errors.length > 0) {
            let allErrors = errors.map( (error, i) =>{
                return <div className="add-employee-error-item"key={i}> { error } </div>
            })

            this.setState({
                errors: allErrors,
                dialogOpen: true
            })

        } else {
            let preFlightEmployeeData = {
                firstNameInput, lastNameInput, positionInput, managerInput, empIdInput, googleInput, doeInput: moment(doeInput).format("YYYY-MM-DD"),
            }

            axios.post( `/api/user`, preFlightEmployeeData)
            .then( employeeId => {

                this.setState({
                    snackbarOpen: true,
                    redirectPath: `/manager/pattern/${employeeId.data[0].emp_id}`
                })
            })
        }

    }

    closeSnackbar = () => {
        this.setState({
            redirect: true,
        })
    }

    render() { 
        let { 
            firstNameInput, lastNameInput, positionInput, empIdInput, doeInput, managerInput, googleInput
        } = this.state

       

        const half = {
            width: "45%"
        }

        const full = {
            width: "100%"
        }
        
        const third = {
            width: "30%"
        }

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
        }

        const dialogActions = [
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.closeDialog}
            />
        ]

        return (
        <div className="employee-add-container">
            { this.state.redirect && <Redirect to={this.state.redirectPath} /> }
            <Paper
                style={paperStyles} 
                zDepth={1} 
                >
                
            <div className="add-form-container">
            <Subheader style={{fontSize: 24}}>Add an Employee</Subheader>


            <TextField
                name="lastNameInput"
                value={ lastNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Last Name"
                /> 

            <TextField
                name="firstNameInput"
                value={ firstNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="First Name"
            />
            
            <TextField
                name="googleInput"
                value={ googleInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Google Account Username"
            />
            
        <div className="add-form-row">

            <TextField
                name="empIdInput"
                value={ empIdInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Employee ID"
                style={half}
                />
            
            <DatePicker
                hintText="Date of Entry"
                value={doeInput}
                onChange={this.handleDateInputChange}
                floatingLabelText="Date of Entry"
                style={{width: "45%", overflow: "hidden"}}
                /> 
        </div>

            <TextField
                name="positionInput"
                value={ positionInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Position"
                style={full}
            />
            
            <SelectField
                floatingLabelText="Position Type"
                value={managerInput}
                onChange={this.handleManagerChange}
                style={full}
                >
                <MenuItem value={false} primaryText="Employee" />
                <MenuItem value={true} primaryText="Manager" />
            </SelectField>
            
            
                
                    <div className="add-btn-container">
                    <RaisedButton 
                        label="Save" 
                        secondary={true} 
                        style={half}
                        onClick={this.handleSave}
                        />
                   
                    <RaisedButton 
                        label="Cancel"
                        href="/#/manager/dash" 
                        default={true}
                        style={half}
                        />
                    </div>
            </div>
            </Paper>
            <Dialog
                title="Errors"
                actions={dialogActions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.closeDialog}
            >
                <div className="blank-errors">
                    {this.state.errors}
                </div>

            </Dialog>
            <Snackbar
                open={this.state.snackbarOpen}
                message={ "Employee Saved" }
                contentStyle={{color: lightGreen800}}
                bodyStyle={{background:lightGreen100}}
                autoHideDuration={800}
                onRequestClose={this.closeSnackbar}
            />
    </div> 
         )
    }
}
 
export default AddEmployee;