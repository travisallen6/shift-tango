import React, { Component } from 'react';
import ProfileEdit from '../ProfileEdit/ProfileEdit'
import axios from 'axios'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import GavelIcon from 'material-ui/svg-icons/action/gavel'
import Toggle from 'material-ui/Toggle'
import { lightGreen800, lightGreen100, fullWhite, red500, red800, red100 } from 'material-ui/styles/colors'

import './ManagerProfileEdit.css'

class ManagerProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: "",
            lastName: "",
            picUrl: "",
            position: "",
            manager: "",
            empId: "",
            doe: moment().toDate(),
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            email: "",
            errors: [],
            dialogOpen: false,
            snackbarOpen: false,
            termSnackbarOpen: false,
            redirect: false,
            termRedirect: false,
            dangerZone: false,
            terminate: false,
            terminationDate: null,
            terminationReason: ""
         }
    }

    componentDidMount(){
        axios.get(`/api/employee/${this.props.match.params.empid}/detail`)
        // axios.get(`/api/employee/${this.props.match.params.empid}/detail`)
        .then( profileData => {
            let { profile: { address, city, doe, email, emp_id, first_name, last_name, phone, position, profile_pic, state, zip, mgr} } = profileData.data

            this.setState({
                firstName: first_name,
                lastName: last_name,
                picUrl: profile_pic,
                position: position,
                manager: mgr,
                empId: emp_id,
                doe: moment(doe).toDate(),
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                email: email,
            })
        })
    }

    saveInputs = (profileData) => {
        let errors = []
        let { 
            firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput, phoneInput, addressInput,     cityInput, stateInput, zipInput, emailInput } = profileData


        
        if(!lastNameInput){
            let error = <div><strong>Last Name</strong> is required and cannot be blank</div>
            errors.push(error)
        }

        if(!firstNameInput){
            let error = <div><strong>First Name</strong> is required and cannot be blank</div>
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
        
        if(!phoneInput){
            let error = <div><strong>Phone Number</strong> is required and cannot be blank</div>
            errors.push(error)
        }

        if(!emailInput){
            let error = <div><strong>Email</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!addressInput){
            let error = <div><strong>Address</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!cityInput){
            let error = <div><strong>City</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!stateInput){
            let error = <div><strong>State</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if(!zipInput){
            let error = <div><strong>Zip Code</strong> is required and cannot be blank</div>
            errors.push(error)
        }
        
        if (errors.length > 0) {
            let allErrors = errors.map( (error, i) =>{
                return <div className="profile-error-item"key={i}> { error } </div>
            })

            this.setState({
                errors: allErrors,
                dialogOpen: true
            })
        } else {
            let preFlightProfileData = {
                firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput: moment(doeInput).format("YYYY-MM-DD"), phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput
            }

            axios.put( `/api/employee/${this.state.empId}/profile/`, {profileData: preFlightProfileData})
            .then( updatedProfile => {

                let { 
                    address, city, doe, email, emp_id, first_name, last_name, mgr, phone, position, profile_pic, state, zip
                } = updatedProfile.data[0]

                this.setState({
                    firstName: first_name,
                    lastName: last_name,
                    picUrl: profile_pic,
                    position: position,
                    manager: mgr,
                    empId: emp_id,
                    doe: moment(doe).toDate(),
                    phone: phone,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    email: email,
                    snackbarOpen: true,
                })

            })
        }


    }    

    closeDialog = () => {
        this.setState({
            dialogOpen: false
        })
    }

    closeSnackbar = () => {
        this.setState({
            snackbarOpen: false,
            redirect: true
        })
    }

    closeTermSnackbar = () => {
        this.setState({
            termRedirect: true
        })
    }

    toggleDanger = () => {
        if(this.state.dangerZone){
            this.cancelTermination()
        } else {

            this.setState({
                dangerZone: true
            })
        }
    }

    toggleTermination = () => {
        if(this.state.terminate){
            this.cancelTermination()
        } else {

            this.setState({
                terminate: true
            })
        }
    }

    handleTerminationDate = (event, date) => {
        this.setState({
          terminationDate: date,
        });
    };

    handleTerminationReason = (e) =>{
        this.setState({
            terminationReason: e.target.value
        })
    }

    cancelTermination = () => {
        this.setState({
            dangerZone: false,
            terminate: false,
            terminationDate: null,
            terminationReason: ""
        })
    }

    executeTermination = () => {
        let { terminationDate, terminationReason } = this.state
        let terminationData = {
            reason: terminationReason,
            termination_date: moment(terminationDate).format("YYYY-MM-DD")
        }

        axios.post(`/api/employee/${this.state.empId}/terminate`, terminationData)
        .then( response => {
            this.setState({
                termSnackbarOpen: true
            })
        })
    }

    
      render() {
        const dialogActions = [
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.closeDialog}
            />
        ]

        const styles = {
            thumbOff: {
              backgroundColor: '#ffcccc',
            },
            trackOff: {
              backgroundColor: '#ff9d9d',
            },
            thumbSwitched: {
              backgroundColor: 'red',
            },
            trackSwitched: {
              backgroundColor: '#ff9d9d',
            },
            labelStyle: {
              color: 'red',
            },
          };

        return ( 
            <div className="manager-profile-edit-container">
                {this.state.redirect && <Redirect to={`/managerdash/${this.state.empId}/detail`}/>}
                {this.state.termRedirect && <Redirect to={`/managerdash/`}/>}
                <ProfileEdit 
                    firstName={ this.state.firstName }
                    lastName={ this.state.lastName }
                    picUrl={ this.state.picUrl }
                    position={ this.state.position }
                    manager={ this.state.manager }
                    empId={ this.state.empId }
                    doe={ this.state.doe }
                    phone={ this.state.phone }
                    address={ this.state.address }
                    city={ this.state.city }
                    state={ this.state.state }
                    zip={ this.state.zip }
                    email={ this.state.email }
                    checkFunction={this.saveInputs}
                />
                <div className="manager-profile-edit-danger">
                    <RaisedButton
                        label="Danger"
                        icon={ <WarningIcon color={fullWhite}/> }
                        backgroundColor={red500}
                        labelColor={fullWhite}
                        onClick={this.toggleDanger}
                    />
                    {this.state.dangerZone && <div                          className="manager-profile-edit-danger-zone">
                    <Toggle
                        label="Terminate?"
                        thumbStyle={styles.thumbOff}
                        trackStyle={styles.trackOff}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackSwitchedStyle={styles.trackSwitched}
                        labelStyle={styles.labelStyle}
                        onToggle={this.toggleTermination}
                        toggled={this.state.terminate}

                    />

                     {this.state.terminate && <div className="termination-name">
                        You are about to terminate:
                        <h1>{this.state.firstName} {this.state.lastName}</h1>
                    </div>}

                        {this.state.terminate && <DatePicker 
                            floatingLabelText="Date of Termination"
                            floatingLabelStyle={{color: red500}} 
                            container="inline" 
                            mode="portrait"
                            onChange={this.handleTerminationDate} 
                        />}

                        {this.state.terminationDate && <TextField
                            floatingLabelText="Termination Reason"
                            underlineStyle={{borderColor: red500}}
                            floatingLabelStyle={{color: red500}}
                            onChange={this.handleTerminationReason}
                            underlineFocusStyle={{borderColor: red500}}
                        />}

                        {this.state.terminationReason && <div className="termination-btn-container">
                        <RaisedButton
                            label="Terminate"
                            icon={ <GavelIcon color={fullWhite}/> }
                            backgroundColor={red500}
                            labelColor={fullWhite}
                            onClick={this.executeTermination}
                        />
                         <RaisedButton
                            label="Cancel"
                            default={true}
                            onClick={this.cancelTermination}
                        />
                        </div>}

                        

                    </div>}

                </div>
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
                        message={ "Profile Saved" }
                        contentStyle={{color: lightGreen800}}
                        bodyStyle={{background:lightGreen100}}
                        autoHideDuration={800}
                        onRequestClose={this.closeSnackbar}
                />
                <Snackbar
                        open={this.state.termSnackbarOpen}
                        message={ "Employee Terminated" }
                        contentStyle={{color: red800}}
                        bodyStyle={{background:red100}}
                        autoHideDuration={800}
                        onRequestClose={this.closeTermSnackbar}
                />
            </div>
         )
    }
}
 
export default ManagerProfileEdit;