import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import ManagerReviewCard from '../ManagerReviewCard/ManagerReviewCard'
import Loading from '../Loading/Loading'
import {timeoffRequestemail} from '../../mail/mail'
import {timeoffRequestSms} from '../../sms/sms'

import Paper from 'material-ui/Paper'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import './ManagerTOReview.css'
import { Divider } from 'material-ui';

class ManagerTOReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pendingRequests: [],
            resolvedRequests: [],
            exceptions: [],
            slideIndex: 0,
            loading: true
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
                exceptions: requests.data.exceptions,
                loading: false
            })
        })
    }

    judge = ( id, emp_id, newStatus, reason ) => {
        let preFlightRequestUpdate = { id , newStatus, reason }
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
       
        // let paperStyles = {
        //     margin: '8px', 
        //     width: '90vw', 
        //     padding: '20px',
        //     position: 'relative'  
        // }
        
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

        if(this.state.loading) {
            return <Loading />
        }
        
        return ( 
            <div className="manager-to-review-container">

            <Tabs
                onChange={this.handleTabChange}
                value={this.state.slideIndex}
                >
                <Tab label="Pending" value={0} />
                <Tab label="Reviewed" value={1} />
            </Tabs>
            <div className="to-review-container">
            < Paper 
                className='mtor-paper'
                // style={paperStyles} 
                zDepth={1}>

                 <h1 className="super-header">Review Time Off </h1>
                 {/* <Subheader style={{fontSize: 23}}>Review Time Off Requests</Subheader> */}
                 <Divider />
                

             
                                
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}
                    >
                    <div>
                        {pendingowsDisplay.length > 0 ? pendingowsDisplay : <h2 className='mtor-no-items'>No Pending Requests</h2>}
                    </div>
                    <div>
                        {completedRowsDisplay.length > 0 ? completedRowsDisplay : <h2 className='mtor-no-items'>No Completed Requests</h2>}
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