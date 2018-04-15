import React from 'react';

import mergeSchedules from '../../mergeSchedules'
import moment from 'moment'
import axios from 'axios'

import {Link} from 'react-router-dom'

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import lightBlueA100 from 'material-ui/styles'

import './RosterDetail.css'


class RosterDetail extends React.Component {
    constructor(props) {
        super(props);

        let today = moment().format('YYYY-MM-DD')

        this.state = {
            loading: true,  
            menuOpen: false,
            skdViewDate: today,
            empId: this.props.match.params.empid,
            employee: {
                pic: '',
                firstName: '',
                lastName: '',
                position: '',
                doe: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip: 0,
                email: "",
                pattern: {
                    sun: '',
                    mon: '',
                    tue: '',
                    wed: '',
                    thu: '',
                    fri: '',
                    sat: ''
                },
                exceptions: [
                    {}
                ]
            }
        }
 
    }

    componentDidMount(){
       axios.get(`/api/employee/${this.state.empId}/detail`)
       .then( receivedEmployee =>{
            let { profile, exceptions } = receivedEmployee.data
            let {
                last_name, 
                first_name,
                doe,  
                profile_pic, 
                phone, 
                position, 
                address, 
                city, 
                state, 
                email, 
                zip, 
                sun, 
                mon, 
                tue, 
                wed, 
                thu, 
                fri, 
                sat 
            } = profile

            this.setState({
                loading: false,
                employee: {
                    pic: profile_pic,
                    firstName: first_name,
                    lastName: last_name,
                    position: position,
                    doe: moment(doe).format('M/D/Y'),
                    phone: phone,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    email: email,
                    pattern: { sun, mon, tue, wed, thu, fri, sat}, 
                    exceptions: exceptions
                },
            })
       })
    }

    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() { 
        
        
        let { pic, firstName, lastName, position, doe, phone, address, city, state, zip, email, pattern, exceptions, } = this.state.employee

        let paperStyles = {
                margin: '8px', 
                width: '90vw', 
                padding: '20px'
            }
            
        let mergedSchedules = mergeSchedules(this.state.skdViewDate, pattern, exceptions)
            .map( (shiftDay, i) =>{
                let dow = moment(shiftDay.date).format('ddd')
                let shortDate = moment(shiftDay.date).format('M/D')
            if(shiftDay.shift){
                if(shiftDay.shift.start){
                    return (
                        <div className='skd-cell' style={{background: lightBlueA100}} key={i}>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'> { dow } </div>
                                <div className='skd-cell-row dt'>{ shortDate }</div>
                            </div>
                            <div className='skd-cell-row'>{ shiftDay.shift.start }</div>
                            <div className='skd-cell-row'>{ shiftDay.shift.end }</div>
                        </div>
                    )
                } else {
                    return (
                        <div className='skd-cell' key={i}>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'> { dow } </div>
                                <div className='skd-cell-row dt'>{ shortDate }</div>
                            </div>
                            <div className='skd-cell-row skd-single'>
                                { shiftDay.shift }
                            </div>
                        </div>
                    )
                }
            } else{
                return <h1 key={i}>Loading</h1>
            }
            }) 
            
            return (
                <div className="detail-container">
                <div className="detail-name-header">
                    <Avatar
                        src={pic}
                        size={100}
                        style={{marginRight:'18px'}}
                        />
                    <div><h1>{`${lastName}, ${firstName}`}</h1></div>
                </div>
                   < Paper 
                        style={paperStyles} 
                        zDepth={1} 
                    >


                <div className='row'><h2>Emp#:</h2><p> { this.state.empId } </p></div>
                <div className='row'><h2>Pos:</h2><p> { position } </p></div>
                <div className='row'><h2>DOE:</h2><p> { doe } </p></div>
                <div className='row'><h2>Phone:</h2><p> { phone } </p></div>
                <div className='row'><h2>Email:</h2><p> { email } </p></div>
                <div className='row'>
                    <div className='address'>
                        <h2>Add:</h2>
                    </div>
                    <div>
                        <p>{ address }</p>
                        <p> { city }, {state} {zip} </p>
                    </div>
                </div>
                
                   </Paper>
    <div className='skd-title'>Schedule</div>
    <div className='skd-container'>
        <div className='skd-row'>
            {mergedSchedules}
        </div>
    </div>

    <div>
        <RaisedButton
          onClick={this.handleClick}
          label="Modify"
          />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          >
          <Menu>
            <Link to={`/managerdash/${this.state.empId}/pattern`}>
                <MenuItem primaryText="Pattern" />
            </Link>
            <Link to={`/managerdash/${this.state.empId}/schedule`}>
                <MenuItem primaryText="Exception" />
            </Link>
          </Menu>
        </Popover>
      </div>

            </div> 
        )
    }

}

export default RosterDetail;