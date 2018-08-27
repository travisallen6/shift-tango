import React, { Component } from 'react';

import moment from 'moment'
import axios from 'axios'
import {connect} from 'react-redux'

import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import PendingIcon from 'material-ui/svg-icons/device/access-time'
import ApprovedIcon from 'material-ui/svg-icons/action/thumb-up'
import DeniedIcon from 'material-ui/svg-icons/action/thumb-down'
import {yellow700, yellow800, green800, green700, red800, red700, red200} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Loading from '../Loading/Loading'

import './EmployeeRequestDash.css'
import { Divider } from 'material-ui';
import { green200 } from 'material-ui/styles/colors';
import { yellow200 } from 'material-ui/styles/colors';

class EmployeeRequestDash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requests: [
           
            ],
            loading: true
         }
    }

    componentDidMount(){
        axios.get(`/api/timeoff/${this.props.empId}/request`)
        .then( requests => {
            this.setState({requests: requests.data, loading: false})

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

        // let paperStyles = {
        //     margin: '8px', 
        //     width: '90vw', 
        //     padding: '20px',
        //     position: 'relative'  
        // }

       
        let rowsDisplay = this.state.requests.map( (request, i) => {
            let dateDisplay = request.start_date === request.end_date 
                ? moment(request.start_date).format("M/D/YY")
                :<div><div> {moment(request.start_date).format("M/D/YY")} </div> <div>{moment(request.end_date).format("M/D/YY")}</div></div>
            
           
            return(
                <div key={i + request.timeoff_id}>
                    <div className="to-request-row">
                        <div className="to-request-col to-request-id"> { request.timeoff_id } </div>
                        <div className="to-request-col to-request-val"> { dateDisplay } </div>
                        <div className="to-request-col to-request-chip">
                        {this.chooseChip(request.status)} 
                        {request.request_type}
                        </div>
                    </div>
            {request.reason && <div className="to-request-reason">
                <strong>Reason: </strong>{request.reason}</div>
            }        
                    <Divider />
                </div>)
        })

        if(this.state.loading) {
            return <Loading />
        }

        return ( 
            <div className="request-dash-container">
                 < Paper 
                    className='to-request-paper'
                    zDepth={1} 
                >
                <Subheader style={{fontSize: 24}}>My Requests</Subheader>
                <Divider />
                <div className="to-request-row" id="to-request-row-hd">
                    <div className="to-request-col to-request-id to-request-hd">ID</div>
                    <div className="to-request-col to-request-val to-request-hd">Date(s)</div>
                    <div className="to-request-col to-request-chip to-request-hd">Status
                    </div>
                </div>
                <Divider />

                {/* {this.state.requests.length === 0 && this.state.loading && <div className="to-request-message"><h1>Loading...</h1></div>} */}
                {this.state.requests.length === 0 && !this.state.loading && <div className="to-request-message"><h1>No Requests Yet</h1></div>}

                {rowsDisplay}

                </Paper>
                <div className="to-request-action-fixed">
                        <FloatingActionButton 
                            secondary={true}
                            href="/#/employee/RequestTO"
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
            </div>
         )
    }
}

function mapStateToProps(state){
    return {
        empId: state.user.emp_id
    }
}
 
export default connect(mapStateToProps)(EmployeeRequestDash);