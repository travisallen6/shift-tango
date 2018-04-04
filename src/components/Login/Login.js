import React from 'react'
import './Login.css'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: '60vh',
  width: '70vw',
  margin: 20,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'space-between',
  alignItems: 'center',
  padding: '20px'
};


function Login(props) {
    return (
        <div className='login-page-container'>
            <Paper style={style} zDepth={2}>
                <div className='login-container'>

                    <div className='login-logo'>
                        <img src='http://via.placeholder.com/150x150' alt='Logo'/>
                    </div>

                        <a href={process.env.REACT_APP_LOGIN}>
                            <RaisedButton label="Log In" primary={true} style={{width:'75px'}} />
                        </a>

                </div>
            </Paper>
        </div>
    )
}

export default Login