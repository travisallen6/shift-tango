import React from 'react';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  

import './RosterDetail.css'


class RosterDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            menuOpen: false,
            employee: {
                empId: 205301,
                pic: 'https://lh3.googleusercontent.com/-zR2_L45pjK4/AAAAAAAAAAI/AAAAAAAACSw/YL4xjs1PCvg/photo.jpg',
                firstName: 'Travis',
                lastName: 'Allen',
                doe: '12/31/2012',
                phone: '(801) 555-4725',
                address: '123 Main St',
                city: 'Salt Lake City',
                state: 'UT',
                zip: 84128,
                email: "wookie@starwars.com",
                pattern: {
                    su: '0400-1200',
                    mo: '0400-1200',
                    tu: '0400-1200',
                    we: '0400-1200',
                    th: 'OFF',
                    fr: 'OFF',
                    sa: '0400-1200'
                }
            }
        }
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

        let { empId, pic, firstName, lastName, doe, phone, address, city, state, zip, email, pattern} = this.state.employee
        let { su, mo, tu, we, th, fr, sa } = pattern

        let paperStyles = {
                margin: '8px', 
                width: '90vw', 
                padding: '20px'
            }

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


                <div className='row'><h2>Emp#:</h2><p> {empId} </p></div>
                <div className='row'><h2>DOE:</h2><p> {doe} </p></div>
                <div className='row'><h2>Phone:</h2><p>{phone}</p></div>
                <div className='row'><h2>Email:</h2><p>{email}</p></div>
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
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Sun</div>
                                <div className='skd-cell-row dt'>12/1</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Mon</div>
                                <div className='skd-cell-row dt'>12/2</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Tue</div>
                                <div className='skd-cell-row dt'>12/3</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Wed</div>
                                <div className='skd-cell-row dt'>12/4</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Thu</div>
                                <div className='skd-cell-row dt'>12/5</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Fri</div>
                                <div className='skd-cell-row dt'>12/6</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
                        <div className='skd-cell'>
                            <div className="skd-cell-head">
                                <div className='skd-cell-row dy'>Sat</div>
                                <div className='skd-cell-row dt'>12/1</div>
                            </div>
                            <div className='skd-cell-row'>04:00 AM</div>
                            <div className='skd-cell-row'>12:00 PM</div>
                        </div>
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
            <MenuItem primaryText="Pattern" />
            <MenuItem primaryText="Exception" />
          </Menu>
        </Popover>
      </div>

            </div> 
        )
    }
}
 
export default RosterDetail;