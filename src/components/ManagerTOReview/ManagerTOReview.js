import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import ManagerReviewCard from '../ManagerReviewCard/ManagerReviewCard'
import {timeoffRequestemail} from '../../mail/mail'

import Paper from 'material-ui/Paper'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
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
            exceptions: [],
            slideIndex: 0
         }
    }

    componentDidMount(){
        axios.get(`/api/review/timeoff`)
        .then( requests => {

            
            let pending = _.filter(requests.data.timeoffRequests, (e) => e.status === "Pending")
            let resolved = _.filter(requests.data.timeoffRequests, (e) => e.status !== "Pending")

            this.setState({
                pendingRequests: pending,
                resolvedRequests: resolved,
                exceptions: requests.data.exceptions
            })

        })
    }

    judge = ( id, emp_id, newStatus, reason ) => {

        let preFlightRequestUpdate = { id , newStatus, reason }

        axios
        axios.patch('/api/review/timeoff/', preFlightRequestUpdate)
        .then( requests => {

            let pending = _.filter(requests.data.timeoffRequests, (e) => e.status === "Pending")
            let resolved = _.filter(requests.data.timeoffRequests, (e) => e.status !== "Pending")

            
            this.setState({
                pendingRequests: pending,
                resolvedRequests: resolved,
                exceptions: requests.data.exceptions
            })
            
            let requestForEmail =  _.filter(requests.data.timeoffRequests, (e) => e.timeoff_id === id)
            
            

            // Send Email
            let htmlMessage = timeoffRequestemail(requestForEmail[0])

            let emailContent = {
                subject: `Your timeoff request has been ${newStatus}`,
                html: htmlMessage
            }

            axios.post(`api/sendemail/${emp_id}`, emailContent)
            .catch(err => console.log(err))
                    
        })
    }


    handleTabChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    render() { 
       
        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'  
        }
        
        let pendingowsDisplay = this.state.pendingRequests.map( (request, i) => {
            let empExceptions = _.filter( this.state.exceptions, e => {

                let excDate = moment(e.date).toDate()
                let toStartDate = moment(request.start_date).toDate() 
                let toEndDate = moment(request.end_date).toDate() 

                return e.emp_id === request.emp_id && excDate >= toStartDate && excDate <= toEndDate
            })

            return( 
                <ManagerReviewCard
                    key={i}
                    reqExceptions={ empExceptions }
                    request={ request }
                    cardNum={ i } 
                    judge={ this.judge }/>
            )
        })

        let completedRowsDisplay = this.state.resolvedRequests.map( (request, i) => {
            return( 
                <ManagerReviewCard 
                    reqExceptions={[]}
                    request={ request }
                    cardNum={ i } 
                    judge={ this.judge }/>
            )
        })
        
        let idColStyles = {
            padding: "0 8px",
            height: 20, 
            whiteSpace: "wrap",
            textOverflow: "clip",
        }

        return ( 
            <div>

            <Tabs
                onChange={this.handleTabChange}
                value={this.state.slideIndex}
                >
                <Tab label="Pending" value={0} />
                <Tab label="Reviewed" value={1} />
            </Tabs>
            <div className="to-review-container">
            < Paper 
                style={paperStyles} 
                zDepth={1}>

                 <Subheader style={{fontSize: 23}}>Review Time Off Requests</Subheader>
                 <Divider />
                

             
                                
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}
                    >
                    <div>
                        {pendingowsDisplay}
                       
                    </div>
                    <div>
                        {completedRowsDisplay}
                        
                    </div>
                
                </SwipeableViews>

            

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
        </div>
        )
        
    
    }
}
 
export default ManagerTOReview;