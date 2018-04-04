import React from 'react'

function Login(props) {
    return (
        <div className='login-container'>
            <div className='logo'>
                Logo
            </div>
            <div className='login-btn'>
                <a href={process.env.REACT_APP_LOGIN}>Log In</a>
            </div>
        </div>
    )
}

export default Login