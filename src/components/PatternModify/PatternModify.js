import React, { Component } from 'react';
import Schedule from '../Schedule/Schedule'

class PatternModify extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                Pattern
                <Schedule 
                    dateLabel={true}/>
            </div>
        )
    }
}
 
export default PatternModify;