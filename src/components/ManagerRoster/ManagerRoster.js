import React from 'react'
import axios from 'axios'

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import './ManagerRoster.css'

class ManagerRoster extends React.Component {
    constructor(){
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount(){
        axios.get(`/api/roster`)
        .then( roster => this.setState({employees: roster.data}))
    }


    render() {


        let empList = this.state.employees ? this.state.employees.map( (employee, i) => (
            <div key={i + employee.last_name}>
                <ListItem
                    primaryText={`${employee.last_name}, ${employee.first_name}`}
                    secondaryText={employee.position}
                    leftAvatar={<Avatar src={employee.profile_pic} />}
                    inset={true}
                />
                <Divider /> 
            </div>
        )) : null

        return ( 

        <div className="list-container">
            <Paper style={{width: '90vw'} } zDepth={1} >

                <List>
                    <Subheader>Employee Roster</Subheader>
                    {empList}
                </List>

            </Paper>

        </div> 

        )
    }
}
 
export default ManagerRoster;