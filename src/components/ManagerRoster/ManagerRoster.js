import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './ManagerRoster.css'

class ManagerRoster extends React.Component {
    constructor(){
        super()
        this.state = {
            activeEmployees: [],
            terminatedEmployees: []
        }
    }

    componentDidMount(){
        axios.get(`/api/roster`)
        .then( roster => this.setState({
            activeEmployees: roster.data.active,
            terminatedEmployees: roster.data.terminated
        }))
    }


    render() {


        let activeEmpList = this.state.activeEmployees ? this.state.activeEmployees.map( (employee, i) => (
            <div key={i + employee.last_name}>
                <Link to={`/managerdash/${employee.emp_id}/detail/`}><ListItem
                    primaryText={`${employee.last_name}, ${employee.first_name}`}
                    secondaryText={employee.position}
                    leftAvatar={<Avatar src={employee.profile_pic} />}
                    inset={true}
                /></Link>
                <Divider /> 
            </div>
        )) : null
       
        let terminatedEmpList = this.state.terminatedEmployees ? this.state.terminatedEmployees.map( (employee, i) => (
            <div key={i + employee.last_name}>
                <Link to={`/managerdash/${employee.emp_id}/detail/`}><ListItem
                    primaryText={`${employee.last_name}, ${employee.first_name}`}
                    secondaryText={employee.position}
                    leftAvatar={<Avatar src={employee.profile_pic} />}
                    inset={true}
                /></Link>
                <Divider /> 
            </div>
        )) : null

        return ( 
            <div>

           

            <Tabs>
                <Tab label="Active" >
                <div className="list-container">
                <br />
                    <FloatingActionButton >
                        <ContentAdd />
                    </FloatingActionButton>
                    <Paper style={{width: '90vw'} } zDepth={1} >

                    <List>
                        <Subheader>Employee Roster</Subheader>
                        {activeEmpList}
                    </List>

                    </Paper>
      
                </div> 

                </Tab>
                <Tab label="Terminated" >
                <div className="list-container">
                    <FloatingActionButton >
                        <ContentAdd />
                    </FloatingActionButton>
                    <br />
                    <Paper style={{width: '90vw'} } zDepth={1} >

                    <List>
                        <Subheader>Employee Roster</Subheader>
                        {terminatedEmpList}
                    </List>
                    </Paper>
                </div>
     
            </Tab>
    
  </Tabs>
  </div>


        )
    }
}
 
export default ManagerRoster;