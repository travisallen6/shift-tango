import React from 'react';

import moment from 'moment'
import axios from 'axios'

import ProfileView from '../ProfileView/ProfileView'

import './RosterDetail.css'


class RosterDetail extends React.Component {
    constructor(props) {
        super(props);

        let today = moment().format('YYYY-MM-DD')

        this.state = {
            loading: true,  
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

    

    render() { 
        let { pic, firstName, lastName, position, doe, phone, address, city, state, zip, email, pattern, exceptions, } = this.state.employee
        
        

            
            return (
                <div className="detail-container">
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
                        editLinkPath={`/#/managerdash/${this.state.empId}/profile`}
                    />
                   

            </div> 
        )
    }

}

export default RosterDetail;