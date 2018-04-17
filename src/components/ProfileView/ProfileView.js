import React, { Component } from 'react';
import mergeSchedules from '../../mergeSchedules'
import moment from 'moment'

import {Redirect, Link} from 'react-router-dom'

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import EditIcon from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import lightBlueA100 from 'material-ui/styles'
import { grey400, grey300 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

import './ProfileView.css'

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            menuOpen: false,
            redirect: false,
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
            menuOpen: false,
        });
    };

    handleRedirect = () => {
        this.setState({redirect:true})
    }

    render() {
        
        let { pic, firstName, lastName, position, doe, phone, address, city, state, zip, email, pattern, exceptions, skdViewDate, manager} = this.props

    let paperStyles = {
            margin: '8px', 
            width: '90vw', 
            padding: '20px',
            position: 'relative'
        }

        let mergedSchedules

        if(exceptions && pattern && skdViewDate){
            mergedSchedules = mergeSchedules(skdViewDate, pattern, exceptions)
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
        }

        return ( 
                < Paper 
                    style={paperStyles} 
                    zDepth={1} 
                >
                { this.state.redirect && <Redirect to={this.props.editLinkPath} /> }
                    <div className="profile-name-header">
                        <Avatar
                            src={pic}
                            size={100}
                            style={{marginRight:'18px'}}
                            />
                        <div><h1>{`${lastName}, ${firstName}`}</h1></div>
                    </div>
                    
                        <div className="profile-edit-icon">

                                <FlatButton
                                    href={this.props.editLinkPath}
                                    secondary={true}
                                    icon={<EditIcon color={grey300} hoverColor={grey400}/>}
    />
                                
                        </div>


                    <div className='row'><h2>Emp#:</h2><p> { this.props.empId } </p></div>
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
                
                    <div className='skd-title'>Schedule</div>
                    <div className='skd-container'>
                        <div className='skd-row'>
                            {mergedSchedules}
                        </div>
                    </div>

                    { manager && <div>
                        <RaisedButton
                        onClick={this.handleClick}
                        label="Modify"
                        />
                        <Popover
                        open={this.state.menuOpen}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose}
                        >
                        <Menu>
                            <Link to={`/managerdash/${this.props.empId}/pattern`}>
                                <MenuItem primaryText="Pattern" />
                            </Link>
                            <Link to={`/managerdash/${this.props.empId}/schedule`}>
                                <MenuItem primaryText="Exception" />
                            </Link>
                        </Menu>
                        </Popover>
                    </div> }
                   </Paper>
         )
    }
}
 
export default ProfileView;