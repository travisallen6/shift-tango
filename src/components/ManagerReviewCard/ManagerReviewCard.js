import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

import mergeSchedules from '../../mergeSchedules'

import Popover from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import PendingIcon from 'material-ui/svg-icons/device/access-time'
import ApprovedIcon from 'material-ui/svg-icons/action/thumb-up'
import DeniedIcon from 'material-ui/svg-icons/action/thumb-down'
import RaisedButton from 'material-ui/RaisedButton'
import {blue300, indigo900, yellow700, yellow800, green300, green800, green700, red300, red800, red700, red200, grey800} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
            dialogOpenSkd: false,
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

  
    handleClickApproved = (exceptions) => {
        let { timeoff_id: id, emp_id } = this.props.request

        this.setState({dialogOpenSkd: false})        
        
        axios.post(`/api/employee/${emp_id}/multipleexceptions`, {exceptions, timeoffId: id})
        .then( this.props.judge(id, "Approved", null) )
        .catch(err => console.log(err))
    }

    handleClickDenied = () => {
        let { timeoff_id: id } = this.props.request
        let { denialInput: reason } = this.state
        this.setState({popoverOpen: false})

        this.props.judge(id, "Denied", reason)
    }

    handleRequestClose = () => {
        this.setState({
            popoverOpen: false,
            dialogOpenSkd: false
        });
    };
    
    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            popoverOpen: true,
            anchorEl: event.currentTarget,
        });

    };

    handleClickSkd = (event) => {
        event.preventDefault();
        this.setState({
            dialogOpenSkd: true,
            anchorEl: event.currentTarget,
        });

    };
    
    handleClickCancel = () => {
        this.setState({
            dialogOpenSkd: false
        })
    }


    render() { 
            let { request, reqExceptions } = this.props
            let { sun, mon, tue, wed, thu, fri, sat } = this.props.request
            let  item = request.timeoff_id
     
            let dateDisplay = request.start_date === request.end_date 
                ? <div className="to-review-card-date-group"> <div><strong>Date:</strong> {moment(request.start_date).format("ddd, MMM DD, YYYY") }</div></div>
                :<div className="to-review-card-date-group">
                    <div><strong>From:</strong> {moment(request.start_date).format("ddd MMM, DD, YYYY")} </div>
                    <div><strong>To:</strong> {moment(request.end_date).format("ddd, MMM DD, YYYY")}</div>
                </div>
            

            let numDays = moment(request.end_date) - moment(request.start_date); 
            numDays = moment(numDays).add(1, "d").format("D")

            let dayLabel = +numDays === 1 
                ? "day"
                : "days"
            
            let reqPattern = {sun, mon, tue, wed, thu, fri, sat}

            let baseDate = moment(request.start_date).format("YYYY-MM-DD")

            let combinedMerged = []

            for(let i=0; i < Math.ceil( +numDays/7 ); i++){
                let weekSkd = mergeSchedules(baseDate, reqPattern, reqExceptions)
                combinedMerged.push(weekSkd[0],weekSkd[1],weekSkd[2],weekSkd[3], weekSkd[4], weekSkd[5],weekSkd[6])
                baseDate = moment(baseDate).add(1, "w").format("YYYY-MM-DD")
            }


            // Prepare the shifts to be sent to exceptions table if the manager clicks approve.

            combinedMerged = combinedMerged
            .filter( toRequest => moment(toRequest.date) >= moment  (request.start_date) && moment(toRequest.date) <= moment    (request.end_date) )

            var skdToExceptions = combinedMerged.map( dayShift => {

                return {
                    date: dayShift.date,
                    shift: "OFF",
                    type: request.request_type
                }
            })
            

            let skdDisplay = combinedMerged.map( (e, i) => {
                let shiftDisplay
                if(e.shift.start && e.shift.end) {
                    shiftDisplay = <div> {e.shift.start} - {e.shift.end} </div>
                } else {
                    shiftDisplay = <div> {e.shift} </div>
                }

                return (
                    <div key={ i + e.date} className="to-review-popover-row">
                        <div><strong>{e.date}:</strong> {shiftDisplay}</div>

                        { e.type !== "pattern" && <div>({e.type})</div> }
                    </div>
                )
                
            })


            let deniedIconColor = this.state.denialInput === "" 
                ? red800
                : grey800

        return ( 
            <div className="to-review-card-container">
                    <div className="to-review-card-id-row">
                        <div className="to-review-card-id"> 
                            # { request.timeoff_id } 
                        </div>
                        <div className="to-review-card-chip"> 
                            {this.chooseChip(request.status)} 
                        </div>
                    </div>
                    <div className="to-review-card-name-row">
                        <div className="to-review-card-avatar-empid">
                            <div className="to-review-card-avatar"> 
                                <Avatar
                                    src={request.profile_pic} 
                                    size={60}/> 
                            </div>
                            <div className="to-review-card-empid">
                            </div>
                        </div>
                        <div className="to-review-card-name-position">
                            <div className="to-review-card-name"> 
                                { request.last_name }, { request.first_name } 
                            </div>
                            <div className="to-review-card-position">
                                { request.position } - { request.emp_id }
                            </div>
                        </div>
                    </div>
                    <div className="to-review-card-row-type-dates">
                        <div className="to-review-card-type">
                            <strong>{request.request_type}</strong>
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
                        { request.reason && <div className="to-review-card-reason">
                            <strong>Reason: </strong>{request.reason}</div> }        
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
                        onClick={()=>this.handleClickApproved(skdToExceptions)}
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
                        icon={<DeniedIcon color={deniedIconColor}/>}
                    />
                     <TextField
                        className="to-pop-reason-input"
                        value={this.state.denialInput}
                        floatingLabelText="Denial Reason"
                        onChange={this.updateDenialInput}
                        />
                    
                </div>

                
            </Popover>

             <Dialog
                title={`#${request.timeoff_id}: ${request.last_name}, ${request.first_name}`}
                className="to-pop-dialog"
                actions={
                    [
                        <RaisedButton
                            className="to-pop-btn btn-approve"
                            onClick={()=>this.handleClickApproved(skdToExceptions)}
                            label="Approve"
                            backgroundColor={green200}
                            labelColor={green800}
                            icon={<ApprovedIcon color={green800}/>}
                        />,
                        <RaisedButton
                            disabled={this.state.denialInput === ""}
                            onClick={this.handleClickDenied}
                            label="Deny"
                            backgroundColor={red200}
                            labelColor={red800}
                            icon={<DeniedIcon color={deniedIconColor}/>}
                        />,
                        <FlatButton
                            onClick={this.handleClickCancel}
                            label="Cancel"
                        />
                    ]
                }
                modal={true}
                open={this.state.dialogOpenSkd}
                style={{ overflow:"auto" }}
                >
                <div className="to-pop-date-container-skd">
                    {skdDisplay}
                </div>
                        <TextField
                        className="to-pop-reason-input"
                        value={this.state.denialInput}
                        hintText=" Reason if denying"
                        onChange={this.updateDenialInput}
                    />
                </Dialog>

            {/* <Popover
                className="to-review-card-popover-schedule"
                open={this.state.dialogOpenSkd}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal :"left", vertical:"top"}}
                targetOrigin={{horizontal:"middle",vertical:"center"}}
                onRequestClose={this.handleRequestClose} > */}
                
                    
                <div className="to-pop-btn-container-skd">

                    

                    
                </div>
            {/* </Popover> */}
            </div>
        )
        
    
    }
}
 
export default ManagerTOReview;