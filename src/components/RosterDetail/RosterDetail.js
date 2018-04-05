import React from 'react';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import './RosterDetail.css'


class RosterDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            employee: {
                empId: 205301,
                pic: 'http://http.cat/100',
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
    render() { 

        let { empId, pic, firstName, lastName, doe, phone, address, city, state, zip, email, pattern} = this.state.employee
        let { su, mo, tu, we, th, fr, sa } = pattern

        return ( 
            <div className="detail-container">
                <div className="detail-name-header">
                    <Avatar
                        src={pic}
                        size={60}
                        style={{margin: '15px 25px 15px 15px'}}
                    />
                    <div><h1>{`${lastName}, ${firstName}`}</h1></div>
                </div>
                   < Paper style={{margin: '8px', width: '50px', height: '50px'}} zDepth={1} />
            </div> 
        )
    }
}
 
export default RosterDetail;