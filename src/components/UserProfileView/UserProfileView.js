import React, { Component } from 'react';

import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Paper'

import "./UserProfileView.css"



class UserProfileView extends Component {

    render() { 

        let paperStyles = {
            margin: '8px', 
            width: '90vw', 
        }

        return ( 
            <div className="user-profile-view-container">
            <Paper
                style={paperStyles} 
                zDepth={1} 
            >
                <div className="user-profile-container-paper">
                    <h1 className="user-profile-headline">My Profile</h1>
                    {/* <Subheader style={{fontSize: 24}}>My Profile</Subheader> */}
                    <ProfileView
                        empId={ this.state.empId } 
                        pic={ pic }
                        firstName={ firstName }
                        lastName={ lastName }
                        position={ position }
                        doe={ doe }
                        phone={ phone }
                        address={ address }
                        city={ city }
                        state={ state }
                        zip={ zip }
                        email={ email }
                        pattern={ pattern }
                        exceptions={ exceptions }
                        skdViewDate={ this.state.skdViewDate }
                        manager={ true }
                        editLinkPath={`/#/manager/profileedit/${this.state.empId}/`}
                    />
                </div>
            
            </Paper>
            </div>
         )
    }
}
 
export default UserProfileView;