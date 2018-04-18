import React, { Component } from 'react';

import moment from 'moment'

import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import PendingIcon from 'material-ui/svg-icons/device/access-time'
import ApprovedIcon from 'material-ui/svg-icons/action/thumb-up'
import DeniedIcon from 'material-ui/svg-icons/action/thumb-down'
import {blue300, indigo900, yellow700, yellow800, green300, green800, green700, red300, red800, red700, red200} from 'material-ui/styles/colors';

import './EmployeeRequestDash.css'
import { Divider } from 'material-ui';
import { yellow300 } from 'material-ui/styles/colors';
import { yellow900 } from 'material-ui/styles/colors';
import { green200 } from 'material-ui/styles/colors';
import { yellow200 } from 'material-ui/styles/colors';

class EmployeeRequestDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requests: [
                {id:2, startDate:"2012-10-17", endDate: "2012-10-17", status: "Pending"},
                {id:4, startDate:"2012-10-19", endDate: "2012-10-21", status: "Approved"},
                {id:4, startDate:"2012-10-19", endDate: "2012-10-21", status: "Denied"}
            ]
         }
    }

    chooseChip = (status) => {
        if(status === "Pending"){
            return(

                <Chip
                    backgroundColor={yellow200}
                    labelColor={yellow800}>
                    <Avatar 
                        size={32} 
                        color={yellow200} 
                        backgroundColor={yellow700} 
                        icon={<PendingIcon />}/>
                    Pending
                </Chip>
            )
        }
        if(status === "Approved"){
            return(

                <Chip
                    backgroundColor={green200}
                    labelColor={green800}>
                    <Avatar 
                        size={32} 
                        color={green200} 
                        backgroundColor={green700} 
                        icon={<ApprovedIcon />}/>
                    Approved
                </Chip>
            )
        }
        if(status === "Denied"){
            return(

                <Chip
                    backgroundColor={red200}
                    labelColor={red800}>
                    <Avatar 
                        size={32} 
                        color={red200} 
                        backgroundColor={red700} 
                        icon={<DeniedIcon />}/>
                    Denied
                </Chip>
            )
        }
    }
    render() { 

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'  
        }

        let colStyles = {
            padding: "0 8px",
            height: 20, 
            whiteSpace: "wrap",
            textOverflow: "clip",
        }

        let rowsDisplay = this.state.requests.map( (request, i) => {
            let dateDisplay = request.startDate === request.endDate 
                ? moment(request.startDate).format("M/D/YY")
                : moment(request.startDate).format("M/D/YY") + " - " + moment(request.endDate).format("M/D/YY")
            
            let idColStyles = {
                padding: "0 8px",
                height: 20, 
                whiteSpace: "wrap",
                textOverflow: "clip",
            }

       
  
         

                            
            return(
                <div key={i}>
                    <div className="to-request-row">
                        <div className="to-request-col to-request-id"> { request.id } </div>
                        <div className="to-request-col to-request-val"> { dateDisplay } </div>
                        <div className="to-request-col to-request-">
                        {this.chooseChip(request.status)} 
                        </div>
                    </div>
                    <Divider />
                </div>)
        })

        return ( 
            <div>
                 < Paper 
                    style={paperStyles} 
                    zDepth={1} 
                >
                <Subheader style={{fontSize: 24}}>My Requests</Subheader>
                <Divider />
                {rowsDisplay}

                </Paper>
            </div>
         )
    }
}
 
export default EmployeeRequestDash;