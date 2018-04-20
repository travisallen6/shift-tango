import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import Popover from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import PendingIcon from 'material-ui/svg-icons/device/access-time'
import ApprovedIcon from 'material-ui/svg-icons/action/thumb-up'
import DeniedIcon from 'material-ui/svg-icons/action/thumb-down'
import RaisedButton from 'material-ui/RaisedButton'
import {blue300, indigo900, yellow700, yellow800, green300, green800, green700, red300, red800, red700, red200} from 'material-ui/styles/colors';

import './ManagerReviewCard.css'
import { Divider } from 'material-ui';
import { yellow300 } from 'material-ui/styles/colors';
import { yellow900 } from 'material-ui/styles/colors';
import { green200 } from 'material-ui/styles/colors';
import { yellow200 } from 'material-ui/styles/colors';


class ManagerTOReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            popoverOpen: false,
            popoverOpenSkd: false,
            denialInput: ''

         }
    }

    chooseChip = (status) => {
        if(status === "Pending"){
            return(

                <Chip
                    backgroundColor={yellow200}
                    labelColor={yellow800}
                    onClick={this.handleClick}>
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
                    labelColor={green800} >
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
                    labelColor={red800}
                    >
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

    updateDenialInput = ( e ) => {
        this.setState({
            denialInput: e.target.value
        })
    }

  
    handleClickApprovedt = () => {
        let { timeoff_id: id } = this.props.request
        this.props.judge(id, "Approved", null)
    }

    handleClickDenied = () => {
        let { timeoff_id: id } = this.props.request
        let { denialInput: reason } = this.state
        this.props.judge(id, "Denied", reason)
    }

    handleRequestClose = () => {
        this.setState({
         popoverOpen: false,
         popoverOpenSkd: false
        });
      };

    handleClick = (event) => {
    // This prevents ghost click.
        event.preventDefault();
        this.setState({
            popoverOpen: true,
            anchorEl: event.currentTarget,
        });

    };
    handleClickSkd = (event) => {
    // This prevents ghost click.
        event.preventDefault();
        this.setState({
            popoverOpenSkd: true,
            anchorEl: event.currentTarget,
        });

    };
    
    render() { 
            let  item = this.props.request.timeoff_id
     
            let dateDisplay = this.props.request.start_date === this.props.request.end_date 
                ? <div className="to-review-card-date-group"> <div><strong>Date:</strong> {moment(this.props.request.start_date).format("ddd, MMM DD, YYYY") }</div></div>
                :<div className="to-review-card-date-group">
                    <div><strong>From:</strong> {moment(this.props.request.start_date).format("ddd MMM, DD, YYYY")} </div>
                    <div><strong>To:</strong> {moment(this.props.request.end_date).format("ddd, MMM DD, YYYY")}</div>
                </div>
            

            let numDays = moment(this.props.request.end_date) - moment(this.props.request.start_date); 
            numDays = moment(numDays).add(1, "d").format("D")

            let dayLabel = +numDays === 1 
                ? "day"
                : "days"

        return ( 
            <div className="to-review-card-container">
                    <div className="to-review-card-id-row">
                        <div className="to-review-card-id"> 
                            # { this.props.request.timeoff_id } 
                        </div>
                        <div className="to-review-card-chip"> 
                            {this.chooseChip(this.props.request.status)} 
                        </div>
                    </div>
                    <div className="to-review-card-name-row">
                        <div className="to-review-card-avatar-empid">
                            <div className="to-review-card-avatar"> 
                                <Avatar
                                    src={this.props.request.profile_pic} 
                                    size={60}/> 
                            </div>
                            <div className="to-review-card-empid">
                            </div>
                        </div>
                        <div className="to-review-card-name-position">
                            <div className="to-review-card-name"> 
                                { this.props.request.last_name }, { this.props.request.first_name } 
                            </div>
                            <div className="to-review-card-position">
                                { this.props.request.position } - { this.props.request.emp_id }
                            </div>
                        </div>
                    </div>
                    <div className="to-review-card-row-type-dates">
                        <div className="to-review-card-type">
                            <strong>{this.props.request.request_type}</strong>
                        </div>
                        <div className="to-review-card-dates"> 
                            { dateDisplay } 
                            <div 
                                className="to-review-card-num-days"
                                onClick={this.handleClickSkd}
                            >
                                {numDays} <span id="to-day-label">{dayLabel}</span>
                            </div>
                        </div>
                        {this.props.request.reason && <div className="to-review-card-reason">
                            <strong>Reason: </strong>{this.props.request.reason}</div>}        
                    </div>
                    <Divider />
            
                
                {/* {rowsDisplay} */}

            

            <Popover
                className="to-review-card-popover"
                open={this.state.popoverOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal :"left", vertical:"bottom"}}
                targetOrigin={{horizontal:"middle",vertical:"center"}}
                onRequestClose={this.handleRequestClose} >
                
                <div className="to-pop-btn-container">

                    <RaisedButton
                        className="to-pop-btn"
                        onClick={this.handleClickAccept}
                        label="Approve"
                        backgroundColor={green200}
                        labelColor={green800}
                        icon={<ApprovedIcon color={green800}/>}
                    />

                    <RaisedButton
                        className="to-pop-btn"
                        disabled={this.state.denialInput === ""}
                        onClick={this.handleClickDenied}
                        label="Deny"
                        backgroundColor={red200}
                        labelColor={red800}
                        icon={<DeniedIcon color={red800}/>}
                    />
                     <TextField
                        className="to-pop-reason-input"
                        value={this.state.denialInput}
                        floatingLabelText="Denial Reason"
                        onChange={this.updateDenialInput}
                        />
                    
                </div>

                
            </Popover>
            <Popover
                className="to-review-card-popover-schedule"
                open={this.state.popoverOpenSkd}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal :"left", vertical:"top"}}
                targetOrigin={{horizontal:"middle",vertical:"center"}}
                onRequestClose={this.handleRequestClose} >
                
                <div className="to-pop-btn-container-skd">

                    <RaisedButton
                        className="to-pop-btn"
                        onClick={this.handleClickAccept}
                        label="Approve"
                        backgroundColor={green200}
                        labelColor={green800}
                        icon={<ApprovedIcon color={green800}/>}
                    />

                    <RaisedButton
                        className="to-pop-btn"
                        disabled={this.state.denialInput === ""}
                        onClick={this.handleClickDenied}
                        label="Deny"
                        backgroundColor={red200}
                        labelColor={red800}
                        icon={<DeniedIcon color={red800}/>}
                    />
                     <TextField
                        className="to-pop-reason-input"
                        value={this.state.denialInput}
                        floatingLabelText="Denial Reason"
                        onChange={this.updateDenialInput}
                        />
                    
                </div>
                Some Text
                
            </Popover>
            </div>
        )
        
    
    }
}
 
export default ManagerTOReview;