import React, { Component } from 'react'

import {connect} from 'react-redux'
import { getUserData } from '../../dux/reducer'

import './ProfileComplete.css'
import {Redirect} from 'react-router-dom'

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar'
import axios from 'axios'
import Toggle from 'material-ui/Toggle'


class ProfileComplete extends Component {
    constructor(props){
        super(props)
        this.state = {

            phoneInput: '',
            addressInput: '',
            cityInput: '',
            stateValue: 'State',
            emailInput: '',
            zipInput: '',
            profilePicUrl: this.props.user.profile_pic,

            smsNotifications: false,
            emailNotifications: false,

            phoneError: false,
            addressError: false,
            cityError: false,
            stateError: false,
            emailError: false,
            zipError: false,

            formComplete: false,
        }        
    }

    componentDidMount(){
        console.log('Component did mount')
        this.props.getUserData()
    }

    handlePhoneInputChange(event){
        if(event.target.value.length >= 10 && this.state.phoneError) this.setState({phoneError: false})
        this.setState({phoneInput: event.target.value})
    }

    handleAddressInputChange(event){
        if(event.target.value.length >= 7 && this.state.addressError) this.setState({addressError: false}) 
        this.setState({addressInput: event.target.value})
    }

    handleCityInputChange(event){
        if(event.target.value.length >= 3 && this.state.cityError) this.setState({cityError: false}) 
        this.setState({cityInput: event.target.value})
    }

    
    handleStateInputChange = (event, index, value) => {
        if(value !== 'State' && this.state.stateError) this.setState({stateError: false}) 
        this.setState({stateValue: value})
    };
    
    handleEmailInputChange(event){
        if(event.target.value.length >= 5 && this.state.emailError) this.setState({emailError: false})
        this.setState({emailInput: event.target.value})
    }

    handleZipInputChange(event){
        if(event.target.value.length >= 5 && this.state.zipError) this.setState({zipError: false}) 
        this.setState({zipInput: event.target.value})
    }

    handleSmsToggle = () => {
        this.setState({
            smsNotifications: !this.state.smsNotifications,
        })
    }
    
    handleEmailToggle = () => {
        this.setState({
            emailNotifications: !this.state.emailNotifications
        })
    }

    handleSubmit(){
        let {
            phoneInput, addressInput, cityInput, stateValue, emailInput, zipInput, profilePicUrl, smsNotifications, emailNotifications
        } = this.state

        if( phoneInput.length < 10 || addressInput.length < 7 || cityInput.length < 3 || stateValue === 'State' || zipInput.length < 5 || emailInput.length < 5 ) {
           
            if(phoneInput.length < 10) this.setState({phoneError: true})
            if(addressInput.length < 7) this.setState({addressError: true}) 
            if(cityInput.length < 3) this.setState({cityError: true}) 
            if(stateValue === 'State') this.setState({stateError: true}) 
            if(zipInput.length < 5) this.setState({zipError: true}) 
            if(emailInput.length < 5) this.setState({emailError: true})
        } else {

            let postBody = {
                profile_pic: profilePicUrl, 
                phone: phoneInput, 
                address: addressInput, 
                city: cityInput, 
                state: stateValue, 
                email: emailInput,
                zip: zipInput,
                smsNotifications: smsNotifications,
                emailNotifications: emailNotifications
            }

            axios.post(`/api/employee/${this.props.user.emp_id}/profile`, postBody)
            .then( this.setState( {formComplete: true} ))
        }
    }

    clearInputs(){
        this.setState({
            phoneInput: '',
            addressInput: '',
            cityInput: '',
            stateValue: 'State',
            emailInput: '',
            zipInput: '',
            profilePicUrl: this.props.user.profile_pic,
            emailNotifications: false,
            smsNotifications: false,

            phoneError: false,
            addressError: false,
            cityError: false,
            stateError: false,
            emailError: false,
            zipError: false,
        })
    }
    
    render(){

        let { 
            phoneInput, addressInput, cityInput, stateValue, emailInput, zipInput,
            phoneError, addressError, cityError,stateError, emailError, zipError,
         } = this.state

        const states = [ 'State','AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
        let statesDisplay = states.map( (state, i) => <MenuItem value={state} key={i + state} primaryText={state} />  )

        const redirectPath = this.props.user.mgr ? '/manager/dash' : '/employee/dash'


    return(

        <div className='profile-complete-container'>
            <div className='profile-form-container'>

                <h1>Hello, {this.props.user.first_name + " " + this.props.user.last_name}!</h1>
                
                <Avatar
                    src={this.props.user.profile_pic}
                    size={175}
                />
                {/* <img src={this.props.user.profile_pic} alt='profile-pic' width='200px'/> */}

                <br />

                <TextField
                    floatingLabelText="Phone"
                    value={phoneInput}
                    onChange={ (e)=>this.handlePhoneInputChange(e) }
                    errorText={ phoneError ? "This field is required" : null }
                /> 
            
                <br />

                <TextField
                    hintText="Address, Apartment, Suite"
                    multiLine={true}
                    rows={1}
                    maxrows={2}
                    onChange={ (e) => this.handleAddressInputChange(e)}
                    value={addressInput}
                    errorText={ addressError ? "This field is required" : null }
                    />
                
                <div className="city-state-group">

                    <TextField
                        floatingLabelText="City"
                        style={{width: '150px'}}
                        onChange={(e)=>this.handleCityInputChange(e)}
                        value={cityInput}
                        errorText={ cityError ? "This field is required" : null }
                        />

                    <DropDownMenu 
                        maxHeight={300} 
                        value={stateValue} 
                        onChange={this.handleStateInputChange}
                        style={{marginBottom: '8px'}}
                        errorText={ stateError ? "This field is required" : null }
                        >
                
                    {statesDisplay}
                
                    </DropDownMenu>
                    
                </div>  

                <br />

                <TextField 
                    floatingLabelText="Zip Code"
                    type="number"
                    onChange={(e)=>this.handleZipInputChange(e)}
                    value={zipInput}
                    errorText={ zipError ? "This field is required" : null }
                />  
                
                <br />

                <TextField
                    floatingLabelText="Email Address"
                    onChange={(e)=>this.handleEmailInputChange(e)}
                    value={emailInput}
                    errorText={ emailError ? "This field is required" : null }
                    />

                <br />

                <Toggle
                    label="Receive email notifications"
                    value={this.state.emailNotifications}
                    onToggle={this.handleEmailToggle}
                />
                <br />

                <Toggle
                    label="Receive text notifications"
                    value={this.state.smsNotifications}
                    onToggle={this.handleSmsToggle}
                />

                <br />
                
                <div className="profile-complete-btn-container">

                    <RaisedButton 
                        label="Submit" 
                        primary={true} 
                        style={{margin: 12}}
                        onClick={ ()=>this.handleSubmit() } 
                    />

                    <RaisedButton 
                        label="Clear" 
                        secondary={true} 
                        style={{margin: 12}}
                        onClick={ ()=>this.clearInputs() }
                    />
                </div>
            </div>

            { this.state.formComplete ? <Redirect to={redirectPath} /> : null }

        </div>
    
    )
    }
    }

function mapStateToProps(state){
    
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserData })(ProfileComplete)