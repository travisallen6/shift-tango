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
import {blue300, indigo900} from 'material-ui/styles/colors';

import './EmployeeRequestDash.css'
import { Divider } from 'material-ui';

class EmployeeRequestDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requests: [
                {id:2, startDate:"2012-10-17", endDate: "2012-10-17", status: "Pending"},
                {id:4, startDate:"2012-10-19", endDate: "2012-10-21", status: "Pending"}
            ]
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
                        <div className="to-request-col to-request-val"> 
                            <Chip
                                backgroundColor={blue300}
                                >
                                <Avatar size={32} color={blue300} backgroundColor={indigo900} icon={<SvgIconFace />} />
                                Pending
                            </Chip>
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