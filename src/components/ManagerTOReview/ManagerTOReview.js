import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import PendingIcon from 'material-ui/svg-icons/device/access-time'
import ApprovedIcon from 'material-ui/svg-icons/action/thumb-up'
import DeniedIcon from 'material-ui/svg-icons/action/thumb-down'
import {blue300, indigo900, yellow700, yellow800, green300, green800, green700, red300, red800, red700, red200} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './ManagerTOReview.css'
import { Divider } from 'material-ui';
import { yellow300 } from 'material-ui/styles/colors';
import { yellow900 } from 'material-ui/styles/colors';
import { green200 } from 'material-ui/styles/colors';
import { yellow200 } from 'material-ui/styles/colors';


class ManagerTOReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pendingRequests: [],
            resolvedRequests: [],
         }
    }

    componentDidMount(){
        axios.get(`/api/review/timeoff`)
        .then( requests => {
            let pending = _.filter(requests.data, (e) => e.status === "Pending")
            let resolved = _.filter(requests.data, (e) => e.status !== "Pending")

            this.setState({
                pendingRequests: pending,
                resolvedRequests: resolved
            })

        })
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
        let colStyles = {
            padding: "0 8px",
            height: 20, 
            whiteSpace: "wrap",
            textOverflow: "clip",
        }

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'  
        }
        let rowsDisplay = this.state.pendingRequests.map( (request, i) => {
            let dateDisplay = request.start_date === request.end_date 
                ? <div className="to-review-date-group"> <div><strong>Date:</strong> {moment(request.start_date).format("ddd, MMM DD, YYYY") }</div></div>
                :<div className="to-review-date-group">
                    <div><strong>From:</strong> {moment(request.start_date).format("ddd MMM, DD, YYYY")} </div>
                    <div><strong>To:</strong> {moment(request.end_date).format("ddd, MMM DD, YYYY")}</div>
                </div>
            
            let idColStyles = {
                padding: "0 8px",
                height: 20, 
                whiteSpace: "wrap",
                textOverflow: "clip",
            }

            let numDays = moment(request.end_date) - moment(request.start_date); 
            numDays = moment(numDays).add(1, "d").format("D")

            let dayLabel = +numDays === 1 
                ? "day"
                : "days"

            return(
                <div key={i + request.timeoff_id}>
                    <div className="to-review-id-row">
                        <div className="to-review-id"> 
                            # { request.timeoff_id } 
                        </div>
                        <div className="to-review-chip"> 
                            {this.chooseChip(request.status)} 
                        </div>
                    </div>
                    <div className="to-review-name-row">
                        <div className="to-review-avatar-empid">
                            <div className="to-review-avatar"> 
                                <Avatar
                                    src={request.profile_pic} 
                                    size={60}/> 
                            </div>
                            <div className="to-review-empid">
                            </div>
                        </div>
                        <div className="to-review-name-position">
                            <div className="to-review-name"> 
                                { request.last_name }, { request.first_name } 
                            </div>
                            <div className="to-review-position">
                                { request.position } - { request.emp_id }
                            </div>
                        </div>
                    </div>
                    <div className="to-review-row-type-dates">
                        <div className="to-review-type">
                            <strong>{request.request_type}</strong>
                        </div>
                        <div className="to-review-dates"> 
                            { dateDisplay } 
                            <div className="to-review-num-days">
                                {numDays} <span id="to-day-label">{dayLabel}</span>
                            </div>
                        </div>
                        {request.reason && <div className="to-review-reason">
                            <strong>Reason: </strong>{request.reason}</div>}        
                    </div>
                    <Divider />
                </div>)
        })
        
        let idColStyles = {
            padding: "0 8px",
            height: 20, 
            whiteSpace: "wrap",
            textOverflow: "clip",
        }

        return ( 
            <div className="to-review-container">
            < Paper 
                style={paperStyles} 
                zDepth={1}>

                 <Subheader style={{fontSize: 23}}>Review Time Off Requests</Subheader>
                 <Divider />
                
                {rowsDisplay}

            

            </Paper>
            {/* <Popover
                open={this.state.popOverOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={this.state.anchorOrigin}
                targetOrigin={this.state.targetOrigin}
                onRequestClose={this.handleRequestClose} >
                <div>Date:</div>
                <div>Shift:</div>
            </Popover> */}
            </div>
        )
        
    
    }
}
 
export default ManagerTOReview;