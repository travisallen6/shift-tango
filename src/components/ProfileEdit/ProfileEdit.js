import React, { Component } from 'react';

import moment from 'moment'

import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';

import {Link} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';

import './ProfileEdit.css'

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: "",
            lastName:"",
            position: "",
            empId: "",
            doe: null,
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            email: "",
            firstNameInput: "Travis",
            lastNameInput: "Allen",
            positionInput: "Master",
            empidInput: "205301",
            doeInput: moment().toDate(),
            phoneInput: "801-673-7357",
            addressInput: "2945 S. Mountain Goat Way",
            cityInput: "West Valley City",
            stateInput: "UT",
            zipInput: "84128",
            emailInput: "travisallen6@gmail.com",
         }
    }

    
    render() {

        let { 
            firstNameInput, lastNameInput, positionInput, empidInput, doeInput, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput
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

        const short = {
            width: "20%"
        }

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
        }

        return ( 
            <Paper
                style={paperStyles} 
                zDepth={1} 
            >
                
            <div className="prof-form-container">

            <div className="prof-form-row">

            <div className="prof-form-avatar">

            <Avatar
                // src={pic}
                backgroundColor="grey"
                size={100}
                
                />
                <Link to="#">change</Link>
            </div>

            <div className="prof-form-name-col">

            <TextField
                name="lastNameInput"
                value={ lastNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Last Name"
                />

            <TextField
                name="firtsNameInput"
                value={ firstNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="First Name"
                />
                </div>
            </div>
            
            <div className="prof-form-row">
            <TextField
                name="empidInput"
                value={ empidInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Employee ID"
                style={half}
            />
            
            <DatePicker
                hintText="Date of Entry"
                value={doeInput}
                onChange={this.handleDateChange}
                floatingLabelText="Date of Entry"
                style={half}
            />
            </div>

            <div className="prof-form-row">
            <TextField
                name="positionInput"
                value={ positionInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Position"
                style={half}
                />


            <TextField
                name="phoneInput"
                value={ phoneInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Phone Number"
                style={half}
                />
            </div>
            
            <TextField
                name="emailInput"
                value={ emailInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Email"
            />

            <TextField
                name="addressInput"
                value={ addressInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Address"
                />
            
            <div className="prof-form-row">
            <TextField
                name="cityInput"
                value={ cityInput }
                onChange={ this.handleInputChange }
                floatingLabelText="City"
                style={half}
                />
            
            <TextField
                name="stateInput"
                value={ stateInput }
                onChange={ this.handleInputChange }
                floatingLabelText="State"
                style={{width: "10%"}}
                />
            
            <TextField
                name="zipInput"
                value={ zipInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Zip Code"
                style={third}
                />
            </div>
            


                </div>
                <RaisedButton 
                    label="Save" 
                    secondary={true} 
                    style={full}
                     />
                <RaisedButton 
                    label="Reset" 
                    default={true} 
                     />
                <RaisedButton 
                    label="Back" 
                    default={true} 
                     />
                

            </Paper>
         )
    }
}
 
export default ProfileEdit;