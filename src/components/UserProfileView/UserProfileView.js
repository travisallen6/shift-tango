import React, { Component } from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
import ProfileView from '../ProfileView/ProfileView'
import "./UserProfileView.css"

class UserProfileView extends Component {

    render() { 
        let { address, city, email, emp_id, first_name, last_name, phone, position, profile_pic, state, zip, mgr } = this.props.user

        let prettyDoe = moment(this.props.doe).format("MM/DD/YYYY")

        let editPath = mgr 
            ?  "/#/manager/myprofile/edit"
            :  "/#/employee/myprofile/edit"
        return ( 
            <div className="user-profile-view-container">
           
                <div className="user-profile-container-paper">
                    <h1 className="user-profile-headline">My Profile</h1>
                    {/* <Subheader style={{fontSize: 24}}>My Profile</Subheader> */}
                    <ProfileView
                        empId={ emp_id} 
                        pic={ profile_pic }
                        firstName={ first_name }
                        lastName={ last_name }
                        position={ position }
                        doe={ prettyDoe }
                        phone={ phone }
                        address={ address }
                        city={ city }
                        state={ state }
                        zip={ zip }
                        email={ email }
                        editLinkPath={editPath}
                    />
                </div>
            
            </div>
         )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

 
export default connect(mapStateToProps) (UserProfileView);