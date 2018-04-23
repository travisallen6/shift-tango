import React, { Component } from 'react';


import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import Toggle from 'material-ui/Toggle'
import {connect} from 'react-redux'


import {Link} from 'react-router-dom'


import './ProfileEdit.css'

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            firstNameInput: this.props.firstName || "",
            lastNameInput:this.props.lastName || "",
            picUrlInput: this.props.picUrl || "",
            positionInput: this.props.position || "",
            managerInput: this.props.manager || "",
            empIdInput: this.props.empId || "",
            doeInput: this.props.doe || "",
            phoneInput: this.props.phone || "",
            addressInput: this.props.address || "",
            cityInput: this.props.city || "",
            stateInput: this.props.state || "",
            zipInput: this.props.zip || "",
            emailInput: this.props.email || "",
            emailOk: this.props.emailIsAllowed || false,
            smsOk: this.props.smsIsAllowed || false
            
         }
    }

    componentWillReceiveProps(newProps){

        let { firstName, lastName, picUrl, position, empId, doe, phone, address, city, state, zip, email, manager, emailAllowed, smsAllowed } = newProps

        let firstNameEqual = firstName !== this.props.firstName
        let lastNameEqual = lastName !== this.props.lastName
        let picUrlEqual = picUrl !== this.props.picUrl
        let positionEqual = position !== this.props.position
        let managerEqual = manager !== this.props.manager
        let empIdEqual = empId !== this.props.empId
        let doeEqual = doe !== this.props.doe
        let phoneEqual = phone !== this.props.phone
        let addressEqual = address !== this.props.address
        let cityEqual = city !== this.props.city
        let stateEqual = state !== this.props.state
        let zipEqual = zip !== this.props.zip
        let emailEqual = email !== this.props.email
        let emailOkEqual = emailAllowed !== this.props.emailAllowed
        let smsOkEqual = smsAllowed !== this.props.smsAllowed

        if(firstNameEqual || lastNameEqual || picUrlEqual || positionEqual || empIdEqual || doeEqual || phoneEqual || addressEqual || cityEqual || stateEqual || zipEqual || emailEqual || managerEqual || smsOkEqual || emailOkEqual || emailOkEqual || smsOkEqual){
            this.setState({
                firstNameInput: firstName,
                lastNameInput:lastName,
                positionInput: position,
                managerInput: manager,
                empIdInput: empId,
                doeInput: doe,
                phoneInput: phone,
                addressInput: address,
                cityInput: city,
                stateInput: state,
                zipInput: zip,
                emailInput: email,
                emailOk: emailAllowed,
                smsOk: smsAllowed
            })
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

    
      resetInputs = () => {
        let { firstName, lastName, picUrl, position, empId, doe, phone, address, city, state, zip, email, manager, emailok, smsok } = this.props
       
        
            this.setState({
                firstNameInput: firstName,
                lastNameInput:lastName,
                positionInput: position,
                picUrlInput: picUrl,
                managerInput: manager,
                empIdInput: empId,
                doeInput: doe,
                phoneInput: phone,
                addressInput: address,
                cityInput: city,
                stateInput: state,
                zipInput: zip,
                emailInput: email,
                smsOk: smsok,
                emailOk: emailok
            })
        
    }



    handleManagerChange = (event, index, value) => {
        this.setState({managerInput: value})
    };

    handleSave = ( ) =>{
        let { 
            firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput, smsOk, emailOk 
        } = this.state

        let updatedProfile = {
            firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput, smsOk, emailOk
        }

        this.props.checkFunction(updatedProfile)
    }
    
    handleSmsToggle = () => {
        this.setState({
            smsOk: !this.state.smsOk,
        })
    }
    
    handleEmailToggle = () => {
        this.setState({
            emailOk: !this.state.emailOk
        })
    }
    
    render() {

        let { 
            firstNameInput, lastNameInput, positionInput, empIdInput, doeInput, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput, managerInput
        } = this.state

        let { 
            firstName, lastName, manager, picUrl, position, empId, doe, inputsDisabled
        } = this.props     

        const half = {
            width: "45%"
        }
        
        const third = {
            width: "30%"
        }

        let paperStyles = {
            margin: '8px',
            paddingBottom: "1px", 
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
                src={picUrl}
                
                />
                <Link to="#">change</Link>
            </div>

            <div className="prof-form-name-col">

            {lastName && <TextField
                disabled={inputsDisabled || false}
                name="lastNameInput"
                value={ lastNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Last Name"
            /> }

            {firstName && <TextField
                disabled={inputsDisabled || false}
                name="firstNameInput"
                value={ firstNameInput }
                onChange={ this.handleInputChange }
                floatingLabelText="First Name"
                />}
                </div>
            </div>
            
            <div className="prof-form-row">
            {empId && <TextField
                name="empIdInput"
                value={ empIdInput }
                disabled={inputsDisabled || false}
                onChange={ this.handleInputChange }
                floatingLabelText="Employee ID"
                style={half}
            />}
            
            {doe && <DatePicker
                hintText="Date of Entry"
                value={doeInput}
                disabled={inputsDisabled || false}
                onChange={this.handleDateInputChange}
                floatingLabelText="Date of Entry"
                style={half}
            /> }

            </div>

            <div className="prof-form-row">
            {position && <TextField
                name="positionInput"
                value={ positionInput }
                disabled={inputsDisabled || false}
                onChange={ this.handleInputChange }
                floatingLabelText="Position"
                style={half}
            />}

            <TextField
                name="phoneInput"
                value={ phoneInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Phone Number"
                style={half}
                />
            </div>
            
            <div className="prof-form-row">
            {manager !== undefined && <SelectField
                floatingLabelText="Position Type"
                value={managerInput}
                onChange={this.handleManagerChange}
                style={{width: "41%"}}
            >
                <MenuItem value={false} primaryText="Employee" />
                <MenuItem value={true} primaryText="Manager" />
            </SelectField>}
            
            
            <TextField
                name="emailInput"
                value={ emailInput }
                onChange={ this.handleInputChange }
                floatingLabelText="Email"
                style={{width: "63%", marginLeft: 7}}
            />
            </div>

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

            
            {this.props.emailAllowed !== undefined && <div className="prof-form-row prof-form-toggle">
            <Toggle
                label="Receive email notifications"
                toggled={this.state.emailOk}
                onToggle={this.handleEmailToggle}
            />
            </div>}
  
            {this.props.smsAllowed !== undefined && <div className="prof-form-row prof-form-toggle">
                <Toggle
                    label="Receive text notifications"
                    toggled={this.state.smsOk}
                    onToggle={this.handleSmsToggle}
                />
            </div>}
            


                <div className="prof-edit-btn-container">
                    <RaisedButton 
                        label="Cancel" 
                        default={true}
                        href={this.props.cancelPath}
                    />
                    <RaisedButton 
                        label="Reset" 
                        default={true}
                        onClick={ this.resetInputs } 
                    />
                    <RaisedButton 
                        label="Save" 
                        secondary={true} 
                        style={{width: "37%"}}
                        onClick={this.handleSave}
                    />
                </div>
                </div>
                    {/* <div className="prof-edit-reset-back-container">
                    </div> */}
                
                
                
               

            </Paper>
         )
    }
}

function mapStateToProps(state){
    return {
        smsIsAllowed: state.user.smsok,
        emailIsAllowed: state.user.emailok
    }
}
 
export default connect( mapStateToProps )( ProfileEdit );