import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {blue200} from 'material-ui/styles/colors'

class PatternModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            sunSwitch: false,
            monSwitch: false,
            tueSwitch: false,
            wedSwitch: false,
            thuSwitch: false,
            friSwitch: false,
            satSwitch: false,
         }
    }

    let clickColor = this.state.satSwitch ? 

    render() { 
        return ( 
            <div>
                <FlatButton 
                    label="Sat" 
                    default={true} 
                    backgroundColor={blue200}
                    style={btnStyles}
                    onClick={ ()=>this.setState({satSwitch: true})}
                />
                <FlatButton label="Sun" />
                <FlatButton label="Mon" />
                <FlatButton label="Tue" />
                <FlatButton label="Wed" />
                <FlatButton label="Thu" />
                <FlatButton label="Fri" />
            </div>
        )
    }
}
 
export default PatternModify;