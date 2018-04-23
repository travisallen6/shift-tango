import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import ManagerReviewCard from '../ManagerReviewCard/ManagerReviewCard'
import {timeoffRequestemail} from '../../mail/mail'
import {timeoffRequestSms} from '../../sms/sms'

import Paper from 'material-ui/Paper'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Subheader from 'material-ui/Subheader'

import './ManagerTOReview.css'
import { Divider } from 'material-ui';



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

            let smsMessage = timeoffRequestSms(requestForEmail[0])

            axios.post(`/api/sendsms/${emp_id}`, { message: smsMessage })
            .catch( err => console.log(err))
                    
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

                 <h1 className="super-header">Review Time Off Requests</h1>
                 {/* <Subheader style={{fontSize: 23}}>Review Time Off Requests</Subheader> */}
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