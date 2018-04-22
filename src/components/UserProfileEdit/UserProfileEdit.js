import React, { Component } from 'react';

import ProfileEdit from '../ProfileEdit/ProfileEdit'

import {connect} from 'react-redux'
import {updateUserData} from '../../dux/reducer'

import moment from 'moment'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'

import {lightGreen100, lightGreen800} from 'material-ui/styles/colors'

import './UserProfileEdit.css'

class UserProfileEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            errors: [],
            dialogOpen: false,
            snackbarOpen: false,
            redirect: false
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
       
        // if(!empIdInput){
        //     let error = <div><strong>Employee ID</strong> is required and cannot be blank</div>
        //     errors.push(error)
        // }
        
        // if(!doeInput){
        //     let error = <div><strong>Date of Entry (DOE) </strong> is required and cannot be blank</div>
        //     errors.push(error)
        // }

        // if(!positionInput){
        //     let error = <div><strong>Position</strong> is required and cannot be blank</div>
        //     errors.push(error)
        // }
        
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
                firstNameInput: this.props.user.first_name, lastNameInput: this.props.user.last_name, positionInput: this.props.user.position, managerInput: this.props.user.mgr, empIdInput: this.props.user.emp_id, doeInput: this.props.user.doe, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput
            }

            axios.put( `/api/employee/${this.props.user.emp_id}/profile/`, {profileData: preFlightProfileData})
            .then( updatedProfile => {

                this.props.updateUserData(updatedProfile.data[0])

                this.setState({
                    snackbarOpen: true,
                })

                // let { 
                //     address, city, doe, email, emp_id, first_name, last_name, mgr, phone, position, profile_pic, state, zip
                // } = updatedProfile.data[0]



                // this.setState({
                //     firstName: first_name,
                //     lastName: last_name,
                //     picUrl: profile_pic,
                //     position: position,
                //     manager: mgr,
                //     empId: emp_id,
                //     doe: moment(doe).toDate(),
                //     phone: phone,
                //     address: address,
                //     city: city,
                //     state: state,
                //     zip: zip,
                //     email: email,
                //     snackbarOpen: true,
                // })

            })
        }


    }    

    render() { 

        let { address, city, doe, email, emp_id, first_name, last_name, phone, position, profile_pic, state, zip, mgr } = this.props.user

        let redirectPath = mgr 
            ? `/manager/myprofile/`
            : `/employee/myprofile/` 

        const dialogActions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.closeDialog}
            />
        ]

        return ( 
            <div className="user-profile-edit-container">
                {this.state.redirect && <Redirect to={redirectPath}/>}
           
                <div className="user-profile-edit-container-paper">
               <h1 className="user-profile-edit-headline">Edit My Profile</h1>

                <ProfileEdit 
                    firstName={ first_name }
                    lastName={ last_name }
                    picUrl={ profile_pic }
                    position={ position }
                    phone={ phone }
                    address={ address }
                    city={ city }
                    state={ state }
                    zip={ zip }
                    email={ email }
                    checkFunction={this.saveInputs}
                    inputsDisabled={true}
                    cancelPath={`/#/manager/myprofile/`}
                    
                />

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
            </div>
            
         )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}
 
export default connect(mapStateToProps, {updateUserData}) (UserProfileEdit);

