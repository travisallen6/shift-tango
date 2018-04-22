import React from 'react'
import './Login.css'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import logo from '../../images/Logo.jpg'

const style = {
    height: "35vh",
    width: "100vw",
    margin: 20,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContents: 'space-between',
    alignItems: 'center',
    padding: '7px'
};


function Login(props) {
    return (
        <div className='login-page-container'>
            <Paper style={style} zDepth={2}>
                <div className='login-container'>

                    <div className='login-logo'>
                        <img src={logo} width="100%" alt='Logo'/>
                        
                    </div>

                        {/* <a href={process.env.REACT_APP_LOGIN}> */}
                            <RaisedButton label="Log In" backgroundColor="#00E676" labelStyle={{color: "white", fontWeight: 600, fontSize: 23}} buttonStyle={{width:'141px', height: "56px"}} href={process.env.REACT_APP_LOGIN}/>
                        {/* </a> */}

                </div>
            </Paper>
        </div>
    )
}

export default Login