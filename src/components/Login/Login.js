import React from 'react'
import './Login.css'
import axios from 'axios'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
// import Snackbar from 'material-ui/Snackbar'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import logo from '../../images/Logo.jpg'
import TextField from 'material-ui/TextField/TextField';
// import { lightGreen800 } from 'material-ui/styles/colors';
// import { lightGreen100 } from 'material-ui/styles/colors';

class Login extends React.Component {

    constructor(){
        super()
        this.state = {
            userSelection: []
        }
    }

    componentDidMount() {
        axios.get('/api/loginusers')
        .then( users => {
            users.data.push({
                profile_pic: 'https://cdn0.iconfinder.com/data/icons/law-crime-and-justice-1/32/gangster-boss-criminal-avatar-detective-police-suspect-512.png',
                last_name: 'Danger',
                first_name: 'Stranger',
                position: 'Unauthorized User',
                auth_id: 'none'
            })
            this.setState({userSelection: users.data})
        })
        .catch( err => console.log(err))
    }

    handleInputChange(e){
        this.setState({
            userInput: e.target.value
        })
    }

    // handleSnackbarClose = () => {
    //     this.setState({
    //         snackbarOpen: false,
    //     })
    // }

render(){

    const style = {
        height: "95vh",
        width: "100vw",
        margin: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContents: 'space-between',
        alignItems: 'center',
        padding: '7px'
    };
    
    const displayUsers = this.state.userSelection.map( (user) => (
        <ListItem
            href={`http://localhost:3010/api/mocklogin/${user.auth_id}`}
            primaryText={`${user.last_name}, ${user.first_name}`}
            secondaryText={`${user.position}`}
            leftAvatar={<Avatar src={user.profile_pic} />}
        />
    ))

    return (
        <div className='login-page-container'>
            <Paper style={style} zDepth={2}>
                <div className='login-container'>

                    <div className='login-logo'>
                        <img src={logo} width="100%" alt='Logo'/>
                    </div>
                    <p className='login-text'>
                        This app was originally built to only allow users to log into the app once they were authorized by an administrator. As you might imagine, this would make the application difficult to explore without being authorized first. In the name of allowing exploration without requiring your information, below is a list of users that you can log in as. Enjoy! 
                    </p>
                    <List>
                        {displayUsers}
                    </List>
                        

                    {/* <RaisedButton 
                        label="Log In" 
                        secondary={true}
                        labelStyle={{color: "white", 
                        fontWeight: 600, fontSize: 23}} 
                        buttonStyle={{width:141}}
                        style={{height: 46}} 
                        href={process.env.REACT_APP_LOGIN}
                    />  */}
                </div>
            </Paper>
        </div>
    )
}
}

export default Login