import React from 'react'
import './Login.css'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import logo from '../../images/Logo.jpg'
import TextField from 'material-ui/TextField/TextField';

class Login extends React.Component {

    constructor(){
        super()
        this.state = {
            authorized: true,
            userInput: ''
        }

    }

    handleInputChange(e){
        this.setState({
            userInput: e.target.value
        })
    }

render(){

    const style = {
        height: "67vh",
        width: "100vw",
        margin: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContents: 'space-between',
        alignItems: 'center',
        padding: '7px'
    };    

    return (
        <div className='login-page-container'>
            <Paper style={style} zDepth={2}>
                <div className='login-container'>

                    <div className='login-logo'>
                        <img src={logo} width="100%" alt='Logo'/>
                    </div>
                    <div className='login-text'><strong>Please enter your Gmail Username</strong></div>
                    <div className='login-text'>This will simulate a user with manager credentials authorizing you as a manager</div>
                    <div className='login-text'>If a user attempts to login before being authorized, they will be denied access.</div>
                            { this.state.authorized && <div className="login-auth-field">

                            <TextField 
                                value={this.state.userInput}
                                hintText="Gmail Username" 
                                onChange={this.handleInputChange}
                                style={{width:158}}
                                />
                            
                            <RaisedButton 
                                onClick={this.handleSubmit}
                                label="Authorize" 
                                primary={true}
                                labelStyle={{color: "white", 
                                fontWeight: 600, fontSize: 16}} 
                                buttonStyle={{width:120}}
                                style={{height: 35}} 
                            />
                            </div>}

                            <RaisedButton 
                                label="Log In" 
                                secondary={true}
                                labelStyle={{color: "white", 
                                fontWeight: 600, fontSize: 23}} 
                                buttonStyle={{width:141}}
                                style={{height: 46}} 
                                href={process.env.REACT_APP_LOGIN}/> 

                </div>
            </Paper>
        </div>
    )
}
}

export default Login