import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { getUserData } from '../../dux/reducer'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import './ProfileComplete.css'

class ProfileComplete extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInput: '',
            stateValue: 'State'

        }        
    }

    componentDidMount(){
        console.log('Component did mount')
        this.props.getUserData()
    }

    handleChange = (event, index, value) => this.setState({stateValue: value});


    render(){

        const states = [ 'State','AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
        let statesDisplay = states.map( (state, i) => <MenuItem value={state} key={i + state} primaryText={state} />  )


        return(
             this.props.loading ? <CircularProgress size={80} thickness={5} /> : (

                 <div className='profile-complete-container'>
                    <h1>Hello, {this.props.user.first_name + " " + this.props.user.last_name}!</h1>

                <TextField
                    floatingLabelText="Phone"
                />
                <br />

                <TextField
                    hintText="Address, Apartment, Suite"
                    multiLine={true}
                    rows={2}
                />
                <div className="city-state-group">

                    <TextField
                        floatingLabelText="City"
                        style={{width: '150px'}}
                    />

                    <DropDownMenu 
                        maxHeight={300} 
                        value={this.state.stateValue} 
                        onChange={this.handleChange}
                        style={{marginBottom: '8px'}}
                    >
                    {statesDisplay}
                    </DropDownMenu>
                </div>

                <TextField
                    floatingLabelText="Email Address"
                />

                <RaisedButton label="Submit" primary={true} style={{margin: 12}} />
                <RaisedButton label="Clear" secondary={true} style={{margin: 12}} />




                </div>
            )
        )
    }
}

function mapStateToProps(state){
    
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserData })(ProfileComplete)