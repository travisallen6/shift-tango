import React, { Component } from 'react';

import Paper from 'material-ui/Paper'

import './NotAuthorized.css'
import RaisedButton from 'material-ui/RaisedButton'

export default function NotAuthorized(){

    const style = {
        height: "55vh",
        width: "100vw",
        margin: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContents: 'space-between',
        alignItems: 'center',
        padding: '7px'
    };

    return(
        <div className='not-auth-page-container'>
        <Paper style={style} zDepth={2}>
            <div className='not-auth-container'>

                <h1>You are not authorized</h1>
                <h2>Please contact your manager if you feel this is an error.</h2>
                <RaisedButton 
                    label="Try Again" 
                    secondary={true}
                    labelStyle={{color: "white", 
                    fontWeight: 600, fontSize: 18}} 
                    buttonStyle={{width:141}}
                    style={{height: 46}} 
                    href={process.env.REACT_APP_LOGIN}/>
            </div>
        </Paper>
    </div>
    )
}